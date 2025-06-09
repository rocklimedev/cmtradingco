import React, { useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import contact from "../../assets/img/contact_title_section.png";

const ContactWrapper = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    // Simulate form submission (e.g., API call)
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-wrapped">
      <img
        src={contact}
        alt="Contact Page Banner"
        className="contact-page-image"
      />
      <div className="main-wrapper">
        <h2 className="contact-title">Contact</h2>

        <div className="contact-details">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5353752935225!2d77.08848157603951!3d28.67362748221231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0472b3b66a0d%3A0x67e896cfd98c1c43!2sChhabra%20Marble!5e0!3m2!1sen!2sin!4v1748326959416!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Chhabra Marble Location"
            className="contact-map"
          ></iframe>
          <div className="contact-info">
            <h3 className="contact-info-title">Contact Information</h3>
            <p className="contact-info-subtitle">
              Any questions or remarks? Just write us a message!
            </p>
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
            <a
              href="https://maps.google.com/?q=487/65,+National+Market,+Peeragarhi,+Delhi,+110087"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="contact-button">Find Us</button>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-container">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-content"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="form-error">{errors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-content"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-content"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="form-content"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-full">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="form-content"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <span className="form-error">{errors.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="contact-button"
              disabled={submitted}
            >
              {submitted ? "Submitted!" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactWrapper;
