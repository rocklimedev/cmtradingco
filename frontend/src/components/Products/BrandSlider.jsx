import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import brands from "../../assets/data/brands"; // Adjust path as needed
const BrandSlider = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const modalRef = useRef(null);
  const sliderRef = useRef(null);

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

  const handleNextBrand = () => {
    setActiveBrandIndex((prev) => (prev + 1) % brands.length);
  };

  const handlePrevBrand = () => {
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
      >
        ←
      </button>
      <div className="brand-slider-wrapper" ref={sliderRef}>
        {brands.map((brand, index) => (
          <div
            key={brand.name}
            className={`brand-slide ${
              index === activeBrandIndex ? "active" : ""
            }`}
            onClick={() => handleBrandClick(index)}
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
