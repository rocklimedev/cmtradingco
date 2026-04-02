import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      {/* Inline SVG */}
      <svg
        className="notfound-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="220"
        height="120"
        viewBox="0 0 220 120"
      >
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="80"
          fontWeight="700"
          fill="var(--primary-color)"
          fontFamily="'Neuropol', 'Lato', sans-serif"
        >
          404
        </text>
      </svg>

      <h1 className="notfound-heading">Page Not Found</h1>
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
