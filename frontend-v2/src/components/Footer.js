"use client";

import { useRouter } from "next/navigation";
import { Instagram, Facebook, Youtube, MapPin, Linkedin } from "lucide-react";
import {
  LOGO_RED,
  navLinks,
  categories,
  PHONE_NUMBER,
  EMAIL,
  ADDRESS,
  socialLinks,
} from "@/lib";

const iconMap = { Instagram, Facebook, Youtube, MapPin, Linkedin };

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <footer
        data-testid="main-footer"
        className="bg-white border-t border-brand-border"
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-14 md:py-20">
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {/* Logo & Social */}
            <div className="text-center sm:text-left">
              <button
                onClick={() => router.push("/")}
                data-testid="footer-logo"
                className="mb-6 mx-auto sm:mx-0"
              >
                <img
                  src={LOGO_RED}
                  alt="Chhabra Marble"
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </button>

              <div className="flex justify-center sm:justify-start gap-4 mt-4 flex-wrap">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  if (!Icon) return null;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-red hover:border-brand-red transition-all duration-300"
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-xs tracking-[0.2em] uppercase text-brand-charcoal mb-6">
                Quick Links
              </h4>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => router.push(link.path)}
                    className="text-sm text-brand-body hover:text-brand-red transition-colors text-center sm:text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Categories */}
            <div className="text-center sm:text-left">
              <h4 className="text-xs tracking-[0.2em] uppercase text-brand-charcoal mb-6">
                Categories
              </h4>

              <nav className="flex flex-col gap-3">
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => router.push(`/products?category=${cat.id}`)}
                    className="text-sm text-brand-body hover:text-brand-red transition-colors text-center sm:text-left"
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left">
              <h4 className="text-xs tracking-[0.2em] uppercase text-brand-charcoal mb-6">
                Contact
              </h4>

              <div className="flex flex-col gap-4 text-sm text-brand-body font-light">
                <p>{ADDRESS}</p>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="hover:text-brand-red transition-colors"
                >
                  {PHONE_NUMBER}
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-brand-red transition-colors"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-brand-border mt-12 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs text-brand-muted font-light">
              &copy; {new Date().getFullYear()} Chhabra Marble Trading Co. All
              rights reserved.
            </p>

            <p className="text-sm text-brand-muted font-light flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              Powered by{" "}
              <a
                href="https://www.rocklime.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rocklime-link"
              >
                Rocklime
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Scoped styles */}
      <style jsx>{`
        .rocklime-link {
          font-size: 14px;
          font-weight: 400;
          color: #ed7c2f;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .rocklime-link:hover {
          color: #c6a15b;
        }
      `}</style>
    </>
  );
}
