import React from "react";
import { Link } from "react-router-dom";
import MainSlider from "./MainSlider";
import product_1 from "../../assets/img/home/product_1.jpg";
import product_2 from "../../assets/img/home/product_2.png";
import product_3 from "../../assets/img/home/product_3.jpg";
import product_4 from "../../assets/img/home/product_4.jpg";
import product_5 from "../../assets/img/home/product_5.png";
import company_1 from "../../assets/img/brand_logos/american_standard.png";
import company_2 from "../../assets/img/brand_logos/grohe.png";
import company_3 from "../../assets/img/brand_logos/jk_cement.png";
import company_4 from "../../assets/img/brand_logos/jktylo.png";
import company_5 from "../../assets/img/brand_logos/nexion.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import video from "../../assets/img/video.mp4";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";

const HomeWrapper = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic (e.g., API call)
    console.log("Form submitted");
  };

  return (
    <div className="main-content">
      <MainSlider />
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
          Our Products
          <span className="line" />
        </h2>
        <div className="home-product-image-section">
          <div className="home-products">
            <img src={product_1} alt="Sanitary Product" />
            <div className="details">
              <span>SANITARY</span>
              <p>
                Premium sanitary ware blending style, comfort, and durability
              </p>
            </div>
          </div>
          <div className="home-products">
            <img src={product_2} alt="Tiles Product" />
            <div className="details">
              <span>TILES</span>
              <p>High-quality tiles for elegant and durable surfaces</p>
            </div>
          </div>
          <div className="home-products">
            <img src={product_3} alt="Granite Product" />
            <div className="details">
              <span>GRANITE</span>
              <p>Premium granite for timeless strength and beauty</p>
            </div>
          </div>
          <div className="home-products">
            <img src={product_4} alt="Kota Stone Product" />
            <div className="details">
              <span>KOTA STONE</span>
              <p>Natural kota stone for rustic and durable flooring</p>
            </div>
          </div>
          <div className="home-products">
            <img src={product_5} alt="Marble Product" />
            <div className="details">
              <span>MARBLE</span>
              <p>Luxurious marble for sophisticated interiors</p>
            </div>
          </div>
        </div>
      </section>
      <section className="brands-we-offer">
        <h2 className="section-title">Brands We Offer</h2>
        <div className="brands-grid">
          {[
            { src: company_1, alt: "American Standard Logo" },
            { src: company_2, alt: "Grohe Logo" },
            { src: company_3, alt: "JK Cement Logo" },
            { src: company_4, alt: "JK Tylo Logo" },
            { src: company_5, alt: "Nexion Logo" },
          ].map((brand, index) => (
            <div className="box-section" key={index}>
              <img src={brand.src} alt={brand.alt} className="company-logo" />
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
        <div className="contact-form">
          <form className="contact-form-content" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              required
            />
            <button type="submit">Send Message</button>
          </form>
          <div className="contact-info">
            <span>Contact Information</span>
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
              Find Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeWrapper;
