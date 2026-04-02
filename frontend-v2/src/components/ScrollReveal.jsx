// @/components/ScrollReveal.jsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
  ...props
}) {
  const [ref, isVisible] = useScrollReveal();

  const combinedClassName = [
    "scroll-reveal",
    isVisible ? "visible" : "",
    delay ? `scroll-reveal-delay-${delay}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component ref={ref} className={combinedClassName} {...props}>
      {children}
    </Component>
  );
}
