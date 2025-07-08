import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import adhesive from "../../assets/img/home/ADHESIVE.png";
import cp_fittings from "../../assets/img/home/CP FITTING.png";
import surfaces from "../../assets/img/home/SIURFACE.png";
import wellness from "../../assets/img/home/WELLNESS.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import video from "../../assets/img/video.m4v";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import slider from "../../assets/img/home_page_slider.png";
import brands from "../../assets/data/brands"; // Import the JSON file

const HomeWrapper = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const projects = [
    {
      id: 1,
      imgSrc: comingsoon,
      alt: "Residential Marble Installation",
      caption: "Luxurious marble interiors for a modern home",
    },
    {
      id: 2,
      imgSrc: comingsoon,
      alt: "Commercial Granite Flooring",
      caption: "Durable granite flooring for a corporate office",
    },
    {
      id: 3,
      imgSrc: comingsoon,
      alt: "Luxury Tile Design",
      caption: "Elegant tile patterns for a boutique showroom",
    },
    {
      id: 4,
      imgSrc: comingsoon,
      alt: "Kota Stone Pathway",
      caption: "Rustic kota stone pathway for a garden",
    },
  ];

  const slides = [
    {
      content: (
        <>
          <video
            src={video}
            poster={comingsoon}
            controls
            muted
            autoPlay
            loop
            playsInline
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
              <button>Connect With Us</button>
            </div>
          </div>
        </>
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 30000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

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
        <h2 className="home-about-span">About</h2>
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
          Product
          <span className="section-underline" />
        </h2>

        <div className="product-grid">
          <div className="row double">
            <div className="product-card">
              <img src={surfaces} alt="Sanitary" />
              <div className="product-info">
                <h3>SURFACES</h3>
                <p>
                  Premium sanitary ware that blends style, comfort, and
                  durability
                </p>
              </div>
            </div>
          </div>
          <div className="row double">
            <div className="product-card">
              <img src={cp_fittings} alt="Tile" />
              <div className="product-info">
                <h3>CP FITTINGS</h3>
                <p>
                  Stylish tiles for every surface, crafted for beauty and
                  durability.
                </p>
              </div>
            </div>
          </div>
          <div className="row double">
            <div className="product-card">
              <img src={wellness} alt="Granite" />
              <div className="product-info">
                <h3>WELLNESS</h3>
                <p>
                  High-quality granite for timeless strength and elegant
                  finishes
                </p>
              </div>
            </div>
          </div>
          <div className="row double">
            <div className="product-card">
              <img src={adhesive} alt="Granite" />
              <div className="product-info">
                <h3>ADHESIVE</h3>
                <p>
                  High-quality granite for timeless strength and elegant
                  finishes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brands-we-offer">
        <h2 className="section-title" style={{ color: "white" }}>
          Brands We Offer
          <span className="line" style={{ backgroundColor: "white" }} />
        </h2>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div className="box-section" key={index}>
              <div
                onClick={() => navigate(brand.link, { state: { brand } })}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={brand.logoSrc}
                  alt={brand.name}
                  className="company-logo"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-projects-section">
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
          {projects.map((project) => (
            <div key={project.id} className="image-section">
              <img src={project.imgSrc} alt={project.alt} />
              <p>{project.caption}</p>
            </div>
          ))}
        </div>
        <Link to="/project" className="view-all-button">
          View All
        </Link>
      </section>
      <section className="home-showroom-video">
        <h2 className="section-title">
          Our Showroom
          <span className="line" />
        </h2>
        <video
          src={video}
          poster={comingsoon}
          controls
          muted
          autoPlay
          loop
          playsInline
        />
      </section>
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
              href="https://maps.google.com/?q=487/65,National+Market,Peeragarhi,Delhi,110087"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-button"
            >
              FIND US
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeWrapper;
