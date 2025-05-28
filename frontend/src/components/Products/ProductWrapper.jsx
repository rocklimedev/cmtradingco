import React from "react";
import { Link } from "react-router-dom";
import comingsoon from "../../assets/img/projects/home-image-coming-soon.jpg";

const ProductWrapper = () => {
  const products = [
    {
      id: 1,
      imgSrc: comingsoon,
      alt: "Sanitary Product",
      title: "Sanitary",
      description:
        "Premium sanitary ware blending style, comfort, and durability",
    },
    {
      id: 2,
      imgSrc: comingsoon,
      alt: "Tiles Product",
      title: "Tiles",
      description: "High-quality tiles for elegant and durable surfaces",
    },
    {
      id: 3,
      imgSrc: comingsoon,
      alt: "Granite Product",
      title: "Granite",
      description: "Premium granite for timeless strength and beauty",
    },
    {
      id: 4,
      imgSrc: comingsoon,
      alt: "Kota Stone Product",
      title: "Kota Stone",
      description: "Natural kota stone for rustic and durable flooring",
    },
    {
      id: 5,
      imgSrc: comingsoon,
      alt: "Marble Product",
      title: "Marble",
      description: "Luxurious marble for sophisticated interiors",
    },
    {
      id: 6,
      imgSrc: comingsoon,
      alt: "Additional Product",
      title: "Additional Product",
      description: "Explore more of our premium offerings",
    },
  ];

  return (
    <div className="main-content">
      <section className="product-page-wrapper">
        <div className="product-page-image" />
        <h2 className="section-title">
          Our Products
          <span className="line" />
        </h2>
        <div className="product-content">
          <p>
            Chhabra Marble is built with the vision of providing a one-stop shop
            for all your tiles, granite, and marble needs. With over 30 years of
            experience, we collaborate with interior designers and architects to
            deliver high-quality raw materials that turn visionary ideas into
            reality. Our extensive stock includes the latest varieties of
            marbles, tiles, kota stone, granite, and sanitary ware. Committed to
            building lifelong relationships, we offer competitive pricing,
            superior packaging, and timely delivery to ensure our products
            arrive in perfect condition.
          </p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="image-section">
              <img
                src={product.imgSrc}
                alt={product.alt}
                className="image-box"
              />
              <span className="image-title">{product.title}</span>
              <p className="image-description">{product.description}</p>
            </div>
          ))}
        </div>
        <Link to="/contact" className="view-all-button">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default ProductWrapper;
