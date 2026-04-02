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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Track scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // threshold
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" data-testid="header-logo" className="flex-shrink-0">
              <img
                src={scrolled ? LOGO_RED : LOGO_WHITE}
                alt="Chhabra Marble"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <nav
              className="hidden md:flex items-center gap-10"
              data-testid="desktop-nav"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                  className={`text-sm font-normal tracking-wide uppercase transition-colors duration-300 ${
                    pathname === link.path
                      ? "text-brand-red"
                      : scrolled
                        ? "text-black/90 hover:text-brand-red"
                        : "text-white/90 hover:text-brand-red"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <button
              data-testid="mobile-menu-toggle"
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X
                  className={`${scrolled ? "text-black" : "text-white"}`}
                  size={24}
                />
              ) : (
                <Menu
                  className={`${scrolled ? "text-black" : "text-white"}`}
                  size={24}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className={`fixed inset-0 z-40 pt-20 ${
            scrolled ? "bg-white/95" : "bg-brand-charcoal/95"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                className={`text-lg font-normal tracking-wide uppercase transition-colors duration-300 ${
                  pathname === link.path
                    ? "text-brand-red"
                    : scrolled
                      ? "text-black/80 hover:text-brand-red"
                      : "text-white/80 hover:text-brand-red"
                }`}
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
