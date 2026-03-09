"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { showcaseImages } from "@/assets/data/siteData";

export default function PromoBanner() {
  return (
    <section
      data-testid="promo-section"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={showcaseImages.promo}
          alt="Premium materials"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
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
          <Link
            href="/products"
            data-testid="promo-cta"
            className="inline-flex items-center gap-2 bg-brand-red text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors duration-300"
          >
            Explore Collection <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
