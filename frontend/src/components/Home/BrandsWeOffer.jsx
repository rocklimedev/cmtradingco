import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import brands from "../../assets/data/brands"; // Adjust path as needed
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// ----------------------
// BrandSlider (fixed)
// ----------------------
// Key fixes and improvements included in this file:
// 1. Removed `pointer-events: none` on the arrows container (that prevented clicks).
// 2. Added global mouseup / touchend listeners so drag state ends correctly even when pointer leaves the slider.
// 3. Use `scrollBy` with smooth behavior for arrow clicks and correct looping logic after animation.
// 4. Added `type="button"` to prevent accidental form submits.
// 5. Small accessibility improvements (aria-labels).

const BrandSlider = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const sliderRef = useRef(null);
  const modalRef = useRef(null);
  const animationRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Continuous scrolling (keeps original behaviour but with safer RAF cleanup)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollSpeed = 1;
    let lastTime = 0;

    const scroll = (time) => {
      // keep the RAF running but don't advance when paused or dragging
      if (isPaused || isDragging.current) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;

      // throttle to ~60fps
      if (deltaTime > 16.67) {
        slider.scrollLeft += scrollSpeed;
        lastTime = time;

        // loop when we've scrolled past the first duplicated set
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  // Ensure drag ends even if pointer is released outside the slider
  useEffect(() => {
    const handleWindowUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        setIsPaused(false);
      }
    };

    window.addEventListener("mouseup", handleWindowUp);
    window.addEventListener("touchend", handleWindowUp);

    return () => {
      window.removeEventListener("mouseup", handleWindowUp);
      window.removeEventListener("touchend", handleWindowUp);
    };
  }, []);

  // Modal handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") handleCloseModal();
    };
    if (showModal) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showModal]);

  const handleViewPdf = (pdf) => {
    setSelectedPdf(pdf);
    setShowModal(true);
    setPageNumber(1);
    setNumPages(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPdf(null);
    setNumPages(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  // Arrow click — use scrollBy to get smooth behaviour and then fix the loop
  const handleArrowClick = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Calculate scroll amount based on the width of a single brand item
    const brandWidth = 350; // Keep in sync with .box-section width
    const scrollAmount = brandWidth;

    // Use scrollBy so we get smooth animation immediately
    if (direction === "prev") {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // After the smooth scroll completes, ensure the loop is seamless.
    // We use a small timeout to run after the animation finishes.
    // (You can tune timeout to match your scroll behavior / CSS.)
    setTimeout(() => {
      const half = slider.scrollWidth / 2;
      if (slider.scrollLeft >= half) {
        // move back by exactly one duplicated set width
        slider.scrollLeft = slider.scrollLeft - half;
      }
      if (slider.scrollLeft < 0) {
        slider.scrollLeft = slider.scrollLeft + half;
      }
    }, 450);
  };

  return (
    <div className="brands-we-offer">
      {/* Slider Content */}
      <div
        className="brands-grid"
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="box-section"
            onClick={() => brand.pdf && handleViewPdf(brand.pdf)}
          >
            <Link to={brand.link}>
              <img
                src={brand.logoSrc}
                alt={`${brand.name} Logo`}
                className="company-logo"
                loading="lazy"
              />
            </Link>
          </div>
        ))}
        {/* Duplicate brands for seamless loop */}
        {brands.map((brand) => (
          <div
            key={`duplicate-${brand.name}`}
            className="box-section"
            onClick={() => brand.pdf && handleViewPdf(brand.pdf)}
          >
            <Link to={brand.link}>
              <img
                src={brand.logoSrc}
                alt={`${brand.name} Logo`}
                className="company-logo"
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Arrow Controls */}
      <div className="slider-controls">
        <button
          type="button"
          className="arrow prev"
          onClick={() => handleArrowClick("prev")}
          aria-label="Previous brands"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          className="arrow next"
          onClick={() => handleArrowClick("next")}
          aria-label="Next brands"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BrandSlider;
