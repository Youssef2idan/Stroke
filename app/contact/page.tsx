import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { ContactCard } from "@/components/contact-card";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Stroke to discuss events, branding, web development, media production, or marketing projects."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to launch, scale, or redesign."
        description="Stroke can shape event experiences, brand systems, websites, media assets, and growth programs through one premium engagement model."
      />

      <section className="section-spacing">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <AnimatedSection>
              <div className="space-y-5">
                <ContactCard label="Email" value={company.email} />
                <ContactCard label="Phone" value={company.phones.join(" / ")} />
                <ContactCard label="Address" value={company.location} />
                <ContactCard label="Owner" value={company.owner} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <div className="card-surface p-8 sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Project inquiry</p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
                  Start the conversation.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/65">
                  Use your preferred channel below and our team will follow up with next steps, timelines,
                  and scope recommendations.
                </p>

                <form className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-1">
                    <span className="mb-2 block text-sm text-white/65">Name</span>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-accent/50"
                    />
                  </label>
                  <label className="sm:col-span-1">
                    <span className="mb-2 block text-sm text-white/65">Email</span>
                    <input
                      type="email"
                      placeholder="hello@brand.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-accent/50"
                    />
                  </label>
                  <label className="sm:col-span-1">
                    <span className="mb-2 block text-sm text-white/65">Service interest</span>
                    <select className="w-full rounded-2xl border border-white/10 bg-surface px-4 py-3 text-white outline-none transition focus:border-accent/50">
                      <option>Events Management</option>
                      <option>Branding & Design</option>
                      <option>Web Development</option>
                      <option>Media Production</option>
                      <option>Marketing Solutions</option>
                    </select>
                  </label>
                  <label className="sm:col-span-1">
                    <span className="mb-2 block text-sm text-white/65">Estimated budget</span>
                    <input
                      type="text"
                      placeholder="Optional budget range"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-accent/50"
                    />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-sm text-white/65">Project brief</span>
                    <textarea
                      placeholder="Tell us about the outcome you want, timing, scope, audience, and any requirements."
                      className="min-h-40 w-full rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition focus:border-accent/50"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark"
                    >
                      Send inquiry
                    </button>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
