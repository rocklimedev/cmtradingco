import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./Providers";

const lato = Lato({
  subsets: ["latin"], // required for Google fonts
  weight: ["100", "300", "400", "700", "900"], // choose what you need
  display: "swap",
  variable: "--font-lato",
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"), // 🔁 replace with real domain
  title: {
    default: "Chhabra Marble - Premium Tiles & Sanitaryware in Delhi",
    template: "%s | Chhabra Marble",
  },
  description:
    "Chhabra Marble offers premium tiles, CP fittings, sanitaryware, stones, granites, and plumbing solutions in Delhi.",
  keywords: [
    "Tiles in Delhi",
    "Sanitaryware Delhi",
    "Granite Supplier Delhi",
    "Marble Dealer Delhi",
    "Chhabra Marble",
  ],
  openGraph: {
    title: "Chhabra Marble - Premium Tiles & Sanitaryware",
    description:
      "Explore premium tiles, stones, granites & sanitaryware at Chhabra Marble, Delhi.",
    url: "https://yourdomain.com",
    siteName: "Chhabra Marble",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhabra Marble",
    description: "Premium Tiles, Stones & Sanitaryware Supplier in Delhi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
