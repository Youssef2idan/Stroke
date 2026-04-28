import { Button } from "@/components/ui/button";
import type { ServicePlan } from "@/data/services";

type PlanCardProps = {
  plan: ServicePlan;
  categoryTitle: string;
  href: string;
  featured?: boolean;
};

export function PlanCard({ plan, categoryTitle, href, featured = false }: PlanCardProps) {
  return (
    <article
      className={`card-surface h-full p-7 ${featured ? "border-accent/40 bg-accent/[0.06] shadow-glow" : ""}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-white/45">{categoryTitle}</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">{plan.title}</h3>
        </div>
        {featured ? (
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white">
            Recommended
          </span>
        ) : null}
      </div>

      <div className="mt-8 flex items-end gap-3">
        <p className="text-4xl font-semibold tracking-tight text-white">{plan.price}</p>
        <p className="pb-1 text-sm text-white/50">{plan.turnaround}</p>
      </div>

      <p className="mt-5 leading-7 text-white/65">{plan.summary}</p>

      <ul className="mt-8 space-y-3 text-sm text-white/72">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button href={href}>{plan.ctaLabel}</Button>
      </div>
    </article>
  );
}
