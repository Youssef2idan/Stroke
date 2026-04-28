import { AnimatedSection } from "@/components/animated-section";
import { PortfolioCard } from "@/components/portfolio-card";
import { ProcessTimeline } from "@/components/process-timeline";
import { ServiceCard } from "@/components/service-card";
import { StatCard } from "@/components/stat-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";
import { company, portfolio, stats, testimonials, whyChooseUs } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 pb-20 pt-36 sm:pb-24 sm:pt-40">
        <div className="absolute inset-0 bg-grid bg-[size:72px_72px] opacity-[0.04]" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <Container className="relative">
          <div className="grid items-end gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <AnimatedSection>
              <p className="eyebrow">Luxury agency platform</p>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Stroke. Elevating Brands Through Creative Excellence
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
                {company.tagline}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Start your project</Button>
                <Button href="/portfolio" variant="secondary">
                  View portfolio
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="card-surface relative overflow-hidden p-8 shadow-glow">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Platform overview</p>
                <div className="mt-8 space-y-6">
                  {stats.map((stat) => (
                    <div key={stat.value} className="border-b border-white/10 pb-6 last:border-none last:pb-0">
                      <p className="text-4xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-2 text-sm leading-6 text-white/62">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm uppercase tracking-[0.26em] text-white/45">Inside Stroke</p>
                  <p className="mt-3 text-base leading-7 text-white/70">
                    Every service category opens into its own experience with category flows, plan layers, and
                    tailored request options.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Services"
              title="Five premium service pillars. One connected operating system."
              description="Stroke is structured like a launch-ready platform. Each discipline has its own categories, plan architecture, and custom path while remaining visually and strategically unified."
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

      <section className="section-spacing border-y border-white/10 bg-white/[0.02]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="From Idea to Reality"
              title="A production rhythm designed for commercial launch, not portfolio theater."
              description="The system is built to move from concept to rollout without losing polish, speed, or cohesion across disciplines."
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-12">
            <ProcessTimeline />
          </AnimatedSection>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <AnimatedSection>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeading
                eyebrow="Why Choose Us"
                title="A luxury agency feel backed by a scalable technical foundation."
                description="Stroke combines strong visual standards with systems thinking, making the experience feel premium to clients and maintainable for future growth."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {whyChooseUs.map((item, index) => (
                  <AnimatedSection key={item} delay={index * 0.08}>
                    <div className="card-surface h-full p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-white">
                        0{index + 1}
                      </div>
                      <p className="mt-6 leading-7 text-white/72">{item}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="section-spacing border-y border-white/10 bg-white/[0.02]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Featured portfolio"
              title="Selected launches across brand, digital, production, and growth."
              description="The work reflects Stroke's multi-system approach, where creative direction and execution infrastructure are designed together."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {portfolio.slice(0, 4).map((project, index) => (
              <AnimatedSection key={project.slug} delay={index * 0.08}>
                <PortfolioCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <AnimatedSection>
            <SectionHeading
              eyebrow="Client perspective"
              title="Built to feel premium from the inside out."
              description="Our clients value the visual polish, but they stay for the clarity, speed, and strategic consistency that the platform approach creates."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.08}>
                <TestimonialCard testimonial={testimonial} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <AnimatedSection>
            <div className="card-surface overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="eyebrow">Ready to build</p>
                  <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Launch your next experience through a single premium agency platform.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                    Whether you need an event, brand system, digital product, media campaign, or growth engine, Stroke is built to scale the relationship beyond one brief.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <Button href="/contact">Book a consultation</Button>
                  <Button href="/services" variant="secondary">
                    Explore services
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
