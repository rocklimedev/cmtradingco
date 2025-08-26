import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import brands from "../../assets/data/brands";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import "./wrapper.css";
import project_title from "../../assets/img/projects/projects_title.png";
import { IoMdArrowRoundBack } from "react-icons/io";
const CatalogueGallery = ({ pdfs, handleCatalogueClick }) => {
  return (
    <section className="brands-gallery" aria-label="Catalogues">
      {pdfs && pdfs.length > 0 ? (
        <div className="product-grid">
          {pdfs.map((pdf) => (
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
          No catalogues available for this brand.
        </p>
      )}
    </section>
  );
};

const ProductDetails = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const brand = brands.find((b) => b.link === `/product/brand/${brandName}`);

  // Debug: Log brandName and brand
  console.log("Brand Name from URL:", brandName);
  console.log("Found Brand:", brand);
  console.log("Brand PDFs:", brand?.pdfs);

  const handleCatalogueClick = (url) => {
    console.log("Opening PDF:", url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleBack = () => {
    navigate("/brands");
  };

  if (!brand) {
    console.log("Brand not found for:", brandName);
    return (
      <div>
        Brand not found.{" "}
        <button onClick={() => navigate("/brands")}>Back to Brands</button>
      </div>
    );
  }

  return (
    <div className="product-page-wrapper">
      <img
        src={project_title}
        alt="Products Banner"
        className="product-page-image"
        loading="lazy"
      />
      <section className="banner-overlay">
        <h2 className="project-title">{brand.name} Catalogues</h2>
        <button className="back-to-button" onClick={handleBack}>
          <IoMdArrowRoundBack /> Back
        </button>

        <CatalogueGallery
          pdfs={brand.pdfs}
          handleCatalogueClick={handleCatalogueClick}
        />
      </section>
    </div>
  );
};

export default ProductDetails;
