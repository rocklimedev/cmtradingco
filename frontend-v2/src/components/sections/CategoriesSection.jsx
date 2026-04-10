"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { categories } from "@/lib";

export default function CategoriesSection() {
  return (
    <section data-testid="categories-section" className="py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal mb-16">
            Explore Categories
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={Math.min(i + 1, 6)}>
              <Link
                href={`/products?category=${cat.id}`}
                data-testid={`category-card-${cat.id}`}
                className="group block card-hover"
              >
                <div className="img-zoom-container aspect-[4/5] bg-gray-100 relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="pt-4 pb-2">
                  <h3 className="text-base font-normal text-brand-charcoal group-hover:text-brand-red transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
