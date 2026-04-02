"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { catalogues, heroImages } from "@/lib";

export default function CataloguePage() {
  // 🔽 Force download function (works for cross-origin PDFs)
  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${name}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div data-testid="catalogue-page">
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages.catalogue}
            alt="Catalogues"
            className="w-full h-full object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex items-end h-full max-w-[1300px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-4">
              Downloads
            </p>
            <h1 className="text-4xl sm:text-5xl font-light text-white">
              Catalogues
            </h1>
            <p className="text-base text-white/70 mt-4 max-w-xl">
              Download detailed product catalogues from our partner brands.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogues.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={Math.min(i + 1, 6)}>
                <div className="group card-hover">
                  {/* 🔽 CLICKABLE IMAGE → OPEN IN NEW TAB */}
                  <a
                    href={cat.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="img-zoom-container aspect-[3/4] bg-gray-100 relative cursor-pointer">
                      <Image
                        src={cat.image}
                        alt={`${cat.brand} Catalogue`}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                  </a>

                  {/* Content */}
                  <div className="pt-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-base text-brand-charcoal">
                        {cat.brand}
                      </h3>
                      <p className="text-xs text-brand-muted mt-1">
                        Product Catalogue
                      </p>
                    </div>

                    {/* 🔽 DOWNLOAD BUTTON */}
                    <a
                      href={cat.downloadUrl}
                      download
                      target="_blank"
                      className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-red hover:border-brand-red transition-all duration-300"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
