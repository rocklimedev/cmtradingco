"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid3X3, Shield, Users, Star, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  categories,
  featuredProducts,
  partners,
  whyChooseUs,
  heroImages,
  showcaseImages,
  PHONE_RAW,
} from "@/assets/data/siteData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
const iconMap = { Grid3X3, Shield, Users, Star };

// ScrollReveal wrapper
function ScrollReveal({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? "visible" : ""} ${
        delay ? `scroll-reveal-delay-${delay}` : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute inset-0 hero-bg">
        <img
          src={heroImages.home}
          alt="Chhabra Marble"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

// Parallax Intro Section
function ParallaxIntro() {
  const router = useRouter();
  return (
    <section data-testid="intro-section" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <img
            src={showcaseImages.parallax1}
            alt="Premium materials"
            className="w-full h-[50vh] lg:h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center py-16 lg:py-32 px-6 md:px-16 lg:px-20">
          <ScrollReveal>
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal leading-tight mb-8">
              What Chhabra Marble Offers
            </h2>
            <p className="text-base text-brand-body font-light leading-relaxed mb-6">
              At Chhabra Marble, we curate the finest building materials from
              trusted global partners. From premium tiles and natural stone to
              sanitaryware and architectural fittings.
            </p>
            <p className="text-base text-brand-body font-light leading-relaxed mb-10">
              Our showroom offers expert consultation and a hands-on experience
              to help you design spaces that stand the test of time.
            </p>
            <button
              onClick={() => router.push("/products")}
              data-testid="intro-cta"
              className="inline-flex items-center gap-2 text-sm font-normal text-brand-red hover:text-red-700 tracking-wide uppercase transition-colors"
            >
              Explore Products <ArrowRight size={16} />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection() {
  const router = useRouter();
  return (
    <section data-testid="categories-section" className="py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
            Our Range
          </p>
          <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal mb-16">
            Explore Categories
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={Math.min(i + 1, 6)}>
              <div
                onClick={() => router.push(`/products?category=${cat.id}`)}
                data-testid={`category-card-${cat.id}`}
                className="group block card-hover cursor-pointer"
              >
                <div className="img-zoom-container aspect-[4/5] bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-4 pb-2">
                  <h3 className="text-base font-normal text-brand-charcoal group-hover:text-brand-red transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Products Slider
function FeaturedSlider() {
  const router = useRouter();
  return (
    <section
      data-testid="featured-section"
      className="py-24 md:py-32 bg-brand-surface"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
                Featured
              </p>
              <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
                Featured Products
              </h2>
            </div>
            <button
              onClick={() => router.push("/products")}
              data-testid="featured-view-all"
              className="hidden md:inline-flex items-center gap-2 text-sm font-normal text-brand-red hover:text-red-700 tracking-wide uppercase transition-colors"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div
                    data-testid={`featured-product-${product.id}`}
                    className="group"
                  >
                    <div className="img-zoom-container aspect-square bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-4">
                      <p className="text-xs font-normal tracking-[0.15em] uppercase text-brand-muted mb-1">
                        {product.brand}
                      </p>
                      <h3 className="text-base font-normal text-brand-charcoal group-hover:text-brand-red transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-5" />
              <CarouselNext className="-right-5" />
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Parallax Showcase Section
function ParallaxShowcase() {
  const router = useRouter();
  return (
    <section data-testid="showcase-section" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center py-16 lg:py-32 px-6 md:px-16 lg:px-20 order-2 lg:order-1">
          <ScrollReveal>
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
              Our Promise
            </p>
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal leading-tight mb-8">
              A Message From Chhabra Marble
            </h2>
            <p className="text-base text-brand-body font-light leading-relaxed mb-6">
              For years, we have been committed to bringing you the finest
              materials from around the world. Our philosophy is simple:
              quality, design, and trust.
            </p>
            <p className="text-base text-brand-body font-light leading-relaxed mb-10">
              Every product is handpicked for its craftsmanship and durability.
              We work closely with architects, designers, and homeowners to
              ensure every project achieves its fullest potential.
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="inline-flex items-center gap-2 text-sm font-normal text-brand-red hover:text-red-700 tracking-wide uppercase transition-colors"
            >
              Visit Our Showroom <ArrowRight size={16} />
            </button>
          </ScrollReveal>
        </div>
        <div className="lg:sticky lg:top-0 lg:h-screen order-1 lg:order-2">
          <img
            src={showcaseImages.parallax2}
            alt="Showroom experience"
            className="w-full h-[50vh] lg:h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection() {
  return (
    <section
      data-testid="why-choose-section"
      className="py-24 md:py-32 bg-brand-surface"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
              Trust
            </p>
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
              Why Choose Chhabra Marble
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <ScrollReveal key={item.title} delay={Math.min(i + 1, 4)}>
                <div data-testid={`why-choose-${i}`} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-brand-border mb-6">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-brand-red"
                    />
                  </div>
                  <h3 className="text-base font-normal text-brand-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-body font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Quote Section
function QuoteSection() {
  return (
    <section data-testid="quote-section" className="py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl text-brand-red mb-6 font-light">
              &ldquo;
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-brand-charcoal leading-snug mb-8">
              Great spaces start with great materials.
            </blockquote>
            <p className="text-sm text-brand-muted font-light tracking-wide uppercase">
              &mdash; Chhabra Marble
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Promo Banner
function PromoBanner() {
  const router = useRouter();
  return (
    <section
      data-testid="promo-section"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={showcaseImages.promo}
          alt="Premium materials"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
            Design Better Spaces
            <br />
            With Better Materials
          </h2>
          <button
            onClick={() => router.push("/products")}
            data-testid="promo-cta"
            className="inline-flex items-center gap-2 bg-brand-red text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors duration-300"
          >
            Explore Collection <ArrowRight size={16} />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Contact Form Section
function ContactFormSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
    }
    setSubmitting(false);
  };

  return (
    <section data-testid="contact-section" className="py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
              Contact Us
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            {submitted ? (
              <div
                data-testid="contact-success"
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-normal text-brand-charcoal mb-2">
                    Thank You
                  </h3>
                  <p className="text-brand-body font-light">
                    We'll get back to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-testid="contact-form"
                className="space-y-6"
              >
                <input
                  type="text"
                  placeholder="Name"
                  required
                  data-testid="contact-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  data-testid="contact-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  data-testid="contact-email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  required
                  data-testid="contact-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit-btn"
                  className="bg-brand-red text-white px-10 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors duration-300 disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="h-full min-h-[400px]">
              <iframe
                title="Chhabra Marble Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5!2d77.1046!3d28.6711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03dfb03dbd4b%3A0x7e6d5a2e1d0e2b0a!2sPeeragarhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1000000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                data-testid="contact-map"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Partners Carousel
function PartnersSlider() {
  return (
    <section
      data-testid="partners-section"
      className="py-24 md:py-32 bg-brand-surface"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
              Our Partners
            </p>
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
              Trusted Global Brands
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {partners.map((partner) => (
                <CarouselItem
                  key={partner.id}
                  className="pl-4 basis-1/3 sm:basis-1/4 lg:basis-1/6 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-5" />
              <CarouselNext className="-right-5" />
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Full HomePage Export
export default function HomePage() {
  return (
    <div data-testid="home-page">
      <HeroSection />
      <ParallaxIntro />
      <CategoriesSection />
      <FeaturedSlider />
      <ParallaxShowcase />
      <WhyChooseSection />
      <QuoteSection />
      <PromoBanner />
      <ContactFormSection />
      <PartnersSlider />
    </div>
  );
}
