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
    <footer
      data-testid="main-footer"
      className="bg-white border-t border-brand-border"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Socials */}
          <div>
            <button
              onClick={() => router.push("/")}
              data-testid="footer-logo"
              className="mb-6"
            >
              <img
                src={LOGO_RED}
                alt="Chhabra Marble"
                className="h-14 w-auto object-contain"
              />
            </button>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];

                if (!Icon) return null; // prevent crash

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`social-${social.name.toLowerCase()}`}
                    className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-red hover:border-brand-red transition-all duration-300"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-normal tracking-[0.2em] uppercase text-brand-charcoal mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  data-testid={`footer-link-${link.name.toLowerCase()}`}
                  className="text-sm text-brand-body hover:text-brand-red transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-normal tracking-[0.2em] uppercase text-brand-charcoal mb-6">
              Categories
            </h4>
            <nav className="flex flex-col gap-3">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => router.push(`/products?category=${cat.id}`)}
                  data-testid={`footer-cat-${cat.id}`}
                  className="text-sm text-brand-body hover:text-brand-red transition-colors duration-300 text-left"
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-normal tracking-[0.2em] uppercase text-brand-charcoal mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4 text-sm text-brand-body font-light">
              <p>{ADDRESS}</p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="hover:text-brand-red transition-colors"
                data-testid="footer-phone"
              >
                {PHONE_NUMBER}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-brand-red transition-colors"
                data-testid="footer-email"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted font-light">
            &copy; {new Date().getFullYear()} Chhabra Marble Trading Co. All
            rights reserved.
          </p>
          <p className="text-sm md:text-base text-brand-muted font-light flex items-center gap-2">
            Powered by{" "}
            <span className="font-semibold text-[#ed7c2f] text-base md:text-lg">
              Rocklime
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
