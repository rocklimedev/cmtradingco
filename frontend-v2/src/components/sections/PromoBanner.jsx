"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { videoBanners } from "@/lib";

export default function PromoBanner() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[90vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          src={videoBanners.homeVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6 md:px-12">
        <ScrollReveal>
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