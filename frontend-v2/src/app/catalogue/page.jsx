"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Loader2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { catalogues, videoBanners } from "@/lib";

export default function CataloguePage() {
  const [downloadingId, setDownloadingId] = useState(null);

  // ✅ Force download (cross-origin safe)
  const handleDownload = async (url, name, id) => {
    try {
      setDownloadingId(id);

      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const cleanName = name.toLowerCase().replace(/\s+/g, "-");

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${cleanName}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div data-testid="catalogue-page">
      {/* 🔥 Hero Banner */}
      <section className="relative h-[100dvh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            src={videoBanners.cataloguesVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-end h-full max-w-[1300px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white">
              Catalogues
            </h1>

            <p className="text-lg text-white/70 mt-4 max-w-xl">
              Download detailed product catalogues from our partner brands.
            </p>
          </div>
        </div>
      </section>

      {/* 📦 Catalogue Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogues.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={Math.min(i + 1, 6)}>
                <div className="group card-hover">
                  {/* 🔍 Preview (Open in new tab) */}
                  <a
                    href={cat.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="img-zoom-container aspect-[3/4] bg-gray-100 relative cursor-pointer overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={`${cat.brand} Catalogue`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </a>

                  {/* 📄 Content */}
                  <div className="pt-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-base text-brand-charcoal">
                        {cat.brand}
                      </h3>
                      <p className="text-xs text-brand-muted mt-1">
                        Product Catalogue
                      </p>
                    </div>

                    {/* ⬇️ Download Button */}
                    <button
                      onClick={() =>
                        handleDownload(cat.downloadUrl, cat.brand, cat.id)
                      }
                      className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-red hover:border-brand-red transition-all duration-300"
                    >
                      {downloadingId === cat.id ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Download size={16} />
                      )}
                    </button>
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
