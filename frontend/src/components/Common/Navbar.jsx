import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import brands from "../../assets/data/brands";
import logo from "../../assets/img/logo.png";

const Navbar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Filter brands and catalogues based on search query
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCatalogues = brands.flatMap((brand) =>
    brand.pdfs
      .filter((pdf) =>
        pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((pdf) => ({ ...pdf, brandName: brand.name, brandLink: brand.link }))
  );

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

  const handleResultClick = (type, id, name, brandLink) => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    if (type === "brand") {
      navigate(brandLink, { state: { brandName: name } });
    } else if (type === "catalogue") {
      window.open(id, "_blank");
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

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Company Logo" className="logo" />
        </Link>
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
            <Link to="/brands" onClick={() => setIsMobileMenuOpen(false)}>
              Brands
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
        <div className="navbar-actions">
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
            <input
              type="text"
              className="search-modal-input"
              placeholder="Search brands or catalogues..."
              aria-label="Search input"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            {searchQuery && (
              <div className="search-results">
                {filteredBrands.length > 0 && (
                  <div className="search-section">
                    <h4>Brands</h4>
                    {filteredBrands.map((brand) => (
                      <div
                        key={brand.name}
                        className="search-result-item"
                        onClick={() =>
                          handleResultClick(
                            "brand",
                            brand.name,
                            brand.name,
                            brand.link
                          )
                        }
                      >
                        {brand.name}
                      </div>
                    ))}
                  </div>
                )}
                {filteredCatalogues.length > 0 && (
                  <div className="search-section">
                    <h4>Catalogues</h4>
                    {filteredCatalogues.map((catalogue) => (
                      <div
                        key={catalogue.pdfId}
                        className="search-result-item"
                        onClick={() =>
                          handleResultClick(
                            "catalogue",
                            catalogue.url,
                            catalogue.title,
                            catalogue.brandLink
                          )
                        }
                      >
                        {catalogue.title} - {catalogue.brandName}
                      </div>
                    ))}
                  </div>
                )}
                {searchQuery &&
                  filteredBrands.length === 0 &&
                  filteredCatalogues.length === 0 && (
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
