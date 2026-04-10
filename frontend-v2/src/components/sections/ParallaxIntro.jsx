"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { showcaseImages } from "@/lib";

export default function ParallaxIntro() {
  return (
    <section data-testid="intro-section" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:sticky lg:top-0 lg:h-screen relative">
          <Image
            src={showcaseImages.parallax1}
            alt="Premium materials"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center py-16 lg:py-32 px-6 md:px-16 lg:px-20">
          <ScrollReveal>
            <p className="text-[19px] text-brand-body font-light leading-relaxed mb-6">
              At Chhabra Marble, we curate the finest building materials from
              trusted global partners. From premium tiles and natural stone to
              sanitaryware and architectural fittings.
            </p>

            <p className="text-[19px] text-brand-body font-light leading-relaxed mb-10">
              Our showroom offers expert consultation and a hands-on experience
              to help you design spaces that stand the test of time.
            </p>
            <Link
              href="/products"
              data-testid="intro-cta"
              className="inline-flex items-center gap-2 text-[15px] font-normal text-brand-red hover:text-red-700 tracking-wide uppercase transition-colors"
            >
              Explore Products <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
