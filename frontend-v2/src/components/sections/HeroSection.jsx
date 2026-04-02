"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { bannerImages } from "@/lib";
export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="h-screen overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {bannerImages.map((img, index) => (
            <div className="flex-[0_0_100%] relative" key={index}>
              <img
                src={img}
                alt={`Banner ${index}`}
                className="w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}