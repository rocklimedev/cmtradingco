import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-heading">404</h1>
      <p className="notfound-subheading">Page Not Found</p>
      <p className="notfound-message">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="notfound-link">
        ⟵ Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
