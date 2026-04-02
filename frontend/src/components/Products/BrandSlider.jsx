import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BrandSlider = ({ brands = [], speed = 30 }) => {
  if (!Array.isArray(brands) || brands.length === 0) {
    return <p className="no-brands">No brands available</p>;
  }

  // Duplicate for infinite effect
  const doubledBrands = [...brands, ...brands];

  return (
    <section className="brand-slider-section">
      <div
        className="brand-slider"
        style={{
          ["--scroll-speed"]: `${speed}s`,
        }}
      >
        <div className="brand-slider-track">
          {doubledBrands.map((brand, index) => (
            <div key={index} className="brand-logo-wrapper">
              {" "}
              {/* Wrap img with Link and use brand.link */}
              <img
                src={brand.logoSrc}
                alt={`${brand.name || "Brand"} Logo`}
                className="brand-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
