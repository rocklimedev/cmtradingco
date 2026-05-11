// app/about/page.jsx
"use client";

import Link from "next/link";
import { ArrowRight, Award, Eye, Handshake } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal"; // ← imported
import { showcaseImages, categories, videoBanners, heroImages } from "@/lib";

export default function AboutPage() {
  return (
    <div data-testid="about-page">
      {/* Full-screen hero banner */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <Image
            src={heroImages.about} // use an image instead of video
            alt="Contact Chhabra Marble"
            className="w-full h-full object-cover"
            fill
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 flex items-end h-full max-w-[1300px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-tight"
            data-testid="about-hero-title"
          >
            About{" "}
            <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              us
            </span>
          </h1>
        </div>
      </section>
      {/* Brand Story - Parallax */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:sticky lg:top-0 lg:h-screen">
            <Image
              src="https://images.unsplash.com/photo-1706629503571-c165023a7792?w=1920&q=80"
              alt="Marble showroom"
              className="w-full h-[50vh] lg:h-full object-cover"
              width={1920}
              height={1080}
            />
          </div>
          <div className="flex flex-col justify-center py-16 lg:py-32 px-6 md:px-16 lg:px-20">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal leading-tight mb-8">
                A Legacy of Quality
              </h2>
              <p className="text-base text-brand-body font-light leading-relaxed mb-6">
                Chhabra Marble Trading Co. has been a trusted name in the
                building materials industry for years. What started as a small
                enterprise has grown into one of the region's most respected
                showrooms for tiles, sanitaryware, and architectural surfaces.
              </p>
              <p className="text-base text-brand-body font-light leading-relaxed">
                Our journey has been defined by an unwavering commitment to
                quality, design excellence, and customer trust. We partner with
                the world's leading brands to bring you materials that transform
                ordinary spaces into extraordinary ones.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience & Credibility */}
      <section className="py-24 md:py-32 bg-brand-surface">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
                Experience & Credibility
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Award,
                title: "Industry Experience",
                desc: "Decades of expertise in curating the finest building materials for homes and commercial projects.",
              },
              {
                icon: Eye,
                title: "Design Vision",
                desc: "We stay at the forefront of design trends, bringing you materials that are both contemporary and timeless.",
              },
              {
                icon: Handshake,
                title: "Trusted Partnerships",
                desc: "Strong relationships with global brands ensure authenticity, quality, and competitive pricing.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i + 1}>
                <div data-testid={`credibility-${i}`} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-brand-border mb-6">
                    <item.icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-brand-red"
                    />
                  </div>
                  <h3 className="text-base font-normal text-brand-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-body font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer - Banner + Categories */}
      <section className="relative">
        <div className="py-24 md:py-32">
          <div className="max-w-[1300px] mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal mb-16">
                What We Offer
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((cat, i) => (
                <ScrollReveal key={cat.id} delay={Math.min(i + 1, 6)}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    data-testid={`about-cat-${cat.id}`}
                    className="group block card-hover"
                  >
                    <div className="img-zoom-container aspect-[4/5] bg-gray-100">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        width={400}
                        height={500}
                      />
                    </div>
                    <div className="pt-4">
                      <h3 className="text-sm font-normal text-brand-charcoal group-hover:text-brand-red transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-brand-surface">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal leading-tight mb-6">
                Visit Our Showroom
              </h2>
              <p className="text-base text-brand-body font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                Experience our curated collection firsthand. Our team of experts
                is ready to help you choose the perfect materials for your
                project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  data-testid="about-contact-cta"
                  className="inline-flex items-center gap-2 bg-brand-red text-white px-10 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors duration-300"
                >
                  Get Directions <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products"
                  data-testid="about-products-cta"
                  className="inline-flex items-center gap-2 border border-brand-charcoal text-brand-charcoal px-10 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-all duration-300"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
