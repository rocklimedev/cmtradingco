import React, { useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import contact from "../../assets/img/contact_title_section.jpg";
import { useSubmitContactFormMutation } from "../../api/contactApi";

const ContactWrapper = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  // RTK Query mutation hook
  const [submitContactForm, { isLoading, isSuccess, isError, error }] =
    useSubmitContactFormMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await submitContactForm(formData).unwrap();
      alert("✅ Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-wrapped">
      <img
        src={contact}
        alt="Contact Page Banner"
        className="contact-page-image"
      />

      {/* Display server message */}
      {serverMessage && (
        <div
          className={`message ${
            isSuccess ? "success" : isError ? "error" : ""
          }`}
        >
          {serverMessage}
        </div>
      )}

      {/* Contact Info Box Row */}
      <div className="contact-details" style={{ marginBottom: "60px" }}>
        <div className="contact-infos" style={{ flex: 1 }}>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div className="contact-content">
              487/65, National Market, Peeragarhi, Delhi, 110087
            </div>
          </div>
        </div>
        <div className="contact-infos" style={{ flex: 1 }}>
          <div className="contact-item">
            <MdOutlinePhoneInTalk className="contact-icon" />
            <a href="tel:+919999500699" className="contact-content">
              +91 9999500699
            </a>
          </div>
        </div>
        <div className="contact-infos" style={{ flex: 1 }}>
          <div className="contact-item">
            <IoMdMail className="contact-icon" />
            <a href="mailto:info@chhabramarble.com" className="contact-content">
              info@chhabramarble.com
            </a>
          </div>
        </div>
      </div>

      {/* Form + Map Side by Side */}
      <div className="contact-details">
        <form className="contact-form-content" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <textarea
            id="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <span className="error">{errors.message}</span>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5353752935225!2d77.08848157603951!3d28.67362748221231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0472b3b66a0d%3A0x67e896cfd98c1c43!2sChhabra%20Marble!5e0!3m2!1sen!2sin!4v1748326959416!5m2!1sen!2sin"
          className="contact-map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Chhabra Marble Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactWrapper;
