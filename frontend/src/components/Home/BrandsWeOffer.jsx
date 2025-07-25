import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function BrandsWeOffer({ brands }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const duration = 2000; // 2 seconds
    const scrollAmount = 300;
    const start = scrollRef.current.scrollLeft;
    const end =
      direction === "left" ? start - scrollAmount : start + scrollAmount;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      scrollRef.current.scrollLeft = start + (end - start) * progress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <section className="brands-we-offer">
      <h2 className="section-title" style={{ color: "white" }}>
        Brands We Offer
        <span className="line" style={{ backgroundColor: "white" }} />
      </h2>

      <div className="slider-controls">
        <button onClick={() => scroll("left")} className="arrow left">
          <FaChevronLeft />
        </button>
        <button onClick={() => scroll("right")} className="arrow right">
          <FaChevronRight />
        </button>
      </div>

      <div className="brands-grid scrollable" ref={scrollRef}>
        {brands.map((brand, index) => (
          <div className="box-section" key={index}>
            <div
              onClick={() => navigate(brand.link, { state: { brand } })}
              style={{ cursor: "pointer" }}
            >
              <img
                src={brand.logoSrc}
                alt={brand.name}
                className="company-logo"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
