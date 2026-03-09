"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { showcaseImages } from "@/assets/data/siteData";

export default function ParallaxShowcase() {
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

        <div className="lg:sticky lg:top-0 lg:h-screen order-1 lg:order-2 relative">
          <Image
            src={showcaseImages.parallax2}
            alt="Showroom experience"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
