"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LOGO_WHITE, navLinks } from "@/assets/data/siteData";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        data-testid="main-header"
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => router.push("/")}
              data-testid="header-logo"
              className="flex-shrink-0"
            >
              <img
                src={LOGO_WHITE}
                alt="Chhabra Marble"
                className="h-12 w-auto object-contain"
              />
            </button>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-10"
              data-testid="desktop-nav"
            >
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                  className={`text-sm font-normal tracking-wide uppercase transition-colors duration-300 ${
                    pathname === link.path
                      ? "text-brand-red"
                      : "text-white/90 hover:text-brand-red"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Mobile menu toggle */}
            <button
              data-testid="mobile-menu-toggle"
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="fixed inset-0 z-40 bg-brand-charcoal/95 pt-20"
        >
          <nav className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => router.push(link.path)}
                data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                className={`text-lg font-normal tracking-wide uppercase transition-colors duration-300 ${
                  pathname === link.path
                    ? "text-brand-red"
                    : "text-white/80 hover:text-brand-red"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
