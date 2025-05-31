import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../api/categoryApi";
import { useGetAllProductsQuery } from "../../api/productApi";
import project_title from "../../assets/img/projects/projects_title.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";

const ProductWrapper = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("categories");
  const productsPerPage = 30;

  // Fetch all categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  // Fetch all products for the "All Products" tab
  const {
    data: allProductsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetAllProductsQuery();

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    allProductsData?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil(
    (allProductsData?.length || 0) / productsPerPage
  );

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
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
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

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/store/cat/${categoryId}`, { state: { categoryName } });
  };

  return (
    <main className="projects-wrapper">
      <img
        src={project_title}
        alt="Projects Page Banner"
        className="projects-page-image"
      />
      <h2 className="project-title">Our Projects</h2>
      <p className="project-content">
        At Chhabra Marble, we take pride in transforming spaces with our premium
        marble, granite, tiles, and sanitary ware. With over 30 years of
        experience, we have collaborated with architects and interior designers
        to deliver stunning projects, from luxurious residential interiors to
        large-scale commercial installations. Explore our portfolio to see how
        we bring quality, craftsmanship, and innovation to every project.
      </p>

      {/* Tabs for Categories and All Products */}
      <div className="tabs">
        <button
          className={selectedTab === "categories" ? "tab active" : "tab"}
          onClick={() => setSelectedTab("categories")}
        >
          Categories
        </button>
        <button
          className={selectedTab === "allProducts" ? "tab active" : "tab"}
          onClick={() => setSelectedTab("allProducts")}
        >
          All Products
        </button>
      </div>

      {selectedTab === "categories" ? (
        <div className="category-gallery">
          {categoriesLoading && <p>Loading categories...</p>}
          {categoriesError && (
            <p>Error loading categories: {categoriesError.message}</p>
          )}
          {categoriesData?.categories?.map((category) => (
            <div
              key={category.categoryId}
              className="category-card"
              onClick={() =>
                handleCategoryClick(category.categoryId, category.name)
              }
            >
              <img
                src={comingsoon}
                alt={category.name}
                className="category-image"
              />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-gallery">
          {productsLoading && <p>Loading products...</p>}
          {productsError && (
            <p>Error loading products: {productsError.message}</p>
          )}
          {currentProducts.map((product) => (
            <div key={product.productId} className="product-card">
              <img
                src={product.images[0] || comingsoon}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.sellingPrice}</p>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
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
                  {startPage > 2 && <span className="ellipsis">...</span>}
                </>
              )}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? "page active" : "page"}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </button>
              ))}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <span className="ellipsis">...</span>
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
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ProductWrapper;
