import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchProductsQuery } from "../../api/productApi"; // Adjust path as needed
import { useGetAllCategoriesQuery } from "../../api/categoryApi"; // Adjust path as needed

const Navbar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Fetch categories
  const { data: categoriesData } = useGetAllCategoriesQuery();

  // Fetch products based on search query
  const { data: searchResults, isLoading: searchLoading } =
    useSearchProductsQuery(
      { query: searchQuery },
      { skip: !searchQuery } // Skip query if searchQuery is empty
    );

  // Toggle search modal visibility
  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
    if (isSearchModalOpen) {
      setSearchQuery(""); // Clear search query when closing
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle clicking a search result
  const handleResultClick = (type, id, name) => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
    if (type === "product") {
      navigate(`/store/product/${id}`);
    } else if (type === "category") {
      navigate(`/store/cat/${id}`, { state: { categoryName: name } });
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchModalOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter categories based on search query
  const filteredCategories =
    categoriesData?.categories?.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-container">
        <ul className="navbar-links-list">
          <li className="navbar-links">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-links">
            <Link to="/about">About</Link>
          </li>
          <li className="navbar-links">
            <Link to="/product">Product</Link>
          </li>
          <li className="navbar-links">
            <Link to="/project">Project</Link>
          </li>
          <li className="navbar-links">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="navbar-search-container">
          <FaSearch
            className="navbar-search"
            aria-label="Open search modal"
            onClick={toggleSearchModal}
          />
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="search-modal">
          <div className="search-modal-content" ref={searchRef}>
            <button
              className="search-modal-close"
              onClick={toggleSearchModal}
              aria-label="Close search modal"
            >
              <FaTimes />
            </button>
            <input
              type="text"
              className="search-modal-input"
              placeholder="Search products or categories..."
              aria-label="Search input"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            {searchQuery && (
              <div className="search-results">
                {searchLoading && <p className="search-loading">Loading...</p>}
                {filteredCategories.length > 0 && (
                  <div className="search-section">
                    <h4>Categories</h4>
                    {filteredCategories.map((category) => (
                      <div
                        key={category.categoryId}
                        className="search-result-item"
                        onClick={() =>
                          handleResultClick(
                            "category",
                            category.categoryId,
                            category.name
                          )
                        }
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
                {searchResults?.length > 0 && (
                  <div className="search-section">
                    <h4>Products</h4>
                    {searchResults.map((product) => (
                      <div
                        key={product.productId}
                        className="search-result-item"
                        onClick={() =>
                          handleResultClick(
                            "product",
                            product.productId,
                            product.name
                          )
                        }
                      >
                        {product.name} - ₹{product.sellingPrice}
                      </div>
                    ))}
                  </div>
                )}
                {searchQuery &&
                  !searchLoading &&
                  filteredCategories.length === 0 &&
                  (!searchResults || searchResults.length === 0) && (
                    <p className="no-results">No results found</p>
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
