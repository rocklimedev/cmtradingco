import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetAllProductsByCategoryQuery,
} from "../../api/productApi";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";

const ProductDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch product details
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  // Fetch related products by category
  const { data: relatedProducts } = useGetAllProductsByCategoryQuery(
    product?.categoryId,
    { skip: !product?.categoryId }
  );

  // Initialize FancyBox
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});
    return () => Fancybox.destroy();
  }, []);

  // Handle quantity changes
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Handle Add to Cart (placeholder implementation)
  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log(`Added ${quantity} of ${product?.name} to cart`);
  };

  // Handle image navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="main__breadcrumbs breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__list-item">
              <Link className="breadcrumbs__list-link" to="/">
                Home
              </Link>
            </li>
            <li className="breadcrumbs__list-item">
              <Link className="breadcrumbs__list-link" to="/product">
                Shop
              </Link>
            </li>
            <li className="breadcrumbs__list-item">
              <p className="breadcrumbs__list-text">{product.name}</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Product Section */}
      <section className="main__product product">
        <div className="container">
          <div className="product__inner">
            <div className="product__wrap">
              {/* Main Image Carousel */}
              <div className="product__wrapper">
                <div className="product__carousel">
                  <img
                    className="product__carousel-img"
                    src={product.images?.[currentImageIndex] || comingsoon}
                    alt={product.name}
                  />
                  <button
                    className="product__carousel-prev"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 9L5 6L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="product__carousel-next"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 9L7 6L4 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="product__thumbnails">
                  {product.images?.length ? (
                    product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`product__thumbnail ${
                          currentImageIndex === index
                            ? "product__thumbnail--active"
                            : ""
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <a data-fancybox="gallery" href={image || comingsoon}>
                          <p className="product__thumbnail-text">sale</p>
                          <button className="product__thumbnail-btn">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 21L15 15M21 21V16.2M21 21H16.2"
                                stroke="#0E1218"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3 16.2V21M3 21H7.8M3 21L9 15"
                                stroke="#0E1218"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M21 7.8V3M21 3H16.2M21 3L15 9"
                                stroke="#0E1218"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3 7.8V3M3 3H7.8M3 3L9 9"
                                stroke="#0E1218"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <img
                            className="product__thumbnail-img"
                            src={image || comingsoon}
                            alt={product.name}
                          />
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="product__thumbnail">
                      <a data-fancybox="gallery" href={comingsoon}>
                        <img
                          className="product__thumbnail-img"
                          src={comingsoon}
                          alt="No image"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Content */}
              <div className="product__content product-content">
                <div className="product-content__box product-content-box">
                  <div className="product-content-box__stars stars">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="stars__star stars-star">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9687 4.60317C11.8902 4.36018 11.6746 4.1876 11.4197 4.16462L7.95614 3.85013L6.58656 0.644511C6.48558 0.40958 6.25559 0.257507 6.00006 0.257507C5.74453 0.257507 5.51454 0.40958 5.41356 0.64506L4.04399 3.85013L0.579908 4.16462C0.325385 4.18815 0.110414 4.36018 0.0314019 4.60317C-0.0476102 4.84616 0.0253592 5.11267 0.2179 5.28068L2.83592 7.5767L2.06392 10.9773C2.00744 11.2274 2.10448 11.4858 2.31195 11.6358C2.42346 11.7164 2.55393 11.7574 2.68549 11.7574C2.79893 11.7574 2.91145 11.7268 3.01244 11.6664L6.00006 9.88077L8.98659 11.6664C9.20513 11.7978 9.48062 11.7858 9.68762 11.6358C9.89518 11.4854 9.99214 11.2268 9.93565 10.9773L9.16366 7.5767L11.7817 5.28113C11.9742 5.11267 12.0477 4.84661 11.9687 4.60317Z"
                            fill={i < 4 ? "#F9D442" : "#E0E0E0"} // Mock rating of 4 stars
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="product-content-box__text">2 reviews</p>
                </div>
                <h2 className="product-content__title">{product.name}</h2>
                <div className="product-content__price">
                  {product.originalPrice && (
                    <del className="product-content__price-del">
                      ₹{product.originalPrice}
                    </del>
                  )}
                  <ins className="product-content__price-current">
                    ₹{product.sellingPrice}
                  </ins>
                </div>
                <p className="product-content__text">{product.description}</p>
                <form
                  className="product-content__quantity product-content-quantity"
                  onSubmit={handleAddToCart}
                >
                  <div className="product-content-quantity__box product-content-quantity-box">
                    <p className="product-content-quantity-box__text">
                      Quantity:
                    </p>
                    <div className="product-content-quantity-box__row">
                      <button
                        className="product-content-quantity-box__row-btn product-content-quantity-box__row-btn--minus"
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.3335 8H12.6668"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <input
                        className="product-content-quantity-box__row-input"
                        type="text"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="product-content-quantity-box__row-btn product-content-quantity-box__row-btn--plus"
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 3.3335V12.6668"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.3335 8H12.6668"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    className="product-content-quantity__btn"
                    type="submit"
                  >
                    Add to Cart
                  </button>
                </form>
                <ul className="product-content__list">
                  <li className="product-content__list-item">
                    SKU: <span>{product.sku || "N/A"}</span>
                  </li>
                  <li className="product-content__list-item">
                    Category: <span>{product.categoryName || "N/A"}</span>
                  </li>
                  <li className="product-content__list-item">
                    Tags: <span>{product.tags?.join(", ") || "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Info Tabs */}
      <section className="main__product-info product-info">
        <div className="container">
          <div className="product-info__tabs tabs">
            {["Description", "Additional Information", "Reviews"].map(
              (tab, index) => (
                <button
                  key={index}
                  className={`tabs__btn ${
                    activeTab === index ? "tabs__btn--active" : ""
                  }`}
                  type="button"
                  onClick={() => setActiveTab(index)}
                >
                  {tab} {tab === "Reviews" && <span>2</span>}
                </button>
              )
            )}
          </div>
          <div className="product-info__inner">
            {activeTab === 0 && (
              <div className="product-info__product-info product-info-description blog-section">
                <div className="blog-section__inner">
                  <div className="blog-section__box blog-section-box">
                    <div className="blog-section-box__content blog-section-box-content">
                      <h2 className="blog-section-box-content__title">
                        Description
                      </h2>
                      <p className="blog-section-box-content__text">
                        {product.description}
                      </p>
                      <ul className="blog-section-box-content__list">
                        {product.features?.map((feature, index) => (
                          <li
                            key={index}
                            className="blog-section-box-content__list-item"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className="product-info__product-info">
                <h2>Additional Information</h2>
                <p>Dimensions: {product.dimensions || "N/A"}</p>
                <p>Material: {product.material || "N/A"}</p>
              </div>
            )}
            {activeTab === 2 && (
              <div className="product-info__product-info">
                <h2>Reviews</h2>
                <p>No reviews available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="main__shop-section shop-section">
        <div className="container">
          <div className="shop-section__top shop-section-top">
            <h2 className="shop-section-top__title">Related Products</h2>
          </div>
          <div className="shop-section__grid">
            {relatedProducts?.slice(0, 4).map((related) => (
              <div key={related.productId} className="shop__card card">
                <div className="card__inner">
                  <Link
                    className="card-box__poster"
                    to={`/products/${related.productId}`}
                  >
                    <img
                      className="card-box__poster-img"
                      src={related.images?.[0] || comingsoon}
                      alt={related.name}
                    />
                    <p className="card-box__poster-suptext">sale</p>
                  </Link>
                  <p className="card__subtext">
                    {related.categoryName || "N/A"}
                  </p>
                  <Link
                    className="card__title"
                    to={`/products/${related.productId}`}
                  >
                    {related.name}
                  </Link>
                  <div className="card__price card-price">
                    {related.originalPrice && (
                      <del className="card-price__past">
                        ₹{related.originalPrice}
                      </del>
                    )}
                    <ins className="card-price__current">
                      ₹{related.sellingPrice}
                    </ins>
                  </div>
                  <button
                    className="card__link"
                    onClick={() => console.log(`Add ${related.name} to cart`)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
