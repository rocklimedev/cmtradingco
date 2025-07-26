import React from "react";
import { FaFacebookF, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import logo from "../../assets/img/footer_logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Column 1: Logo */}
        <div className="footer-logo">
          <img src={logo} alt="Chhabra Marble Logo" />
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-nav">
          <h4>About Us</h4>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/project">Projects</Link>
            </li>
            <li>
              <Link to="/product">Products</Link>
            </li>
            <li>
              <Link to="/catalogue">Catalogue</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-categories">
          <h4>Categories</h4>
          <ul>
            <li>Surfaces</li>
            <li>CP Fittings</li>
            <li>Wellness</li>
            <li>Adhesive</li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-categories">
          <h4>Contact Information</h4>
          <p>
            487/65, National Market, Peeragarhi,
            <br />
            Delhi, 110087
          </p>
          <div className="footer-socials">
            <a
              href="https://facebook.com/chhabramarble"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/chhabramarble"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/chhabramarble"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>
      <p className="footer-copyright">
        © {year} All Rights Reserved. | Powered by{" "}
        <a
          href="https://www.rocklime.com/"
          className="rocklime-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rocklime
        </a>
      </p>
    </footer>
  );
};

export default Footer;
