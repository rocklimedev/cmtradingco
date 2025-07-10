import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaBars } from "react-icons/fa";
import { useSearchProductsQuery } from "../../api/productApi";
import { useGetAllCategoriesQuery } from "../../api/categoryApi";

const Navbar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: searchResults, isLoading: searchLoading } =
    useSearchProductsQuery({ query: searchQuery }, { skip: !searchQuery });

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
    if (isSearchModalOpen) setSearchQuery("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (type, id, name) => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    if (type === "product") {
      navigate(`/store/product/${id}`);
    } else if (type === "category") {
      navigate(`/store/cat/${id}`, { state: { categoryName: name } });
    }
  };

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

  const filteredCategories =
    categoriesData?.categories?.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-container">
        <ul
          className={`navbar-links-list ${
            isMobileMenuOpen ? "mobile-active" : ""
          }`}
        >
          <li className="navbar-links">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="navbar-links">
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="navbar-links">
            <Link to="/product" onClick={() => setIsMobileMenuOpen(false)}>
              Product
            </Link>
          </li>
          <li className="navbar-links">
            <Link to="/project" onClick={() => setIsMobileMenuOpen(false)}>
              Project
            </Link>
          </li>
          <li className="navbar-links">
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="navbar-search-container">
          <FaSearch
            className="navbar-search"
            aria-label="Open search modal"
            onClick={toggleSearchModal}
          />
          <FaBars
            className="navbar-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={toggleMobileMenu}
          />
        </div>
      </nav>

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
