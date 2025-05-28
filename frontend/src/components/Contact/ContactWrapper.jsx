import React from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import contact from "../../assets/img/contact_title_section.png";
const ContactWrapper = () => {
  return (
    <div className="contact-wrapper">
      <img
        src={contact}
        alt="Contact Page Banner"
        className="contact-page-image"
      />
      <div className="main-wrapper">
        <span>Contact</span>
        <div className="contact-details">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5353752935225!2d77.08848157603951!3d28.67362748221231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0472b3b66a0d%3A0x67e896cfd98c1c43!2sChhabra%20Marble!5e0!3m2!1sen!2sin!4v1748326959416!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Chhabra Marble Location"
          ></iframe>
          <div className="contact-info">
            <span>Contact Information</span>
            <p>Any question or remarks? Just write us a message!</p>
            <div className="contact-item">
              <div className="contact-icon">
                <MdOutlinePhoneInTalk />
              </div>
              <div className="contact-content">+91 9999500699</div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <IoMdMail />
              </div>
              <div className="contact-content">info@chhabramarble.com</div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-content">
                487/65, National Market, Peeragarhi, Delhi, 110087
              </div>
            </div>
            <button>Find Us</button>
          </div>
        </div>
        <form className="contact-form">
          <div className="contact-form-container">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-content"
              placeholder="Enter your first name"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-content"
              placeholder="Enter your last name"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-content"
              placeholder="Enter your email"
            />
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-content"
              placeholder="Enter your phone number"
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-content"
              placeholder="Enter your message"
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactWrapper;
