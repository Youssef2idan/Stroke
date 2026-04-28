import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { PageHero } from "@/components/page-hero";
import { StatCard } from "@/components/stat-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { company, stats, whyChooseUs } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Stroke, a luxury digital agency platform connecting events, branding, web development, media production, and marketing."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Stroke was built for brands that want one refined platform instead of fragmented execution."
        description={company.description}
        primaryCta={{ label: "Talk to our team", href: "/contact" }}
      />

      <section className="section-spacing">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <AnimatedSection>
              <SectionHeading
                eyebrow="Our perspective"
                title="Luxury execution works better when strategy, design, production, and delivery are connected."
                description="Stroke operates like an agency platform. We structure experiences, systems, and campaigns so visual polish and operational clarity support one another from the start."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.12}>
              <div className="card-surface p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Mission and vision</p>
                <div className="mb-8 mt-6 space-y-4 border-b border-white/10 pb-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/40">Mission</p>
                    <p className="mt-3 leading-7 text-white/68">{company.mission}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/40">Vision</p>
                    <p className="mt-3 leading-7 text-white/68">{company.vision}</p>
                  </div>
                </div>
                <div className="mt-8 space-y-6">
                  {whyChooseUs.map((item) => (
                    <div key={item} className="flex gap-4 border-b border-white/10 pb-6 last:border-none last:pb-0">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                      <p className="leading-7 text-white/68">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <section className="section-spacing border-t border-white/10">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Scale"
              title="Built as a scalable foundation for commercial growth."
              description="The same design language and systems thinking that shape the front-end experience also make the platform easier to expand with new services, routes, and content layers."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.value} delay={index * 0.08}>
                <StatCard value={stat.value} label={stat.label} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
