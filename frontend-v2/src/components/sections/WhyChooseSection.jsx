import ScrollReveal from "@/components/ScrollReveal";
import { Grid3X3, Shield, Users, Star } from "lucide-react";
import { whyChooseUs } from "@/lib";

const iconMap = {
  Grid3X3,
  Shield,
  Users,
  Star,
};

export default function WhyChooseSection() {
  return (
    <section
      data-testid="why-choose-section"
      className="py-24 md:py-32 bg-brand-surface"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-brand-charcoal">
              Why Choose Chhabra Marble
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <ScrollReveal key={item.title} delay={Math.min(i + 1, 4)}>
                <div data-testid={`why-choose-${i}`} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-brand-border mb-6">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-brand-red"
                    />
                  </div>
                  <h3 className="text-base font-normal text-brand-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-body font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
