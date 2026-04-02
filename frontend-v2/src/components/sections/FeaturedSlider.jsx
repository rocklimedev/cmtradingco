"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { featuredProducts } from "@/lib";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

export default function FeaturedSlider() {
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

            <Link
              href="/products"
              data-testid="featured-view-all"
              className="hidden md:inline-flex items-center gap-2 text-sm font-normal text-brand-red hover:text-red-700 tracking-wide uppercase transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
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
                    <div className="img-zoom-container aspect-square bg-gray-100 relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
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