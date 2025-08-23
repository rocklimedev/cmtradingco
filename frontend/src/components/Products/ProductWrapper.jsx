import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import brands from "../../assets/data/brands";
import project_title from "../../assets/img/projects/projects_title.png";
import cp_fittings from "../../assets/img/home/CP FITTING.png";
import wellness from "../../assets/img/home/WELLNESS.png";
import surfaces from "../../assets/img/home/SIURFACE.png";
import adhesive from "../../assets/img/home/ADHESIVE.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import "./wrapper.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProductWrapper = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const modalRef = useRef(null);

  // Category to brand mapping
  const categoryBrands = {
    "CP Fittings & Sanitary": ["Grohe", "American Standard", "Colston"],
    Tiles: ["Shiv Ceramic SGT", "JTC", "Nexion"],
    Stones: [],
    "Chemicals & Adhesive": ["JK Tylo", "Walpast"],
    "Accessories & Add-ons": ["Grohe", "American Standard"],
    Plumbing: ["Kantherm"],
  };

  // Filter brands based on selected category
  const filteredBrands = selectedCategory
    ? brands.filter((brand) =>
        categoryBrands[selectedCategory].includes(brand.name)
      )
    : brands;

  // Flatten PDFs for the selected category’s brands
  const categoryPdfs = selectedCategory
    ? filteredBrands.flatMap((brand) =>
        brand.pdfs.map((pdf) => ({ ...pdf, brandName: brand.name }))
      )
    : [];

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleViewAll = () => {
    setSelectedCategory(null);
  };

  const handleCatalogueClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="product-page-wrapper">
      <img
        src={project_title}
        alt="Products Banner"
        className="product-page-image"
        loading="lazy"
      />
      <section className="banner-overlay">
        <h2 className="project-title">Our Brands</h2>
        {selectedCategory && (
          <button className="view-all-button" onClick={handleViewAll}>
            Back to Categories
          </button>
        )}
        {!selectedCategory ? (
          <>
            <div className="product-grid">
              <div
                className="product-card"
                onClick={() => handleCategoryClick("CP Fittings & Sanitary")}
              >
                <img src={cp_fittings} alt="CP Fittings" />
                <div className="product-info">
                  <h3>CP FITTINGS & SANITARY</h3>
                  <p>Stylish and durable fittings for modern bathrooms.</p>
                </div>
              </div>
              <div
                className="product-card"
                onClick={() => handleCategoryClick("Tiles")}
              >
                <img src={wellness} alt="Tiles" />
                <div className="product-info">
                  <h3>TILES</h3>
                  <p>High-quality tiles for timeless beauty and durability.</p>
                </div>
              </div>
              <div
                className="product-card"
                onClick={() => handleCategoryClick("Stones")}
              >
                <img src={surfaces} alt="Stones & Granites" />
                <div className="product-info">
                  <h3>STONES</h3>
                  <p>Premium stones for elegant finishes.</p>
                </div>
              </div>
              <div
                className="product-card"
                onClick={() => handleCategoryClick("Chemicals & Adhesive")}
              >
                <img src={adhesive} alt="Chemicals & Adhesive" />
                <div className="product-info">
                  <h3>CHEMICALS & ADHESIVE</h3>
                  <p>
                    Reliable adhesives for strong and lasting installations.
                  </p>
                </div>
              </div>
              <div
                className="product-card"
                onClick={() => handleCategoryClick("Accessories & Add-ons")}
              >
                <img src={adhesive} alt="Accessories & Add-ons" />
                <div className="product-info">
                  <h3>ACCESSORIES & ADD ONS</h3>
                  <p>Enhance your projects with premium accessories.</p>
                </div>
              </div>
              <div
                className="product-card"
                onClick={() => handleCategoryClick("Plumbing")}
              >
                <img src={wellness} alt="Plumbing" />
                <div className="product-info">
                  <h3>PLUMBING</h3>
                  <p>
                    High-quality plumbing solutions for seamless functionality.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <section className="brands-gallery" aria-label="Catalogues">
            {categoryPdfs.length > 0 ? (
              <div className="product-grid">
                {categoryPdfs.map((pdf) => (
                  <div
                    key={pdf.pdfId}
                    className="product-card"
                    onClick={() => handleCatalogueClick(pdf.url)}
                  >
                    <img
                      src={pdf.thumbnailUrl || comingsoon}
                      alt={`${pdf.title} Catalogue`}
                      className="catalogue-image"
                      loading="lazy"
                    />
                    <div className="product-info">
                      <h3>{pdf.title}</h3>
                      <p>{pdf.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-catalogues" aria-live="polite">
                No catalogues available for {selectedCategory}.
              </p>
            )}
          </section>
        )}
      </section>

      {showModal && selectedPdf && (
        <div
          className="pdf-modal"
          role="dialog"
          aria-labelledby="pdf-modal-title"
        >
          <div className="pdf-modal-content" ref={modalRef}>
            <div className="pdf-modal-header">
              <h3 id="pdf-modal-title">{selectedPdf.title}</h3>
              <button
                onClick={handleCloseModal}
                className="close-button"
                aria-label="Close PDF viewer"
              >
                ×
              </button>
            </div>
            <div className="pdf-modal-body">
              <Document
                file={selectedPdf.url}
                onLoadSuccess={onDocumentLoadSuccess}
                className="pdf-document"
                loading={<p>Loading PDF...</p>}
                error={<p>Error loading PDF. Please try again.</p>}
              >
                <Page pageNumber={pageNumber} scale={1.0} />
              </Document>
              <div className="pdf-controls">
                <button
                  onClick={handlePreviousPage}
                  disabled={pageNumber <= 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <p>
                  Page {pageNumber} of {numPages || "..."}
                </p>
                <button
                  onClick={handleNextPage}
                  disabled={pageNumber >= numPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductWrapper;
