"use client";

import { useState } from "react";

type CustomPlanFormProps = {
  serviceTitle: string;
  categoryTitle: string;
};

type FormState = {
  name: string;
  email: string;
  budget: string;
  requirements: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  budget: "",
  requirements: ""
};

export function CustomPlanForm({ serviceTitle, categoryTitle }: CustomPlanFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      ...form,
      serviceTitle,
      categoryTitle,
      submittedAt: new Date().toISOString()
    };

    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem("stroke-custom-plan-requests");
      const parsed = existing ? (JSON.parse(existing) as unknown[]) : [];
      window.localStorage.setItem("stroke-custom-plan-requests", JSON.stringify([payload, ...parsed]));
    }

    setSubmitted(true);
    setForm(initialState);
  }

  return (
    <div className="card-surface p-8 sm:p-10">
      <p className="eyebrow">Customize your plan</p>
      <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">
        Build a custom {categoryTitle.toLowerCase()} solution.
      </h3>
      <p className="mt-4 max-w-2xl leading-7 text-white/65">
        If the listed plans are close but not exact, send your preferences and our {serviceTitle} team
        will shape a tailored proposal around your goals, timing, and production needs.
      </p>

      {submitted ? (
        <div className="mt-6 rounded-3xl border border-accent/30 bg-accent/10 p-4 text-sm text-white/85">
          Your custom request has been saved locally as a mock submission. Stroke can now turn it into a
          tailored proposal flow or API-backed lead capture later.
        </div>
      ) : null}

      <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <label className="sm:col-span-1">
          <span className="mb-2 block text-sm text-white/65">Name</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-accent/50"
            placeholder="Your name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            required
          />
        </label>
        <label className="sm:col-span-1">
          <span className="mb-2 block text-sm text-white/65">Email</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-accent/50"
            placeholder="hello@company.com"
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            required
          />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm text-white/65">Requirements description</span>
          <textarea
            className="min-h-36 w-full rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition focus:border-accent/50"
            placeholder="Tell us about your preferences, required features, event details, media needs, brand direction, integrations, or anything else important."
            value={form.requirements}
            onChange={(event) => handleChange("requirements", event.target.value)}
            required
          />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm text-white/65">Budget (optional)</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-accent/50"
            placeholder="Approximate budget"
            type="text"
            value={form.budget}
            onChange={(event) => handleChange("budget", event.target.value)}
          />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark"
          >
            Submit custom request
          </button>
        </div>
      </form>
    </div>
  );
}
