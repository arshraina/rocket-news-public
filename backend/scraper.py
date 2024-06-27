import requests
from bs4 import BeautifulSoup

def scrape_article_content(url):
    # GET request to the URL
    response = requests.get(url)

    # Parsing the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Finding all elements with class 'article-content'
    article_content = soup.find(class_='article-content')

    # Finding all paragraph tags within the 'article-content' class
    paragraphs = article_content.find_all('p')

    # Extracting and concatenating the text of each paragraph
    content = '\n'.join(paragraph.text for paragraph in paragraphs)

    return content
