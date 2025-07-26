import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import brands from "../../assets/data/brands"; // Adjust path as needed

const BrandSlider = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isPaused, setIsPaused] = useState(false); // Track pause state
  const sliderRef = useRef(null);
  const modalRef = useRef(null);
  const animationRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Continuous scrolling
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollSpeed = 1; // Pixels per frame
    let lastTime = 0;

    const scroll = (time) => {
      if (isPaused || isDragging.current) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;

      // Adjust scroll speed based on frame time (60 FPS ~ 16.67ms)
      if (deltaTime > 16.67) {
        slider.scrollLeft += scrollSpeed;
        lastTime = time;

        // Loop back to start when reaching the end
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // Resume scrolling and stop dragging on mouse leave
  const handleMouseLeave = () => {
    isDragging.current = false; // Stop any active drag
    setIsPaused(false); // Resume scrolling
  };

  // Touch and drag support
  const handleTouchStart = (e) => {
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault(); // Prevent default scrolling
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Adjust drag sensitivity
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setIsPaused(false); // Resume scrolling after drag
  };

  // Mouse drag support
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

  // Handle click outside modal to close
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

  // Handle ESC key to close modal
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const handleArrowClick = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 350; // Width of one slide
    if (direction === "prev") {
      slider.scrollLeft -= scrollAmount;
      if (slider.scrollLeft <= 0) {
        slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
      }
    } else {
      slider.scrollLeft += scrollAmount;
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }
    }
  };

  return (
    <div className="brands-we-offer">
      <div
        className="brands-grid"
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} // Consolidated handler
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {brands.map((brand, index) => (
          <div
            key={brand.name}
            className="box-section"
            onClick={() => brand.pdf && handleViewPdf(brand.pdf)} // Only trigger if brand has a PDF
          >
            <img
              src={brand.logoSrc}
              alt={`${brand.name} Logo`}
              className="company-logo"
              loading="lazy"
            />
          </div>
        ))}
        {/* Duplicate brands for seamless looping */}
        {brands.map((brand, index) => (
          <div
            key={`duplicate-${brand.name}`}
            className="box-section"
            onClick={() => brand.pdf && handleViewPdf(brand.pdf)}
          >
            <img
              src={brand.logoSrc}
              alt={`${brand.name} Logo`}
              className="company-logo"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button
          className="arrow"
          onClick={() => handleArrowClick("prev")}
          aria-label="Previous brand"
        >
          ←
        </button>
        <button
          className="arrow"
          onClick={() => handleArrowClick("next")}
          aria-label="Next brand"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default BrandSlider;
