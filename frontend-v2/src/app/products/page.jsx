// app/products/page.jsx
import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export const metadata = {
  title: "Our Products | CM Trading Co",
  description:
    "Explore our wide range of premium products across multiple categories.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto mb-4"></div>
            <p className="text-brand-charcoal">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
