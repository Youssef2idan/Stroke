import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryCard } from "@/components/category-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";
import { getAllServiceParams, getServiceBySlug } from "@/lib/services";

type PageProps = {
  params: {
    serviceSlug: string;
  };
};

export function generateStaticParams() {
  return getAllServiceParams();
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServiceBySlug(params.serviceSlug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = getServiceBySlug(params.serviceSlug);

  if (!service) {
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
              { label: service.title }
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <p className="eyebrow">{service.accent}</p>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{service.intro}</p>
            </div>
            <div className="card-surface p-7">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Service architecture</p>
              <p className="mt-4 text-4xl font-semibold text-white">{service.categories.length}</p>
              <p className="mt-2 leading-7 text-white/65">
                premium category paths with plan structures and custom request options.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Categories"
              title={`Enter the ${service.title.toLowerCase()} system through a focused category.`}
              description="Each category is designed as its own premium path with curated plans and room for custom scope."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {service.categories.map((category, index) => (
              <AnimatedSection key={category.slug} delay={index * 0.08}>
                <CategoryCard service={service} category={category} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
