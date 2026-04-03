"use client";

import { useEffect, useState } from "react";
import { bannerImages } from "@/lib";

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100dvh] overflow-hidden">
      {bannerImages.map((img, i) => {
        const isActive = i === index;

        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
              isActive ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            {/* Image with continuous zoom */}
            <img
              src={img}
              alt={`Banner ${i}`}
              className={`
                w-full h-full object-cover
                transition-transform duration-[10000ms] ease-linear
                ${isActive ? "scale-110" : "scale-105"}
              `}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

            {/* Film grain */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')]" />
          </div>
        );
      })}
    </section>
  );
}