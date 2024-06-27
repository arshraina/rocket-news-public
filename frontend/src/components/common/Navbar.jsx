import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center">
      <ul className="flex space-x-4 text-gray-400">
        <li>
          <Link to="/" className= "hover:text-black">Home</Link>
        </li>
        <li>
          <Link to="/culture" className= "hover:text-black">Business</Link>
        </li>
        <li>
          <Link to="/politics" className= "hover:text-black">Sports</Link>
        </li>
        <li>
          <Link to="/sports" className= "hover:text-black">Technology</Link>
        </li>
        <li>
          <Link to="/entertainment" className= "hover:text-black">Entertainment</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
