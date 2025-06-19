import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { EyeOutlined, DownloadOutlined, LinkOutlined } from "@ant-design/icons";
import project_title from "../../assets/img/projects/projects_title.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import product_1 from "../../assets/img/home/product_1.jpg";
import "./wrapper.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { brand } = location.state || {};
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
    <main className="projects-wrapper">
      <div className="banner-container">
        <img
          src={project_title}
          alt="Projects Page Banner"
          className="projects-page-image"
        />
        <section className="banner-overlay">
          <h2 className="project-title">{brand ? brand.name : "Product"}</h2>
          <div className="products-section">
            <div className="section-products">
              <img src={product_1} alt="Sanitary Product" />
              <div className="section-details">
                <span>{brand ? brand.name.toUpperCase() : "SANITARY"}</span>
                <p>
                  {brand
                    ? brand.subtitle
                    : "Premium sanitary ware blending style, comfort, and durability"}
                </p>
              </div>
            </div>
            <div className="project-content">
              <p>
                {brand
                  ? brand.content
                  : "Chhabra Marble is built with the vision of proving a one stop shop to its customers for all their tiles, granites and marble needs. Being in the business for more than 30 years, we have enough experience to be able to work with interior designers and architects and provide them with the best quality raw materials that turn the valuable ideas into reality. As far as the stocks are concerned we house the latest variety of marbles, tiles, kota stone, granite etc. We also deal in sanitary ware. We render our services with the desire to establish lifelong relationships with our valuable customers hence we take utmost care to provide them with best pricing when compared to other competitors. We also ensure best packaging and delivery so that our products reach well on time and are in their best shape."}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="catalogue-gallery" aria-label="Brand Catalogues">
        {brand ? (
          <>
            <h3>{brand.name} Catalogues</h3>
            {brand.pdfs.length > 0 ? (
              <div className="catalogue-grid">
                {brand.pdfs.map((pdf) => (
                  <article key={pdf.pdfId} className="catalogue-card">
                    <div className="catalogue-image-wrapper">
                      <img
                        src={comingsoon}
                        alt={pdf.title}
                        className="catalogue-image"
                      />
                      <div className="catalogue-actions">
                        <button
                          onClick={() => handleViewPdf(pdf)}
                          className="catalogue-action-btn"
                          aria-label={`View ${pdf.title} catalogue`}
                          title="View Catalogue"
                        >
                          <EyeOutlined />
                        </button>
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="catalogue-action-btn"
                          aria-label={`Open ${pdf.title} catalogue in new tab`}
                          title="Open in New Tab"
                        >
                          <LinkOutlined />
                        </a>
                        <a
                          href={pdf.url}
                          download={pdf.title}
                          className="catalogue-action-btn"
                          aria-label={`Download ${pdf.title} catalogue`}
                          title="Download Catalogue"
                        >
                          <DownloadOutlined />
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
          </>
        ) : (
          <p className="no-brand" aria-live="assertive">
            No brand selected. Please select a brand from the homepage.
          </p>
        )}
      </section>

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
    </main>
  );
};

export default ProductDetails;
