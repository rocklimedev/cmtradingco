import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import brands from "../../assets/data/brands";
import project_title from "../../assets/img/projects/projects_title.png";
import cp_fittings from "../../assets/img/home/CP FITTING.png";
import wellness from "../../assets/img/home/WELLNESS.png";
import surfaces from "../../assets/img/home/SIURFACE.png";
import adhesive from "../../assets/img/home/ADHESIVE.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";
import "./wrapper.css";

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
          No catalogues available.
        </p>
      )}
    </section>
  );
};

const ProductWrapper = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Category to brand mapping using brand.link
  const categoryBrands = {
    "CP Fittings & Sanitary": [
      "/product/brand/grohe",
      "/product/brand/american-standard",
      "/product/brand/colston",
    ],
    Tiles: ["/product/brand/nexion"],
    Stones: [],
    "Chemicals & Adhesive": [
      "/product/brand/jk-tylo",
      "/product/brand/jk-cement",
    ],
    "Accessories & Add-ons": [
      "/product/brand/grohe",
      "/product/brand/american-standard",
    ],
    Plumbing: ["/product/brand/kantherm"],
  };

  const filteredBrands = selectedCategory
    ? brands.filter((brand) =>
        categoryBrands[selectedCategory]?.includes(brand.link)
      )
    : brands;

  // Debug: Log filtered brands
  console.log("Selected Category:", selectedCategory);
  console.log(
    "Filtered Brands:",
    filteredBrands.map((b) => ({ name: b.name, link: b.link }))
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBrandClick = (brand) => {
    console.log("Navigating to:", brand.link);
    navigate(brand.link);
  };

  const handleViewAll = () => {
    setSelectedCategory(null);
  };

  const handleCatalogueClick = (url) => {
    console.log("Opening PDF:", url);
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
          <button className="back-to-button" onClick={handleViewAll}>
            Back to Categories
          </button>
        )}
        {!selectedCategory ? (
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
                <p>Reliable adhesives for strong and lasting installations.</p>
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
        ) : (
          <section className="brands-gallery" aria-label="Brands">
            {filteredBrands.length > 0 ? (
              <div className="product-grid">
                {filteredBrands.map((brand) => (
                  <div
                    key={brand.link} // Changed key to brand.link for uniqueness
                    className="product-card"
                    onClick={() => handleBrandClick(brand)}
                  >
                    <img
                      src={brand.logoSrc || comingsoon}
                      alt={`${brand.name} Logo`}
                      className="catalogue-image"
                      loading="lazy"
                    />
                    <div className="product-info">
                      <h3>{brand.name}</h3>
                      <p>{brand.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-catalogues" aria-live="polite">
                No brands available for {selectedCategory}.
              </p>
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductWrapper;
