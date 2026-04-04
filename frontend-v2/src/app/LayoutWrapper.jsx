"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

/**
 * LayoutWrapper handles page layouts:
 * - Admin pages: no Header/Footer/CTA
 * - 404 or custom no-header pages: no Header/Footer/CTA
 * - Normal pages: includes Header, Footer, FloatingCTA
 *
 * Props:
 *  - children: React node
 *  - noHeaderFooter (optional): boolean to force minimal layout
 */
export default function LayoutWrapper({ children, noHeaderFooter = false }) {
  const pathname = usePathname();

  // Define admin paths
  const adminPaths = ["/dashboard", "/login"];
  const isAdmin = adminPaths.some((path) => pathname?.startsWith(path));

  // Minimal layout if admin or explicitly requested
  if (isAdmin || noHeaderFooter) {
    return <div className="font-lato min-h-screen flex flex-col">{children}</div>;
  }

  // Normal layout with Header, Footer, FloatingCTA
  return (
    <div className="font-lato min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
      <FloatingCTA />
    </div>
  );
}