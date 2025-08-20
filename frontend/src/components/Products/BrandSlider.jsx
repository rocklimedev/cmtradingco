import React, { useState, useEffect, useRef } from "react";
import brands from "../../assets/data/brands"; // Adjust path as needed

const BrandSlider = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const sliderRef = useRef(null);

  // Auto-slide every 5 seconds (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBrandIndex((prev) => (prev + 1) % brands.length);
    }, 5000); // Adjust timing as needed
    return () => clearInterval(interval);
  }, []);

  const handleNextBrand = () => {
    setActiveBrandIndex((prev) => (prev + 1) % brands.length);
  };

  const handlePrevBrand = () => {
    setActiveBrandIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };

  const handleBrandClick = (index) => {
    setActiveBrandIndex(index);
  };

  // Calculate slide width and gap based on screen size
  const getSlideOffset = () => {
    const width = window.innerWidth;
    if (width <= 480) {
      return 100 + 16; // Slide width (100px) + gap (16px)
    } else if (width <= 768) {
      return 120 + 24; // Slide width (120px) + gap (24px)
    }
    return 160 + 32; // Slide width (160px) + gap (32px)
  };

  return (
    <div className="brand-slider">
      <button
        className="slider-nav prev"
        onClick={handlePrevBrand}
        aria-label="Previous brand"
      >
        ←
      </button>
      <div className="brand-slider-wrapper" ref={sliderRef}>
        <div
          className="brand-slider-inner"
          style={{
            transform: `translateX(-${activeBrandIndex * getSlideOffset()}px)`,
            transition: "transform 0.4s ease",
          }}
        >
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`brand-slide ${
                index === activeBrandIndex ? "active" : ""
              }`}
              onClick={() => handleBrandClick(index)}
              aria-current={index === activeBrandIndex ? "true" : "false"}
            >
              <img
                src={brand.logoSrc}
                alt={`${brand.name} Logo`}
                className="brand-logo"
                loading="lazy"
              />
              <h3 className="brand-title">{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <button
        className="slider-nav next"
        onClick={handleNextBrand}
        aria-label="Next brand"
      >
        →
      </button>
    </div>
  );
};

export default BrandSlider;
