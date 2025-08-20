import React from "react";

const BrandSlider = ({ brands = [], speed = 30 }) => {
  if (!Array.isArray(brands) || brands.length === 0) {
    return <p className="no-brands">No brands available</p>;
  }

  // Duplicate brands for seamless looping
  const doubledBrands = [...brands, ...brands];

  return (
    <div
      className="brand-slider"
      style={{
        // Allow dynamic speed control
        ["--scroll-speed"]: `${speed}s`,
      }}
    >
      <div className="brand-slider-wrapper">
        <div className="brand-slider-inner">
          {doubledBrands.map((brand, index) => (
            <div key={index} className="brand-slide">
              <img
                src={brand.logoSrc}
                alt={`${brand.name || "Brand"} Logo`}
                className="brand-logo"
                loading="lazy"
              />
              <h3 className="brand-title">{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
