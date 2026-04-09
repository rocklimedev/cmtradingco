import ScrollReveal from "@/components/ScrollReveal";

export default function QuoteSection() {
  return (
    <section data-testid="quote-section" className="py-28 md:py-36 lg:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto text-center">
            <blockquote
              className="
              text-3xl 
              sm:text-4xl 
              md:text-5xl 
              lg:text-6xl 
              xl:text-7xl 
              font-light 
              text-brand-charcoal 
              leading-tight 
              tracking-tight
            "
            >
              Great spaces start with great materials.
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
