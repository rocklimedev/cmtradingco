import ScrollReveal from "@/components/ScrollReveal";

export default function QuoteSection() {
  return (
    <section data-testid="quote-section" className="py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl text-brand-red mb-6 font-light">
              &ldquo;
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-brand-charcoal leading-snug mb-8">
              Great spaces start with great materials.
            </blockquote>
            <p className="text-sm text-brand-muted font-light tracking-wide uppercase">
              &mdash; Chhabra Marble
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
