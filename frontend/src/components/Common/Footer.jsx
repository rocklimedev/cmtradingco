import React from "react";
import { FaFacebookF, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Chhabra Marble Logo" className="footer-logo" />
          <p> Copyright © 2025 | All Rights Reserved.</p>
        </div>

        <ul className="footer-links">
          <li>About</li>
          <li>Project</li>
          <li>Catalogue</li>
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
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
