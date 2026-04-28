import type { Testimonial } from "@/data/site";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="card-surface h-full p-7">
      <p className="text-lg leading-8 text-white/80">"{testimonial.quote}"</p>
      <div className="mt-8">
        <p className="font-medium text-white">{testimonial.name}</p>
        <p className="mt-1 text-sm text-white/50">{testimonial.role}</p>
      </div>
    </article>
  );
}
