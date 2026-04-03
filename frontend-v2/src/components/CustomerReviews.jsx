"use client";
import { useEffect, useState } from "react";

import { reviews } from "@/lib";
export default function CustomerReviews() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleReviews = [
    reviews[(active - 1 + reviews.length) % reviews.length],
    reviews[active],
    reviews[(active + 1) % reviews.length],
  ];

  const positions = [
    { x: 70, y: 30 },
    { x: 120, y: 130 },
    { x: 70, y: 230 },
  ];

  return (
    <section className="bg-brand-surface py-20 px-6 md:px-20 font-lato">
      <div className="rounded-2xl p-12 grid md:grid-cols-2 items-center gap-10">

        {/* LEFT SIDE */}
        <div className="relative h-[260px]">

          {/* CURVE */}
          <svg
            className="absolute left-0 top-0 h-full w-[160px]"
            viewBox="0 0 160 260"
          >
            <path
              d="M130,0 C30,80 30,180 130,260"
              fill="transparent"
              stroke="#e5e5e5"
              strokeWidth="2"
            />
          </svg>

          {/* AVATARS */}
          {visibleReviews.map((review, index) => {
            const pos = positions[index];

            return (
              <div
                key={index}
                className="absolute transition-all duration-700"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`flex items-center gap-3 transition-all ${
                    index === 1
                      ? "scale-110 opacity-100"
                      : "opacity-40"
                  }`}
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className={`w-12 h-12 rounded-full border-2 ${
                      index === 1
                        ? "border-brand-red shadow-md"
                        : "border-gray-200"
                    }`}
                  />

                  <div>
                    <p
                      className={`text-sm ${
                        index === 1
                          ? "font-semibold text-brand-charcoal"
                          : "text-brand-muted"
                      }`}
                    >
                      {review.name}
                    </p>

                    <p className="text-xs text-brand-muted">
                      ★ {review.rating} • {review.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative min-h-[160px] pl-6 md:pl-10">

          {/* QUOTE ICON */}
          <div className="text-5xl text-brand-red opacity-20 absolute -top-6 left-0">
            “
          </div>

          {reviews.map((review, index) => (
            <p
              key={index}
              className={`absolute transition-all duration-700 text-brand-body text-lg leading-relaxed ${
                index === active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {review.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}