import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetAllProductsByCategoryQuery } from "../../api/productApi";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch products by category
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetAllProductsByCategoryQuery(categoryId);

  const ITEMS_PER_PAGE = 30;
  const totalPages = productsData
    ? Math.ceil(productsData.length / ITEMS_PER_PAGE)
    : 1;

  // Calculate paginated products
  const paginatedProducts = productsData
    ? productsData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  // Pagination logic for limited page numbers
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(1, currentPage - halfVisiblePages);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openLightbox = (product) => {
    setSelectedImage(product);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <main className="category-products-wrapper">
      <header className="category-header">
        <h2 className="category-title">
          {state?.categoryName || "Category Products"}
        </h2>
      </header>

      {isLoading && (
        <p className="loading" aria-live="polite">
          Loading products...
        </p>
      )}
      {error && (
        <p className="error" aria-live="assertive">
          Error loading products: {error.message}
        </p>
      )}
      {!isLoading && !error && paginatedProducts.length === 0 && (
        <p className="no-products" aria-live="polite">
          No products found in this category.
        </p>
      )}

      <section className="product-gallery" aria-label="Products in category">
        {paginatedProducts.map((product) => (
          <article key={product.productId} className="product-card">
            <div className="product-image-container">
              <img
                src={product.images[0] || comingsoon}
                alt={product.name}
                className="product-image"
                onClick={() => openLightbox(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(product)}
                aria-label={`View larger image of ${product.name}`}
              />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Price: ₹{product.sellingPrice}</p>
          </article>
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          <button
            className="page-nav"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          {startPage > 1 && (
            <>
              <button
                className="page"
                onClick={() => handlePageChange(1)}
                aria-label="Page 1"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="ellipsis" aria-hidden="true">
                  ...
                </span>
              )}
            </>
          )}
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`page ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="ellipsis" aria-hidden="true">
                  ...
                </span>
              )}
              <button
                className="page"
                onClick={() => handlePageChange(totalPages)}
                aria-label={`Page ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            className="page-nav"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.images?.[0] || comingsoon}
              alt={selectedImage.name}
              className="lightbox-image"
            />
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && closeLightbox()}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CategoryProducts;
