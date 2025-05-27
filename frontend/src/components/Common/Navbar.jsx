import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="navbar-container">
      <ul className="navbar-links-list">
        <li className="navbar-links">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-links">
          <Link to="/about">About</Link>
        </li>
        <li className="navbar-links">
          <Link to="/product">Product</Link>
        </li>
        <li className="navbar-links">
          <Link to="/project">Project</Link>
        </li>
        <li className="navbar-links">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="navbar-search-container">
        <FaSearch
          className="navbar-search"
          aria-label="Toggle search"
          onClick={toggleSearch}
        />
        {isSearchOpen && (
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search..."
            aria-label="Search input"
            autoFocus
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
