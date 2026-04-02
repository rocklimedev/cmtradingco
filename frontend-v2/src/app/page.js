import {
  HeroSection,
  ParallaxIntro,
  CategoriesSection,
  FeaturedSlider,
  ParallaxShowcase,
  WhyChooseSection,
  QuoteSection,
  PromoBanner,
  ContactFormSection,
  PartnersSlider,
} from "@/components/sections";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <HeroSection />
      <ParallaxIntro />
      <CategoriesSection />
      <FeaturedSlider />
      <ParallaxShowcase />
      <WhyChooseSection />
      <QuoteSection />
      <PromoBanner />
      <ContactFormSection />
      <PartnersSlider />
    </div>
  );
}
