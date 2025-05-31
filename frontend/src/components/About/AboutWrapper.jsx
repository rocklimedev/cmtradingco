import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import about_title from "../../assets/img/about/about_title_page.jpg";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import allinone from "../../assets/img/about/why-us/all-in-one.png";
import competitive from "../../assets/img/about/why-us/competitive-pricing.png";
import ressupport from "../../assets/img/about/why-us/res-support.png";
import widerange from "../../assets/img/about/why-us/wide-range.png";
const AboutWrapper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const journeyCards = [
    { id: 1, imgSrc: "", alt: "Journey Milestone 1" },
    { id: 2, imgSrc: "", alt: "Journey Milestone 2" },
    { id: 3, imgSrc: "", alt: "Journey Milestone 3" },
    { id: 4, imgSrc: "", alt: "Journey Milestone 4" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % journeyCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + journeyCards.length) % journeyCards.length
    );
  };

  return (
    <div className="about-wrapper">
      <img
        src={about_title}
        alt="About Page Banner"
        className="about-page-image"
      />
      <h2 className="about-page-title">About</h2>
      <p className="about-content-p">
        Chhabra Marble is built with the vision of proving a one stop shop to
        its customers for all their tiles, granites and marble needs. Being in
        the business for more than 30 years, we have enough experience to be
        able to work with interior designers and architects and provide them
        with the best quality raw materials that turn the valuable ideas into
        reality. As far as the stocks are concerned we house the latest variety
        of marbles, tiles, kota stone, granite etc. We also deal in sanitary
        ware. We render our services with the desire to establish lifelong
        relationships with our valuable customers hence we take utmost care to
        provide them with best pricing when compared to other competitors. We
        also ensure best packaging and delivery so that our products reach well
        on time and are in their best shape.
      </p>
      <div className="about-page-box-section">
        <img
          src={comingsoon}
          alt="Vision Image"
          className="about-page-box-image"
        />
        <div className="about-page-box-text">
          <div className="about-page-span">
            Vision <span className="line" />
          </div>
          <div className="about-page-box-content">
            To be the leading provider of premium marble, granite, tiles, and
            sanitary ware, delivering innovative and high-quality solutions that
            transform spaces and exceed customer expectations.
          </div>
        </div>
      </div>
      <div className="about-page-box-section">
        <div className="about-page-box-text">
          <div className="about-page-span">
            Mission <span className="line" />
          </div>
          <div className="about-page-box-content">
            To deliver top-quality materials with exceptional service, fostering
            lasting relationships with our customers through competitive
            pricing, timely delivery, and a commitment to excellence.
          </div>
        </div>
        <img
          src={comingsoon}
          alt="Mission Image"
          className="about-page-box-image"
        />
      </div>
      <div className="about-page-box-section">
        <span className="about-page-why-us">Why Us</span>
        <div className="about-page-boxes">
          <div className="about-page-box">
            <div className="about-page-box-icon">
              <img src={allinone} />
            </div>
            <p className="about-page-box-icon-text">All-in-One Destination</p>
          </div>
          <div className="about-page-box">
            <div className="about-page-box-icon">
              <img src={competitive} />
            </div>
            <p className="about-page-box-icon-text">30+ Years of Experience</p>
          </div>
          <div className="about-page-box">
            <div className="about-page-box-icon">
              <img src={ressupport} />
            </div>
            <p className="about-page-box-icon-text">Competitive Pricing</p>
          </div>
          <div className="about-page-box">
            <div className="about-page-box-icon">
              <img src={widerange} />
            </div>
            <p className="about-page-box-icon-text">Timely Delivery</p>
          </div>
        </div>
      </div>

      <div className="journey">
        <h3 className="journey-title">Chhabra Marble Journey</h3>
        <div className="journey-slider">
          <button
            className="journey-nav journey-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            &larr;
          </button>
          <div
            className="journey-slider-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {journeyCards.map((card) => (
              <div key={card.id} className="journey-card">
                <img
                  src={comingsoon}
                  alt={card.alt}
                  className="journey-card-image"
                />
              </div>
            ))}
          </div>
          <button
            className="journey-nav journey-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutWrapper;
