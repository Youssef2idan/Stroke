import { processSteps } from "@/data/site";

export function ProcessTimeline() {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {processSteps.map((step, index) => (
        <div key={step.title} className="card-surface relative overflow-hidden p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="text-sm text-white/45">0{index + 1}</p>
          <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/65">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
