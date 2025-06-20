import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import brands from "../../assets/data/brands"; // Adjust path based on your structure
import project_title from "../../assets/img/projects/projects_title.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import product_1 from "../../assets/img/home/product_1.jpg";
import "./wrapper.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProductWrapper = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/store/cat/${categoryId}`, { state: { categoryName } });
  };

  const handleViewPdf = (pdf) => {
    setSelectedPdf(pdf);
    setShowModal(true);
    setPageNumber(1);
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
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="product-page-wrapper">
      <img
        src={project_title}
        alt="Products Page Banner"
        className="product-page-image"
      />
      <section className="banner-overlay">
        <h2 className="project-title">Our Brands</h2>
        <div className="products-section">
          <div className="section-products">
            <img src={product_1} alt="Product Showcase" />
            <div className="section-details">
              <span>PREMIUM PRODUCTS</span>
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

      {/* Brands and Catalogues Section */}
      <section className="brands-gallery" aria-label="Brands and Catalogues">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand.name} className="brand-section">
              <div className="brand-header">
                <img
                  src={brand.logoSrc}
                  alt={`${brand.name} Logo`}
                  className="brand-logo"
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
                      <img
                        src={comingsoon} // Replace with pdf.thumbnailUrl if available
                        alt={pdf.title}
                        className="catalogue-image"
                      />
                      <h4 className="catalogue-title">{pdf.title}</h4>
                      <p className="catalogue-description">{pdf.description}</p>
                      <div className="catalogue-actions">
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="catalogue-link"
                          aria-label={`Open ${pdf.title} catalogue in new tab`}
                        >
                          Open in New Tab
                        </a>
                        <button
                          onClick={() => handleViewPdf(pdf)}
                          className="catalogue-button view-button"
                          aria-label={`View ${pdf.title} catalogue in modal`}
                        >
                          View
                        </button>
                        <a
                          href={pdf.url}
                          download={pdf.title}
                          className="catalogue-button download-button"
                          aria-label={`Download ${pdf.title} catalogue`}
                        >
                          Download
                        </a>
                      </div>
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

      {/* PDF Viewer Modal */}
      {showModal && selectedPdf && (
        <div
          className="pdf-modal"
          role="dialog"
          aria-labelledby="pdf-modal-title"
        >
          <div className="pdf-modal-content">
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
                <Page pageNumber={pageNumber} />
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
