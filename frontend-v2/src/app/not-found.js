import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-24 sm:py-32 font-[Lato]">
      <div className="max-w-3xl w-full text-center space-y-10">
        
        {/* 404 Heading */}
        <h1 className="text-[clamp(140px,28vw,220px)] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--destructive))] via-[hsl(var(--foreground))] to-[hsl(var(--destructive))] opacity-90">
          404
        </h1>

        {/* Title + Description */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
            Page Not Found
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground/90 font-light max-w-2xl mx-auto leading-relaxed">
            The page you’re looking for doesn’t exist or may have been moved.
            Let us guide you back to our curated collection of premium surfaces.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold tracking-wider uppercase bg-[hsl(var(--destructive))] text-primary-foreground rounded-md hover:bg-[hsl(var(--destructive)/0.85)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            ← Return to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold tracking-wider uppercase border-2 border-border text-foreground rounded-md hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Explore Products
          </Link>
        </div>

        {/* Footer Hint */}
        <p className="text-sm text-muted-foreground/80 pt-8">
          Looking for inspiration? Our showroom features the finest marble,
          tiles, and architectural surfaces.
        </p>
      </div>
    </div>
  );
}