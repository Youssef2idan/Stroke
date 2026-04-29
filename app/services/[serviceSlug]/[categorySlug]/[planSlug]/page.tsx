import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CustomPlanForm } from "@/components/custom-plan-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getAllPlanParams, getCategoryBySlug, getPlanBySlug, getServiceBySlug } from "@/lib/services";

type PageProps = {
  params: {
    serviceSlug: string;
    categorySlug: string;
    planSlug: string;
  };
};

export function generateStaticParams() {
  return getAllPlanParams();
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServiceBySlug(params.serviceSlug);
  const category = getCategoryBySlug(params.serviceSlug, params.categorySlug);
  const plan = getPlanBySlug(params.serviceSlug, params.categorySlug, params.planSlug);

  if (!service || !category || !plan) {
    return {};
  }

  return {
    title: `${plan.title} | ${category.title}`,
    description: `${plan.title} for ${category.title} inside Stroke's ${service.title} system.`
  };
}

export default function PlanDetailPage({ params }: PageProps) {
  const service = getServiceBySlug(params.serviceSlug);
  const category = getCategoryBySlug(params.serviceSlug, params.categorySlug);
  const plan = getPlanBySlug(params.serviceSlug, params.categorySlug, params.planSlug);

  if (!service || !category || !plan) {
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
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${service.slug}` },
              { label: category.title, href: `/services/${service.slug}/${category.slug}` },
              { label: plan.title }
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="eyebrow">{category.title}</p>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {plan.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{plan.summary}</p>
            </div>
            <div className="card-surface p-7">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Plan snapshot</p>
              <p className="mt-4 text-4xl font-semibold text-white">{plan.price ?? "Custom quote"}</p>
              <p className="mt-2 text-sm text-white/55">{plan.turnaround}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <AnimatedSection>
              <div className="card-surface p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-white/45">Included features</p>
                <ul className="mt-6 space-y-3 text-white/72">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <div className="card-surface p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-white/45">Deliverables</p>
                <ul className="mt-6 space-y-3 text-white/72">
                  {plan.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    href={`/gallery?service=${service.slug}&category=${category.slug}&plan=${plan.slug}`}
                  >
                    Confirm Plan
                  </Button>
                  <Button href={`/services/${service.slug}/${category.slug}`} variant="secondary">
                    Back to plans
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {category.customOptionEnabled ? (
        <section className="pb-24">
          <Container>
            <AnimatedSection>
              <CustomPlanForm serviceTitle={service.title} categoryTitle={category.title} />
            </AnimatedSection>
          </Container>
        </section>
      ) : null}
    </>
  );
}
