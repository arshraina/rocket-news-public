import React from "react";
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className="bg-[#fff] p-4">
      <div className="flex items-center justify-between mx auto">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="" className="mr-2 w-7 h-7" />
          <div className="text-1.5xl font-bold text-red-700">
            <h1>rocket.news</h1>
          </div>
        </div>
        <Navbar/>
      </div>
    </div>
  );
};

export default Header;