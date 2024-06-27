// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Header from './components/common/Header';
import NewsCarousel from './components/common/NewsCarousel';

const App = () => {
  console.log('App');

  return (
    <Router> {/* Wrap your App component with Router */}
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto">
          <p className="mt-6 mb-6 text-3xl font-bold text-center">Latest News</p>
          <NewsCarousel category="latest" />
          <p className="mt-6 mb-6 text-3xl font-bold text-center">Business</p>
          <NewsCarousel category="business" />
          <p className="mt-6 mb-6 text-3xl font-bold text-center">Sports</p>
          <NewsCarousel category="sports" />
          <p className="mt-6 mb-6 text-3xl font-bold text-center">Technology</p>
          <NewsCarousel category="technology" />
          <p className="mt-6 mb-6 text-3xl font-bold text-center">Entertainment</p>
          <NewsCarousel category="entertainment" />
        </div>
      </div>
    </Router>
  );
}

export default App;
