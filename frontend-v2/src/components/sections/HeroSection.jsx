"use client";

import { useState, useEffect, useCallback } from "react";
import { bannerImages } from "@/lib";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 12000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "80vh",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {bannerImages.map((src, idx) => {
        const isActive = idx === currentIndex;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 20 : 10,
              transition: "opacity 3s ease-in-out",
            }}
          >
            {/* Image */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animation: isActive ? "zoomEffect 12s linear forwards" : "none",
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
                zIndex: 1,
              }}
            />

            {/* Film grain */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: "url('/noise.png')",
                opacity: 0.05,
                zIndex: 2,
              }}
            />
          </div>
        );
      })}

      {/* CENTER TEXT */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 25,
          textAlign: "center",
          width: "100%",
          padding: "0 20px",
          color: "#ffffff",
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          letterSpacing: "0.5px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(24px, 3vw, 48px)",
            margin: 0,
          }}
        >
          Great spaces start with great materials.
        </h1>
      </div>

      <style jsx>{`
        @keyframes zoomEffect {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
