// app/not-found.js
import LayoutWrapper from "./LayoutWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <LayoutWrapper noHeaderFooter>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-surface via-white to-brand-surface px-6 font-lato">
        <div className="max-w-xl w-full text-center">
          <div className="relative">
            <h1 className="text-[120px] md:text-[150px] font-bold text-brand-red/10 leading-none select-none">
              404
            </h1>
            <h2 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-semibold text-brand-charcoal">
              Oops!
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="text-xl md:text-2xl font-semibold">Page not found</h3>
            <p className="text-sm md:text-base text-brand-muted max-w-md mx-auto">
              The page you're looking for might have been removed, renamed, or temporarily unavailable.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-brand-red text-white shadow-md hover:shadow-lg transition-all"
            >
              Go Home
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-brand-border bg-white hover:bg-brand-surface transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}