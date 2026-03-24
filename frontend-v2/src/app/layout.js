import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./Providers";
import FloatingCTA from "@/components/FloatingCTA";
import ScrollToTop from "@/components/ScrollToTop";
import LayoutWrapper from "./LayoutWrapper";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Chhabra Marble - Premium Tiles & Sanitaryware in Delhi",
    template: "%s | Chhabra Marble",
  },
  description:
    "Chhabra Marble offers premium tiles, CP fittings, sanitaryware, stones, granites, and plumbing solutions in Delhi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <Providers>
          <ScrollToTop />

          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}