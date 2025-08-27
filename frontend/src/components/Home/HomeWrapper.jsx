import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import adhesive from "../../assets/img/home/ADHESIVE.png";
import cp_fittings from "../../assets/img/home/CP FITTING.png";
import surfaces from "../../assets/img/home/SIURFACE.png";
import wellness from "../../assets/img/home/WELLNESS.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import slider from "../../assets/img/home_page_slider.png";
import brands from "../../assets/data/brands";
import BrandsWeOffer from "./BrandsWeOffer";
import loadProjectImages from "../utils/loadProjectImages";
import video from "../../assets/img/video.m4v";
import { useSubmitContactFormMutation } from "../../api/contactApi";
const projectImages = {
  1: {
    master: require("../../assets/img/projects_data/1/Background.jpg"),
    additional: [
      require("../../assets/img/projects_data/1/DSC_7168.jpg"),
      require("../../assets/img/projects_data/1/DSC_7185.jpg"),
      require("../../assets/img/projects_data/1/DSC_7188.jpg"),
      require("../../assets/img/projects_data/1/DSC_7201.jpg"),
      require("../../assets/img/projects_data/1/DSC_7223.jpg"),
      require("../../assets/img/projects_data/1/DSC_7240.jpg"),
      require("../../assets/img/projects_data/1/DSC_7257.jpg"),
    ],
  },
  2: {
    master: require("../../assets/img/projects_data/1/Background.jpg"),
    additional: [
      require("../../assets/img/projects_data/1/DSC_7168.jpg"),
      require("../../assets/img/projects_data/1/DSC_7185.jpg"),
      require("../../assets/img/projects_data/1/DSC_7188.jpg"),
      require("../../assets/img/projects_data/1/DSC_7201.jpg"),
      require("../../assets/img/projects_data/1/DSC_7223.jpg"),
      require("../../assets/img/projects_data/1/DSC_7240.jpg"),
      require("../../assets/img/projects_data/1/DSC_7257.jpg"),
    ],
  },
  3: {
    master: require("../../assets/img/projects_data/1/Background.jpg"),
    additional: [
      require("../../assets/img/projects_data/1/DSC_7168.jpg"),
      require("../../assets/img/projects_data/1/DSC_7185.jpg"),
      require("../../assets/img/projects_data/1/DSC_7188.jpg"),
      require("../../assets/img/projects_data/1/DSC_7201.jpg"),
      require("../../assets/img/projects_data/1/DSC_7223.jpg"),
      require("../../assets/img/projects_data/1/DSC_7240.jpg"),
      require("../../assets/img/projects_data/1/DSC_7257.jpg"),
    ],
  },
};

