import React from "react";
import slider from "../../assets/img/home_page_slider.jpg";
const MainSlider = () => {
  return (
    <div className="main-slider">
      <img src={slider} alt="Slider Background" />
      <div className="slider-info">
        <a href="#">Chhabra Marble</a>
        <p>
          Your trusted one-stop shop for premium marble, granite, tiles, kota
          stone, and sanitary ware. With 30+ years of experience, we offer
          top-quality materials, competitive prices, and timely delivery – built
          on lasting relationships and trust.
        </p>
        <button>Connect With Us</button>
      </div>
    </div>
  );
};

export default MainSlider;
