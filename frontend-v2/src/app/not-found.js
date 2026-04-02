import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 font-lato">
      <div className="max-w-xl w-full text-center space-y-8">

        {/* CODE */}
        <div className="text-7xl font-semibold tracking-tight text-brand-red">
          404
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Page not found
          </h1>
          <p className="text-sm text-brand-muted">
            The page doesn’t exist or has been moved.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-3 pt-2">

          <Link
            href="/"
            className="px-5 py-2.5 text-sm rounded-md bg-brand-red text-white hover:opacity-90"
          >
            Go Home
          </Link>

          <Link
            href="/products"
            className="px-5 py-2.5 text-sm rounded-md border border-border hover:bg-accent"
          >
            Browse Products
          </Link>

        </div>

      </div>
    </div>
  );
}