const HomeWrapper = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const sliderRef = useRef(null);
  const projects = loadProjectImages();
  const [submitContactForm, { isLoading, isSuccess, isError, error }] =
    useSubmitContactFormMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000); // 3s timeout
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2000); // 3s timeout
      return () => clearTimeout(timer);
    }
  }, [isError]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData).unwrap();
      alert("✅ Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("❌ Failed to send:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const slides = [
    {
      content: (
        <>
          <video
            src={video}
            poster={comingsoon}
            autoPlay
            loop
            muted
            playsInline
            className="slider-background"
            onError={(e) => console.error("Video failed to load:", e)}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <img
            src={slider}
            alt="Slider Background"
            className="slider-background"
          />
          <div className="slider-overlay">
            <div className="slider-content">
              <h1>Chhabra Marble</h1>
              <p>
                Your trusted one-stop shop for premium marble, granite, tiles,
                kota stone, and sanitary ware. With 30+ years of experience, we
                offer top-quality materials, competitive prices, and timely
                delivery – built on lasting relationships and trust.
              </p>
              <button onClick={() => navigate("/contact")}>
                Connect With Us
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 30000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (projectId) => {
    setSelectedProject(projectId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const currentProject = projects.find((p) => p.id === selectedProject);

  return (
    <>
      <div className="main-slider" ref={sliderRef}>
        <div
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              {slide.content}
            </div>
          ))}
        </div>
        <button
          className="slider-nav prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          className="slider-nav next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      <section className="home-about-section">
        <h2 className="section-title">
          About <span className="line" />
        </h2>
        <p className="home-about-p">
          Chhabra Marble is built with the vision of providing a one-stop shop
          for all your tiles, granite, and marble needs. With over 30 years of
          experience, we collaborate with interior designers and architects to
          deliver high-quality raw materials that turn visionary ideas into
          reality. Our extensive stock includes the latest varieties of marbles,
          tiles, kota stone, granite, and sanitary ware. Committed to building
          lifelong relationships, we offer competitive pricing, superior
          packaging, and timely delivery to ensure our products arrive in
          perfect condition.
        </p>
      </section>
      <section className="home-product-section">
        <h2 className="section-title">
          Categories
          <span className="section-underline" />
        </h2>
        <div className="product-grid">
          <div className="product-card">
            <img src={cp_fittings} alt="CP Fittings" />
            <div className="product-info">
              <h3>CP FITTINGS & SANITARY</h3>
              <p>Stylish and durable fittings for modern bathrooms.</p>
            </div>
          </div>
          <div className="product-card">
            <img src={wellness} alt="Tiles" />
            <div className="product-info">
              <h3>TILES</h3>
              <p>High-quality tiles for timeless beauty and durability.</p>
            </div>
          </div>
          <div className="product-card">
            <img src={surfaces} alt="Stones & Granites" />
            <div className="product-info">
              <h3>STONES</h3>
              <p>Premium stones for elegant finishes.</p>
            </div>
          </div>
          <div className="product-card">
            <img src={adhesive} alt="Chemicals & Adhesive" />
            <div className="product-info">
              <h3>CHEMICALS & ADHESIVE</h3>
              <p>Reliable adhesives for strong and lasting installations.</p>
            </div>
          </div>
          <div className="product-card">
            <img src={adhesive} alt="Accessories & Add-ons" />
            <div className="product-info">
              <h3>ACCESSORIES & ADD ONS</h3>
              <p>Enhance your projects with premium accessories.</p>
            </div>
          </div>
          <div className="product-card">
            <img src={wellness} alt="Plumbing" />
            <div className="product-info">
              <h3>PLUMBING</h3>
              <p>High-quality plumbing solutions for seamless functionality.</p>
            </div>
          </div>
        </div>
      </section>
      <BrandsWeOffer brands={brands} />
      {/* <section className="home-projects-section">
        <h2 className="section-title">
          Our Projects
          <span className="line" />
        </h2>
        <p className="section-description">
          Trusted by architects, builders, and designers for delivering
          top-quality stone and tile solutions across residential and commercial
          spaces.
        </p>
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="image-section"
                style={{ position: "relative" }}
              >
                <img
                  src={project.imgSrc}
                  alt={project.alt}
                  onError={(e) => {
                    e.target.src = comingsoon;
                  }}
                />
                <div
                  className="arrow-overlay"
                  onClick={() => openModal(project.id)}
                  aria-label={`View project ${project.id}`}
                >
                  →
                </div>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </section> */}
      {/* Note: This video section seems out of place; consider styling or removing */}
      <video
        src={video}
        poster={comingsoon}
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => console.error("Video failed to load:", e)}
      />
      <section className="home-contact-section">
        <h2 className="section-title">
          Contact
          <span className="line" />
        </h2>
        <div className="contact-wrapper">
          <div className="contact-box">
            <form className="contact-form-content" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "SEND MESSAGE"}
              </button>
            </form>

            {/* Feedback messages */}
            {showSuccess && (
              <p className="success-msg">✅ Thank you! We’ll reply soon.</p>
            )}
            {showError && (
              <p className="error-msg">
                ❌ Error: {error?.data?.message || "Try again later."}
              </p>
            )}
          </div>
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Any question or remarks? Just write us a message!</p>
            <div className="contact-item">
              <div className="contact-icon">
                <MdOutlinePhoneInTalk />
              </div>
              <a href="tel:+919999500699" className="contact-content">
                +91 9999500699
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <IoMdMail />
              </div>
              <a
                href="mailto:info@chhabramarble.com"
                className="contact-content"
              >
                info@chhabramarble.com
              </a>
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
              href="https://maps.app.goo.gl/wrcNUWzpJB6oB7yL9"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-button"
            >
              FIND US
            </a>
          </div>
        </div>
      </section>
      {showModal && currentProject && (
        <div className="all-projects-view" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{currentProject.alt}</h3>
            <div className="project-all-images">
              <img
                src={currentProject.imgSrc}
                alt={`${currentProject.alt} - Master`}
                className="project-image"
                onError={(e) => {
                  e.target.src = comingsoon;
                }}
              />
              {projectImages[currentProject.id]?.additional.map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${currentProject.alt} - Additional ${index + 1}`}
                    className="project-image"
                    onError={(e) => {
                      e.target.src = comingsoon;
                    }}
                  />
                )
              )}
            </div>
            <button
              className="close-view-button"
              onClick={closeModal}
              aria-label="Close project modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeWrapper;
