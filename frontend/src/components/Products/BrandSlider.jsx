import React, { useEffect, useRef, useState } from "react";

const BrandSlider = ({
  activeBrandIndex = 0,
  setActiveBrandIndex,
  brands = [], // ✅ Default to empty array
}) => {
  const sliderRef = useRef(null);
  const [slideOffset, setSlideOffset] = useState(0);

  // Calculate slide width + gap based on screen size
  const getSlideOffset = () => {
    const width = window.innerWidth;
    if (width <= 480) return 100 + 16;
    if (width <= 768) return 120 + 24;
    return 160 + 32;
  };

  // Update slide offset on mount + resize
  useEffect(() => {
    const updateSlideOffset = () => {
      setSlideOffset(getSlideOffset());
    };
    updateSlideOffset();
    window.addEventListener("resize", updateSlideOffset);
    return () => window.removeEventListener("resize", updateSlideOffset);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!brands || brands.length === 0) return; // ✅ Guard
    const interval = setInterval(() => {
      setActiveBrandIndex((prev) => (prev + 1) % brands.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [setActiveBrandIndex, brands]);

  const handleNextBrand = () => {
    if (brands.length === 0) return;
    setActiveBrandIndex((prev) => (prev + 1) % brands.length);
  };

  const handlePrevBrand = () => {
    if (brands.length === 0) return;
    setActiveBrandIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };

  const handleBrandClick = (index) => {
    setActiveBrandIndex(index);
  };

  return (
    <div className="brand-slider">
      <button
        className="slider-nav prev"
        onClick={handlePrevBrand}
        aria-label="Previous brand"
        disabled={brands.length === 0} // ✅ Disable if no brands
      >
        ←
      </button>

      <div className="brand-slider-wrapper" ref={sliderRef}>
        <div
          className="brand-slider-inner"
          style={{
            transform: `translateX(-${activeBrandIndex * slideOffset}px)`,
            transition: "transform 0.4s ease",
          }}
        >
          {Array.isArray(brands) && brands.length > 0 ? (
            brands.map((brand, index) => (
              <div
                key={brand.name || index}
                className={`brand-slide ${
                  index === activeBrandIndex ? "active" : ""
                }`}
                onClick={() => handleBrandClick(index)}
                aria-current={index === activeBrandIndex ? "true" : "false"}
              >
                <img
                  src={brand.logoSrc}
                  alt={`${brand.name || "Brand"} Logo`}
                  className="brand-logo"
                  loading="lazy"
                />
                <h3 className="brand-title">{brand.name}</h3>
              </div>
            ))
          ) : (
            <p className="no-brands">No brands available</p> // ✅ Fallback
          )}
        </div>
      </div>

      <button
        className="slider-nav next"
        onClick={handleNextBrand}
        aria-label="Next brand"
        disabled={brands.length === 0}
      >
        →
      </button>
    </div>
  );
};

export default BrandSlider;
