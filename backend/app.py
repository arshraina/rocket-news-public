from flask import Flask, request, jsonify
import os
import requests
from pymongo import MongoClient
from summarizer import get_summary
from scraper import scrape_article_content
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
mongodb_uri = os.getenv('MONGODB_URI')
client = MongoClient(mongodb_uri)
db = client.get_default_database()  # Use the default database
collection = db['news_collection']

# News API credentials
NEWS_API_KEY = os.getenv('NEWS_API_KEY')
NEWS_API_ENDPOINT = 'https://newsapi.org/v2/top-headlines'

@app.route('/api/news')
def get_news():
    category = request.args.get('category')
    if category == 'latest':
        news_data = list(collection.find().sort('publishedAt', -1).limit(20))
    elif category:
        news_data = list(collection.find({'category': category}))
    else:
        news_data = list(collection.find())
    
    for news_item in news_data:
        news_item['_id'] = str(news_item['_id'])

    return jsonify(news_data)

# Utility functions
def is_url_valid(url):
    try:
        response = requests.head(url)
        return response.status_code == 200
    except requests.ConnectionError:
        return False

def is_news_duplicate(url):
    existing_news = collection.find_one({'url': url})
    return existing_news is not None

@app.route('/fetch_news')
def fetch_news():
    categories = ['business', 'sports', 'technology', 'entertainment']

    for category in categories:
        params = {
            'language': 'en',
            'pageSize': 20,
            'apiKey': NEWS_API_KEY,
        }

        response = requests.get(NEWS_API_ENDPOINT + f'?category={category}', params=params)
        data = response.json()

        articles = data.get('articles', [])

        for article in articles:
            url = article.get('url', '')
            if is_url_valid(url) and not is_news_duplicate(url):
                if 'urlToImage' not in article or not article['urlToImage']:
                    continue

                source = article.get('source', {}).get('name', '')
                author = article.get('author', '')
                published_at = article.get('publishedAt', '')

                category = category  

                summ = get_summary(url)

                news_entry = {
                    'url': url,
                    'title': article.get('title', ''),
                    'urlToImage': article.get('urlToImage', ''),
                    'content': "",
                    'summary': summ,
                    'source': source,
                    'author': author,
                    'publishedAt': published_at,
                    'category': category
                }

                collection.insert_one(news_entry)

    return 'News fetched and stored in MongoDB!'

if __name__ == '__main__':
    app.run(debug=True)