import React from "react";
import { FaFacebookF, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import logo from "../../assets/img/footer_logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img
            src={logo}
            alt="Chhabra Marble Logo"
            className="footer-logo-img"
          />
        </div>

        <ul className="footer-links">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/project">Project</Link>
          </li>
          <li>
            <Link to="/product">Catalogue</Link>
          </li>
        </ul>
        <ul className="footer-links">
          <li>Sanitary</li>
          <li>Tiles</li>
          <li>Kota</li>
          <li>Marble</li>
          <li>Granite</li>
          <li>Cement</li>
          <li>Chemical</li>
        </ul>
        <div className="footer-info">
          <span>Reach Us</span>
          <p>487/65, National Market, Peeragarhi, Delhi, 110087</p>
          <div className="footer-socials">
            <a
              href="https://facebook.com/chhabramarble"
              aria-label="Visit Chhabra Marble on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/chhabramarble"
              aria-label="Visit Chhabra Marble on Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/chhabramarble"
              aria-label="Visit Chhabra Marble on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>
      <p className="footer-copyright">
        © {currentYear} All Rights Reserved | Powered by{" "}
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
