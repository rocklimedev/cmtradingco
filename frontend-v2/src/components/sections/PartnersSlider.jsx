"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { partners } from "@/assets/data/siteData";

export default function PartnersSlider() {
  // Duplicate the partners array for continuous scrolling effect
  const doubled = [...partners, ...partners];

  return (
    <section
      data-testid="partners-section"
      className="py-24 md:py-32 bg-brand-surface overflow-hidden"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 mb-16">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
              Partners
            </p>
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
              Our Partners
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden">
          <div className="partners-row-left flex">
            {doubled.map((partner, i) => (
              <div
                key={`r1-${i}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center p-6 mx-3"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-14 w-auto object-contain brand-logo-hover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="partners-row-right flex">
            {doubled.map((partner, i) => (
              <div
                key={`r2-${i}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center p-6 mx-3"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-14 w-auto object-contain brand-logo-hover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
