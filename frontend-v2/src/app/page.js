import CustomerReviews from "@/components/CustomerReviews";
import {
  HeroSection,
  ParallaxIntro,
  CategoriesSection,
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
      <PromoBanner />
      <WhyChooseSection />
      <QuoteSection />
      <ContactFormSection />
      <PartnersSlider />
    </div>
  );
}
