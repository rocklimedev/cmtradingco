"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/dashboard");

  if (isAdmin) {
    return (
      <div className="font-lato min-h-screen flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="font-lato min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
      <FloatingCTA />
    </div>
  );
}