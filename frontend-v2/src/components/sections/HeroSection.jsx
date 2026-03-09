import { heroImages } from "@/assets/data/siteData";

export default function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute inset-0 hero-bg">
        <img
          src={heroImages.home}
          alt="Chhabra Marble"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
