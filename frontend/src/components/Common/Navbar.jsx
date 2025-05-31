import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSearchProductsQuery } from "../../api/productApi"; // Adjust path as needed
import { useGetAllCategoriesQuery } from "../../api/categoryApi"; // Adjust path as needed
import logo from "../../assets/img/logo_red.png";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  // Toggle search input visibility
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery(""); // Clear search query when closing
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle clicking a search result
  const handleResultClick = (type, id, name) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (type === "product") {
      navigate(`/products/${id}`);
    } else if (type === "category") {
      navigate(`/products/category/${id}`, { state: { categoryName: name } });
    }
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
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
      <img src={logo} alt="Company Logo" className="logo" />
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
        <div className="navbar-search-container" ref={searchRef}>
          {isSearchOpen && (
            <div className="search-dropdown">
              <input
                type="text"
                className="navbar-search-input"
                placeholder="Search products or categories..."
                aria-label="Search input"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              {searchQuery && (
                <div className="search-results">
                  {searchLoading && (
                    <p className="search-loading">Loading...</p>
                  )}
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
          )}
          <FaSearch
            className="navbar-search"
            aria-label="Toggle search"
            onClick={toggleSearch}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
