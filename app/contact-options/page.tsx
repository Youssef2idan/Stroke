"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";

function splitValues(value: string | null) {
  if (!value) {
    return [];
  }

  return value.split("||").map((item) => item.trim()).filter(Boolean);
}

function parseQuantityMap(value: string | null) {
  const pairs = splitValues(value);
  const result: Record<string, number> = {};
  for (const pair of pairs) {
    const [key, rawValue] = pair.split(":");
    if (!key) continue;
    const quantity = Number(rawValue);
    result[key] = Number.isFinite(quantity) ? Math.max(1, quantity) : 1;
  }
  return result;
}

function ContactOptionsContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "event" ? "event" : "shopping";
  const planName = searchParams.get("plan") ?? "Selected Plan";
  const categoryName = searchParams.get("category") ?? "General";
  const serviceName = searchParams.get("service") ?? "Stroke Service";
  const selectedItems = splitValues(searchParams.get("selectedItems"));
  const selectedLineItems = splitValues(searchParams.get("selectedLineItems"));
  const quantities = parseQuantityMap(searchParams.get("quantities"));
  const selectedAward = searchParams.get("selectedAward") ?? "Not selected";
  const selectedSash = searchParams.get("selectedSash") ?? "Not selected";
  const features = splitValues(searchParams.get("features"));

  const whatsappHref = useMemo(() => {
    const whatsappNumber = "201011288807";
    const message =
      mode === "event"
        ? [
            "Hello, I want to book an event.",
            "",
            `Service: ${serviceName}`,
            `Category: ${categoryName}`,
            `Plan: ${planName}`,
            "",
            "Selected Products:",
            `- Award: ${selectedAward}`,
            `- Sash: ${selectedSash}`,
            "",
            "Quantity:",
            ...(selectedItems.length > 0
              ? selectedItems.map((item) => `- ${item} x ${quantities[item] ?? 1}`)
              : ["- No specific item selected"]),
            "",
            "Please contact me with more details."
          ].join("\n")
        : [
            "Hello, I want to order products from the gallery.",
            "",
            "Selected Items:",
            ...(selectedLineItems.length > 0 ? selectedLineItems.map((item) => `- ${item}`) : ["- No items selected"]),
            "",
            "Please send pricing and order details."
          ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [
    categoryName,
    mode,
    planName,
    quantities,
    selectedAward,
    selectedItems,
    selectedLineItems,
    selectedSash,
    serviceName
  ]);

  return (
    <section className="section-spacing pt-36 sm:pt-40">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="card-surface p-8 sm:p-10">
            <p className="eyebrow">Contact options</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {mode === "event" ? "Booking request ready." : "Order request ready."}
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-white/65">
              Send your request through WhatsApp with all selected items and quantities.
            </p>
            <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              <p>✅ Selection summary is prepared for WhatsApp.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={whatsappHref}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark"
              >
                📱 WhatsApp
              </Link>
            </div>
          </div>

          <aside className="card-surface p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-white/45">Request summary</p>
            {mode === "event" ? <h2 className="mt-4 text-2xl font-semibold text-white">{planName}</h2> : null}
            {mode === "event" ? (
              <p className="mt-2 text-sm text-white/60">
                {serviceName} • {categoryName}
              </p>
            ) : null}
            {mode === "event" && features.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/72">
                {features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 text-sm text-white/70">
              Attached products: <span className="text-white">{selectedItems.length}</span>
            </p>
            {mode === "event" ? (
              <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/70">
                <p>Award: <span className="text-white">{selectedAward}</span></p>
                <p>Sash: <span className="text-white">{selectedSash}</span></p>
              </div>
            ) : null}
            <div className="mt-3 max-h-48 space-y-2 overflow-auto pr-1 text-xs text-white/60">
              {(selectedLineItems.length > 0 ? selectedLineItems : selectedItems).length > 0 ? (
                (selectedLineItems.length > 0 ? selectedLineItems : selectedItems).map((item) => (
                  <p key={item} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    {item}
                  </p>
                ))
              ) : (
                <p>No specific gallery products selected.</p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export default function ContactOptionsPage() {
  return (
    <Suspense
      fallback={
        <section className="section-spacing pt-36 sm:pt-40">
          <Container>
            <div className="card-surface p-8 text-white/70">Loading contact options...</div>
          </Container>
        </section>
      }
    >
      <ContactOptionsContent />
    </Suspense>
  );
}
