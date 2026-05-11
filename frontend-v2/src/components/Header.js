"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LOGO_WHITE, LOGO_RED, navLinks } from "@/lib";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/75 backdrop-blur-2xl backdrop-saturate-200 shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
            : "bg-transparent"
        }`}
      >
        <div className="relative">
          {scrolled && (
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/30 pointer-events-none" />
          )}

          <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                scrolled ? "h-16" : "h-20"
              }`}
            >
              {/* Logo */}
              <Link
                href="/"
                data-testid="header-logo"
                className="flex-shrink-0"
              >
                <img
                  src={scrolled ? LOGO_RED : LOGO_WHITE}
                  alt="Chhabra Marble"
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? "h-10" : "h-12"
                  }`}
                />
              </Link>

              {/* Desktop Nav */}
              <nav
                className="hidden md:flex items-center gap-10"
                data-testid="desktop-nav"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    data-testid={`nav-link-${link.name.toLowerCase()}`}
                    className={`text-sm font-medium tracking-[0.5px] uppercase transition-all duration-300 relative group ${
                      pathname === link.path
                        ? "text-brand-red"
                        : scrolled
                          ? "text-black/90 hover:text-brand-red"
                          : "text-white hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand-red transition-all duration-300 ${
                        pathname === link.path
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              </nav>

              {/* Mobile Toggle */}
              <button
                data-testid="mobile-menu-toggle"
                className="md:hidden p-2 -mr-2"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X
                    className={`transition-colors duration-300 ${
                      scrolled ? "text-black" : "text-white"
                    }`}
                    size={26}
                  />
                ) : (
                  <Menu
                    className={`transition-colors duration-300 ${
                      scrolled ? "text-black" : "text-white"
                    }`}
                    size={26}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className={`fixed inset-0 z-40 pt-20 transition-all duration-300 ${
            scrolled
              ? "bg-white/85 backdrop-blur-3xl"
              : "bg-black/70 backdrop-blur-2xl"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          <nav className="flex flex-col items-center gap-10 pt-16 animate-[fadeIn_0.4s_ease]">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                className={`text-xl font-medium tracking-widest uppercase transition-all duration-300 hover:scale-105 ${
                  pathname === link.path
                    ? "text-brand-red"
                    : scrolled
                      ? "text-black/90 hover:text-brand-red"
                      : "text-white/90 hover:text-white"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
