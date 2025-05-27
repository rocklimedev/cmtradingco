// components/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" style={styles.link}>
        Return to Home
      </Link>
    </div>
  );
};

// Basic inline styles for the component (replace with your own CSS if preferred)
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  link: {
    fontSize: "1rem",
    color: "#007bff",
    textDecoration: "none",
    padding: "10px 20px",
    border: "1px solid #007bff",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
};

export default NotFound;
