"use client";

import { videoBanners } from "@/lib";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Video */}
      <video
        src={videoBanners.homeVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.05)", // slight cinematic zoom
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
    </section>
  );
}
