import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CustomPlanForm } from "@/components/custom-plan-form";
import { PlanCard } from "@/components/plan-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllCategoryParams, getCategoryBySlug, getServiceBySlug } from "@/lib/services";

type PageProps = {
  params: {
    serviceSlug: string;
    categorySlug: string;
  };
};

export function generateStaticParams() {
  return getAllCategoryParams();
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServiceBySlug(params.serviceSlug);
  const category = getCategoryBySlug(params.serviceSlug, params.categorySlug);

  if (!service || !category) {
    return {};
  }

  return {
    title: `${category.title} Plans`,
    description: `${category.description} Explore pricing plans and custom request options from Stroke.`
  };
}

export default function ServiceCategoryPage({ params }: PageProps) {
  const service = getServiceBySlug(params.serviceSlug);
  const category = getCategoryBySlug(params.serviceSlug, params.categorySlug);

  if (!service || !category) {
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
              { label: category.title }
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <p className="eyebrow">{service.title}</p>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {category.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{category.description}</p>
            </div>
            <div className="card-surface p-7">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Designed for</p>
              <p className="mt-4 text-xl font-medium text-white">{category.audience}</p>
              <p className="mt-3 text-sm text-white/55">{category.leadMetric}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Plans"
              title="Choose the plan that fits now, then expand when needed."
              description="Each category supports a future-ready plan architecture with clear deliverables, visual polish, and a dedicated custom pathway."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {category.plans.map((plan, index) => (
              <AnimatedSection key={plan.slug} delay={index * 0.08}>
                <PlanCard
                  plan={plan}
                  categoryTitle={category.title}
                  href={`/services/${service.slug}/${category.slug}/${plan.slug}`}
                  featured={index === 1}
                />
              </AnimatedSection>
            ))}
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
