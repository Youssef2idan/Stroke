import Link from "next/link";
import type { Project } from "@/data/site";

type PortfolioCardProps = {
  project: Project;
};

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <article className="card-surface relative h-full overflow-hidden p-8 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.28em] text-white/45">{project.category}</p>
          <h3 className="mt-6 text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mt-4 leading-7 text-white/65">{project.description}</p>
          <div className="mt-8 flex items-center justify-between gap-4">
            <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-white">
              {project.metrics}
            </span>
            <span className="text-sm text-white/70 transition-colors duration-300 group-hover:text-white">
              View project
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
