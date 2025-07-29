import React, { useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import contact from "../../assets/img/contact_title_section.jpg";

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
              name="firstName"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email" required />
            <input type="tel" name="phone" placeholder="Phone Number" />
          </div>
          <textarea name="message" placeholder="Your Message" required />
          <button type="submit">SEND MESSAGE</button>
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
