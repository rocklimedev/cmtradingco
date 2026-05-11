// app/products/ProductsContent.jsx
"use client";

import { useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { categories, heroImages, PHONE_RAW, videoBanners } from "@/lib";

// Subcategory Card
function SubcategoryCard({ sub, delay }) {
  const whatsappEnquiry = () => {
    const msg = encodeURIComponent(
      `Hi, I'm interested in: ${sub.name}. Please share more details.`,
    );
    window.open(`https://wa.me/${PHONE_RAW}?text=${msg}`, "_blank");
  };

  return (
    <ScrollReveal delay={delay}>
      <div
        data-testid={`subcat-card-${sub.name.replace(/\s/g, "-").toLowerCase()}`}
        className="group card-hover"
      >
        <div className="img-zoom-container aspect-[4/5] bg-gray-100 relative overflow-hidden">
          <img
            src={sub.image}
            alt={sub.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="pt-5 flex items-center justify-between">
          <h3 className="text-sm font-normal text-brand-charcoal group-hover:text-brand-red transition-colors duration-300">
            {sub.name}
          </h3>
          <button
            onClick={whatsappEnquiry}
            data-testid={`enquire-${sub.name.replace(/\s/g, "-").toLowerCase()}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase text-brand-red hover:text-red-700 transition-colors whitespace-nowrap"
          >
            Enquire Now <ArrowRight size={10} />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}

// Category Section
function CategorySection({ category, sectionRef, showHeading = true }) {
  return (
    <section
      ref={sectionRef}
      data-testid={`section-${category.id}`}
      className="py-16 md:py-24"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        {showHeading && (
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-normal text-brand-charcoal">
                {category.name}
              </h2>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {category.subcategories.map((sub, i) => (
            <SubcategoryCard
              key={sub.name}
              sub={sub}
              delay={Math.min(i + 1, 6)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Client Component
export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionRefs = useRef({});

  const selectedCategory = searchParams.get("category") || "";
  const activeCategory = categories.find((c) => c.id === selectedCategory);
  const displayCategories = activeCategory ? [activeCategory] : categories;

  const setSectionRef = useCallback(
    (id) => (el) => {
      sectionRefs.current[id] = el;
    },
    [],
  );

  const handleTabClick = (catId) => {
    if (catId === selectedCategory) {
      router.push("/products");
    } else {
      router.push(`/products?category=${catId}`);
    }
  };

  return (
    <div data-testid="products-page">
      {/* Hero Banner */}
      {/* Hero Banner */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          {activeCategory && activeCategory.banner ? (
            // Show category-specific banner image
            <img
              src={activeCategory.banner}
              alt={activeCategory.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            // Default: Show video for "All Products" / initial load
            <video
              src={videoBanners.productsVideo}
              autoPlay
              loop
              muted
              playsInline
              poster={heroImages.products}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex items-end h-full max-w-[1300px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div>
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-white/70 mb-4">
              {activeCategory ? "Category" : ""}
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-white"
              data-testid="products-title"
            >
              {activeCategory ? activeCategory.name : "Our Products"}
            </h1>
          </div>
        </div>
      </section>
      {/* Category Tabs (sticky) */}
      <section className="bg-white sticky top-0 z-30 mt-6 md:mt-8">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 h-16 flex items-center justify-center">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide items-center">
            <button
              onClick={() => router.push("/products")}
              data-testid="cat-tab-all"
              className={`flex-shrink-0 px-5 py-4 text-xs tracking-wide uppercase border-b-2 transition-colors duration-300 ${
                !selectedCategory
                  ? "border-brand-red text-brand-red font-semibold"
                  : "border-transparent text-brand-body hover:text-brand-red"
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabClick(cat.id)}
                data-testid={`cat-tab-${cat.id}`}
                className={`flex-shrink-0 px-5 py-4 text-xs tracking-wide uppercase border-b-2 transition-colors duration-300 ${
                  selectedCategory === cat.id
                    ? "border-brand-red text-brand-red font-semibold"
                    : "border-transparent text-brand-body hover:text-brand-red"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {displayCategories.map((category, index) => (
        <div key={category.id}>
          <CategorySection
            category={category}
            sectionRef={setSectionRef(category.id)}
            showHeading={!activeCategory}
          />
          {index < displayCategories.length - 1 && (
            <div className="max-w-[1300px] mx-auto px-6 md:px-12">
              <hr className="border-brand-border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
