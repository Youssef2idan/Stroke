import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, portfolio } from "@/data/site";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return portfolio.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description
  };
}

export default function PortfolioDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-36 sm:pt-40">
        <div className="absolute inset-0 bg-grid bg-[size:72px_72px] opacity-[0.04]" />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title }
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow">{project.category}</p>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{project.description}</p>
            </div>
            <div className="card-surface p-7">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Headline result</p>
              <p className="mt-4 text-4xl font-semibold text-white">{project.metrics}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <AnimatedSection className="card-surface p-7">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Challenge</p>
              <p className="mt-5 leading-8 text-white/72">{project.challenge}</p>
            </AnimatedSection>
            <AnimatedSection className="card-surface p-7" delay={0.08}>
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Solution</p>
              <p className="mt-5 leading-8 text-white/72">{project.solution}</p>
            </AnimatedSection>
            <AnimatedSection className="card-surface p-7" delay={0.16}>
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Outcomes</p>
              <ul className="mt-5 space-y-3 text-white/72">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.12} className="mt-12">
            <div className="card-surface p-8 sm:p-10 lg:p-12">
              <p className="eyebrow">Next engagement</p>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Build a similarly refined system for your next launch.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/65">
                Stroke brings the same premium execution logic across strategy, digital, media, events,
                and growth initiatives.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Start your project</Button>
                <Button href="/portfolio" variant="secondary">
                  Back to portfolio
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
