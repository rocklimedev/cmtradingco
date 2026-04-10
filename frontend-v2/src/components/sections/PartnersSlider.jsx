"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { partners } from "@/lib";

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
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
              Our Partners
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden">
          <div className="partners-row-right flex items-center">
            {doubled.map((partner, i) => (
              <div
                key={`r2-${i}`}
                className="flex-shrink-0 w-80 md:w-96 h-40 md:h-48 flex items-center justify-center p-4 mx-6"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-40 md:max-h-48 w-auto object-contain brand-logo-hover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
