import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewsCarousel = ({ category }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNewsData(category);
  }, [category]);

  const fetchNewsData = async (category) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/news?category=${category}`);
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
  };

  return (
    <div className="w-5/6 mx-auto">
      <div className="mt-6">
        <Slider {...settings}>
          {newsData.map((newsItem, index) => (
            <div key={index} className="relative">
              <img
                src={newsItem.urlToImage}
                alt=""
                className="rounded-xl h-[400px] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black bg-opacity-50">
                <p className="text-lg font-semibold">
                  {newsItem.title}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewsCarousel;
