import { MessageCircle, Phone } from "lucide-react";
import { PHONE_RAW } from "@/assets/data/siteData";

export default function FloatingCTA() {
  return (
    <div
      className="fixed bottom-6 right-5 z-50 flex flex-col gap-3"
      data-testid="floating-cta"
    >
      <a
        href={`https://wa.me/${PHONE_RAW}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp-btn"
        className="flex items-center justify-center w-14 h-14 bg-brand-red rounded-full shadow-lg hover:shadow-xl transition-all duration-300 floating-cta-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-white fill-white" />
      </a>
      <a
        href={`tel:+${PHONE_RAW}`}
        data-testid="floating-call-btn"
        className="flex items-center justify-center w-14 h-14 bg-brand-red rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Call us"
      >
        <Phone size={24} className="text-white fill-white" />
      </a>
    </div>
  );
}
