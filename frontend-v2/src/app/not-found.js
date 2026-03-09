import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-24 sm:py-32">
      <div className="max-w-3xl w-full text-center space-y-10">
        {/* Large 404 with gradient accent */}
        <h1 className="text-[clamp(140px,28vw,220px)] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-red)] via-[var(--brand-charcoal)] to-[var(--brand-red)] opacity-90">
          404
        </h1>

        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">
            Page Not Found
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            The page you’re looking for doesn’t exist or may have been moved.
            Let us guide you back to our curated collection of premium surfaces.
          </p>
        </div>

        {/* Actions - prominent + secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold tracking-wider uppercase bg-[var(--brand-red)] text-primary-foreground rounded-md hover:bg-red-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            ← Return to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold tracking-wider uppercase border-2 border-[var(--brand-charcoal)] text-foreground rounded-md hover:bg-[var(--brand-charcoal)] hover:text-primary-foreground transition-all duration-300"
          >
            Explore Products
          </Link>
        </div>

        {/* Subtle hint / recovery line */}
        <p className="text-sm text-muted-foreground pt-8 opacity-80">
          Looking for inspiration? Our showroom features the finest marble,
          tiles, and architectural surfaces.
        </p>
      </div>
    </div>
  );
}
