import Link from "next/link";
import type { ServiceItem } from "@/data/services";

type ServiceCardProps = {
  service: ServiceItem;
  index?: number;
};

export function ServiceCard({ service, index = 1 }: ServiceCardProps) {
  return (
    <article className="card-surface group h-full p-7 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/45">0{index}</span>
        <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-white/75">
          {service.accent}
        </span>
      </div>
      <h3 className="mt-8 text-2xl font-semibold text-white">{service.title}</h3>
      <p className="mt-4 leading-7 text-white/65">{service.description}</p>
      <ul className="mt-6 space-y-3 text-sm text-white/72">
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>
      <Link
        href={service.href}
        className="mt-8 inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white"
      >
        Enter experience
      </Link>
    </article>
  );
}
