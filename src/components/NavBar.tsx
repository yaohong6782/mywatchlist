import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="shadow-lg">
      <nav className="flex justify-between px-4 py-2">
        <Link to="/" className="text-gray-700 font-bold">
          Home
        </Link>
        <div className="flex space-x-4">
          <Link to="/search" className="text-gray-700 hover:text-gray-900">
            Search
          </Link>
          <Link to="/collections" className="text-gray-700 hover:text-gray-900">
            Collections
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
