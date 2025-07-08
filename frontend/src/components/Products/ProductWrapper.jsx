import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import brands from "../../assets/data/brands"; // Adjust path as needed
import project_title from "../../assets/img/projects/projects_title.png";
import product_1 from "../../assets/img/home/product_1.jpg";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import "./wrapper.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProductWrapper = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const modalRef = useRef(null);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling
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
        <div className="products-section">
          <div className="section-products">
            <img src={product_1} alt="Premium Products" loading="lazy" />
            <div className="section-details">
              <span>Premium Products</span>
              <p>
                Explore our curated selection of top-tier brands offering
                premium sanitary ware, tiles, cement, and more.
              </p>
            </div>
          </div>
          <div className="project-content">
            <p>
              Chhabra Marble is your one-stop shop for high-quality tiles,
              granites, marbles, and sanitary ware. With over 30 years of
              experience, we partner with leading brands to provide architects,
              designers, and homeowners with the finest materials. Browse our
              brand catalogues below to discover innovative and durable
              solutions for your projects.
            </p>
          </div>
        </div>
      </section>

      <section className="brands-gallery" aria-label="Brands and Catalogues">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand.name} className="brand-section">
              <div className="brand-header">
                <img
                  src={brand.logoSrc}
                  alt={`${brand.name} Logo`}
                  className="brand-logo"
                  loading="lazy"
                />
                <div className="brand-info">
                  <h3 className="brand-title">{brand.name}</h3>
                  <p className="brand-subtitle">{brand.subtitle}</p>
                </div>
              </div>
              <p className="brand-content">{brand.content}</p>
              {brand.pdfs.length > 0 ? (
                <div className="catalogue-grid">
                  {brand.pdfs.map((pdf) => (
                    <article key={pdf.pdfId} className="catalogue-card">
                      <div className="catalogue-image-wrapper">
                        <img
                          src={pdf.thumbnailUrl || comingsoon}
                          alt={`${pdf.title} Catalogue`}
                          className="catalogue-image"
                          loading="lazy"
                        />
                        <div className="catalogue-actions">
                          <a
                            href={pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="catalogue-action-btn"
                            aria-label={`Open ${pdf.title} catalogue in new tab`}
                            title="Open in New Tab"
                          >
                            <span className="material-icons">open_in_new</span>
                          </a>
                          <button
                            onClick={() => handleViewPdf(pdf)}
                            className="catalogue-action-btn"
                            aria-label={`View ${pdf.title} catalogue in modal`}
                            title="View"
                          >
                            <span className="material-icons">visibility</span>
                          </button>
                          <a
                            href={pdf.url}
                            download={pdf.title}
                            className="catalogue-action-btn"
                            aria-label={`Download ${pdf.title} catalogue`}
                            title="Download"
                          >
                            <span className="material-icons">download</span>
                          </a>
                        </div>
                      </div>
                      <h4 className="catalogue-title">{pdf.title}</h4>
                      <p className="catalogue-description">{pdf.description}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="no-catalogues" aria-live="polite">
                  No catalogues available for {brand.name}.
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="no-brands" aria-live="assertive">
            No brands available at this time.
          </p>
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
