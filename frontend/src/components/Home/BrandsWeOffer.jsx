import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import brands from "../../assets/data/brands"; // Adjust path as needed
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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

  // Continuous scrolling
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollSpeed = 1;
    let lastTime = 0;

    const scroll = (time) => {
      if (isPaused || isDragging.current) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;

      if (deltaTime > 16.67) {
        slider.scrollLeft += scrollSpeed;
        lastTime = time;

        // Ensure seamless looping
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  // Touch drag
  const handleTouchStart = (e) => {
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
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

  // Mouse drag
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

  const handleArrowClick = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Calculate scroll amount based on the width of a single brand item
    const brandWidth = 350; // Matches .box-section width
    const scrollAmount = brandWidth * 1; // Scroll by one brand item

    if (direction === "prev") {
      slider.scrollLeft -= scrollAmount;
      if (slider.scrollLeft < 0) {
        slider.scrollLeft = slider.scrollWidth / 2; // Loop to the end of the first set
      }
    } else {
      slider.scrollLeft += scrollAmount;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0; // Loop to the start
      }
    }

    // Force smooth scrolling
    slider.scrollTo({
      left: slider.scrollLeft,
      behavior: "smooth",
    });
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
        {/* Duplicate brands */}
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
        <button className="arrow prev" onClick={() => handleArrowClick("prev")}>
          <FaChevronLeft />
        </button>
        <button className="arrow next" onClick={() => handleArrowClick("next")}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BrandSlider;
