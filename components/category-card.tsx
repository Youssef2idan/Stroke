import Link from "next/link";
import type { ServiceCategory, ServiceItem } from "@/data/services";

type CategoryCardProps = {
  service: ServiceItem;
  category: ServiceCategory;
};

export function CategoryCard({ service, category }: CategoryCardProps) {
  return (
    <Link href={`/services/${service.slug}/${category.slug}`} className="group block h-full">
      <article className="card-surface h-full p-7 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-[0.26em] text-white/45">{service.accent}</p>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">
            {category.leadMetric}
          </span>
        </div>
        <h3 className="mt-8 text-2xl font-semibold text-white">{category.title}</h3>
        <p className="mt-4 leading-7 text-white/65">{category.description}</p>
        <p className="mt-6 text-sm text-white/50">{category.audience}</p>
        <span className="mt-8 inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white">
          View plans
        </span>
      </article>
    </Link>
  );
}
