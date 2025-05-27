import React from "react";
import MainSlider from "./MainSlider";
import product_1 from "../../assets/img/home/product_1.jpg";
import product_2 from "../../assets/img/home/product_2.png";
import product_3 from "../../assets/img/home/product_3.jpg";
import product_4 from "../../assets/img/home/product_4.jpg";
import product_5 from "../../assets/img/home/product_5.png";
import company_1 from "../../assets/img/brand_logos/american_standard.png";
import company_2 from "../../assets/img/brand_logos/grohe.png";
import company_3 from "../../assets/img/brand_logos/jk_cement.png";
import company_4 from "../../assets/img/brand_logos/jktylo.png";
import company_5 from "../../assets/img/brand_logos/nexion.png";
const HomeWrapper = () => {
  return (
    <div className="main-content">
      <MainSlider />
      <section className="home-about-section">
        <span className="home-about-span">About</span>
        <p className="home-about-p">
          Chhabra Marble is built with the vision of proving a one stop shop to
          its customers for all their tiles, granites and marble needs. Being in
          the business for more than 30 years, we have enough experience to be
          able to work with interior designers and architects and provide them
          with the best quality raw materials that turn the valuable ideas into
          reality. As far as the stocks are concerned we house the latest
          variety of marbles, tiles, kota stone, granite etc. We also deal in
          sanitary ware. We render our services with the desire to establish
          lifelong relationships with our valuable customers hence we take
          utmost care to provide them with best pricing when compared to other
          competitors. We also ensure best packaging and delivery so that our
          products reach well on time and are in their best shape.
        </p>
      </section>
      <section className="home-product-section">
        <span>
          Product
          <span className="line" />
        </span>
        <div className="home-product-image-section">
          <div className="home-products">
            <img src={product_1} alt="Sanitary Product" />
            <div className="details">
              <span>SANITARY</span>
              <p>
                Premium sanitary ware that blends style, comfort, and durability
              </p>
            </div>
          </div>

          <div className="home-products2">
            <img src={product_2} alt="Tiles Product" />
            <div className="details">
              <span>TILES</span>
              <p>High-quality tiles for elegant and durable surfaces</p>
            </div>
          </div>
          <div className="home-products2">
            <img src={product_3} alt="Granite Product" />
            <div className="details">
              <span>GRANITE</span>
              <p>Premium granite for timeless strength and beauty</p>
            </div>
          </div>
          <div className="home-products2">
            <img src={product_4} alt="Kota Stone Product" />
            <div className="details">
              <span>KOTA STONE</span>
              <p>Natural kota stone for rustic and durable flooring</p>
            </div>
          </div>
          <div className="home-products2">
            <img src={product_5} alt="Marble Product" />
            <div className="details">
              <span>MARBLE</span>
              <p>Luxurious marble for sophisticated interiors</p>
            </div>
          </div>
        </div>
      </section>
      <section className="brands-we-offer">
        <span>Brands We Offer</span>
        <div className="box-section">
          <img src={company_1} alt="Brand Logo 1" className="company-logo" />
        </div>
        <div className="box-section">
          <img src={company_2} alt="Brand Logo 2" className="company-logo" />
        </div>
        <div className="box-section">
          <img src={company_3} alt="Brand Logo 3" className="company-logo" />
        </div>
        <div className="box-section">
          <img src={company_4} alt="Brand Logo 4" className="company-logo" />
        </div>
        <div className="box-section">
          <img src={company_5} alt="Brand Logo 5" className="company-logo" />
        </div>
      </section>
    </div>
  );
};

export default HomeWrapper;
