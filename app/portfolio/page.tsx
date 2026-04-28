import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { PageHero } from "@/components/page-hero";
import { PortfolioCard } from "@/components/portfolio-card";
import { StatCard } from "@/components/stat-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected work from Stroke across campaign, event, software, and print execution."
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="A portfolio of launch-ready systems, not disconnected projects."
        description="Each project shows how Stroke combines premium visual direction with operational clarity across events, branding, digital products, media, and growth."
        primaryCta={{ label: "Start your project", href: "/contact" }}
      />

      <section className="section-spacing">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Featured projects"
              title="Hover to preview. Click to enter project detail."
              description="The portfolio is designed as a premium browsing experience, with each project opening into a deeper case-study layer."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {portfolio.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 0.08}>
                <PortfolioCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing border-t border-white/10">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Performance"
              title="Creative execution backed by consistency."
              description="We track the quality of delivery as carefully as the creative itself, from launch readiness to campaign response."
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
