import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { PageHero } from "@/components/page-hero";
import { ProcessTimeline } from "@/components/process-timeline";
import { ServiceCard } from "@/components/service-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Stroke's dynamic services platform across events, branding, web development, media production, and marketing solutions."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="A multi-service platform where every discipline opens into its own premium workflow."
        description="Instead of static service pages, Stroke gives each service its own category paths, plan structure, and custom request option so the experience feels tailored from the first click."
        primaryCta={{ label: "Discuss your brief", href: "/contact" }}
        secondaryCta={{ label: "See our work", href: "/portfolio" }}
      />

      <section className="section-spacing">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Service experiences"
              title="Choose the discipline, then move deeper into categories, plans, and tailored offers."
              description="Each service family is structured for future growth, making it easy to add categories, new plans, and custom pathways without reworking the entire site."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.08}>
                <ServiceCard service={service} index={index + 1} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing border-t border-white/10">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Delivery model"
              title="One workflow, shared standards, measurable output."
              description="Our services connect through one process that protects quality, reduces communication gaps, and keeps timelines efficient."
              align="center"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-12">
            <ProcessTimeline />
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
