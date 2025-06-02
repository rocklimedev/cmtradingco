import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../api/categoryApi";
import { useGetAllProductsQuery } from "../../api/productApi";
import project_title from "../../assets/img/projects/projects_title.png";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";

const ProductWrapper = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("");
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

  // Filter and sort products
  const filteredProducts = allProductsData
    ? allProductsData
        .filter((product) => {
          const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesPrice =
            (!priceRange.min ||
              product.sellingPrice >= Number(priceRange.min)) &&
            (!priceRange.max || product.sellingPrice <= Number(priceRange.max));
          return matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
          if (sortOption === "price-low-high")
            return a.sellingPrice - b.sellingPrice;
          if (sortOption === "price-high-low")
            return b.sellingPrice - a.sellingPrice;
          return 0;
        })
    : [];

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;

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

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/store/cat/${categoryId}`, { state: { categoryName } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePriceChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page on sort change
  };

  return (
    <main className="projects-wrapper">
      <div className="banner-container">
        <img
          src={project_title}
          alt="Projects Page Banner"
          className="projects-page-image"
        />
        <div className="banner-overlay">
          <h2 className="project-title">Our Projects</h2>
          <p className="project-content">
            At Chhabra Marble, we take pride in transforming spaces with our
            premium marble, granite, tiles, and sanitary ware. With over 30
            years of experience, we have collaborated with architects and
            interior designers to deliver stunning projects, from luxurious
            residential interiors to large-scale commercial installations.
            Explore our portfolio to see how we bring quality, craftsmanship,
            and innovation to every project.
          </p>
        </div>
      </div>

      {/* Tabs for Categories and All Products */}
      <div className="tabs-container">
        <button
          className={`tab ${selectedTab === "categories" ? "active" : ""}`}
          onClick={() => setSelectedTab("categories")}
          aria-selected={selectedTab === "categories"}
        >
          Categories
        </button>
        <button
          className={`tab ${selectedTab === "allProducts" ? "active" : ""}`}
          onClick={() => setSelectedTab("allProducts")}
          aria-selected={selectedTab === "allProducts"}
        >
          All Products
        </button>
      </div>

      {selectedTab === "categories" ? (
        <section className="category-gallery" aria-label="Product Categories">
          {categoriesLoading && (
            <p className="loading" aria-live="polite">
              Loading categories...
            </p>
          )}
          {categoriesError && (
            <p className="error" aria-live="assertive">
              Error loading categories: {categoriesError.message}
            </p>
          )}
          {categoriesData?.categories?.map((category) => (
            <article
              key={category.categoryId}
              className="category-card"
              onClick={() =>
                handleCategoryClick(category.categoryId, category.name)
              }
              tabIndex={0}
              role="button"
              aria-label={`View ${category.name} category`}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleCategoryClick(category.categoryId, category.name)
              }
            >
              <img
                src={comingsoon}
                alt={category.name}
                className="category-image"
              />
              <h3 className="category-name">{category.name}</h3>
            </article>
          ))}
        </section>
      ) : (
        <>
          {/* Separate Filter Controls Section */}
          <section className="filter-section" aria-label="Product Filters">
            <div className="filter-controls">
              <div className="search-container">
                <label htmlFor="search-input" className="sr-only">
                  Search products
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  aria-label="Search products by name"
                />
              </div>
              <div className="price-filter">
                <label htmlFor="min-price" className="sr-only">
                  Minimum price
                </label>
                <input
                  id="min-price"
                  type="number"
                  name="min"
                  placeholder="Min Price"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className="price-input"
                  min="0"
                  aria-label="Minimum price filter"
                />
                <span className="price-divider">-</span>
                <label htmlFor="max-price" className="sr-only">
                  Maximum price
                </label>
                <input
                  id="max-price"
                  type="number"
                  name="max"
                  placeholder="Max Price"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="price-input"
                  min="0"
                  aria-label="Maximum price filter"
                />
              </div>
              <div className="sort-container">
                <label htmlFor="sort-select" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort-select"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="sort-select"
                  aria-label="Sort products by price"
                >
                  <option value="">Sort by</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </section>

          {/* Product Gallery Section */}
          <section className="product-gallery" aria-label="All Products">
            {productsLoading && (
              <p className="loading" aria-live="polite">
                Loading products...
              </p>
            )}
            {productsError && (
              <p className="error" aria-live="assertive">
                Error loading products: {productsError.message}
              </p>
            )}
            {!productsLoading &&
              !productsError &&
              currentProducts.length === 0 && (
                <p className="no-products" aria-live="polite">
                  No products found matching your criteria.
                </p>
              )}
            {currentProducts.map((product) => (
              <Link
                to={`/product/${product.productId}`}
                key={product.productId}
              >
                <article className="product-card">
                  <img
                    src={product.images[0] || comingsoon}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">
                    Price: ₹{product.sellingPrice}
                  </p>
                </article>
              </Link>
            ))}

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
          </section>
        </>
      )}
    </main>
  );
};

export default ProductWrapper;
