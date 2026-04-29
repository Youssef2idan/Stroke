"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryCategory } from "@/lib/gallery";

type SelectedPlan = {
  serviceSlug: string;
  categorySlug: string;
  planSlug: string;
  planName: string;
  categoryName: string;
  serviceName: string;
  features: string[];
};

type GalleryPageProps = {
  categories: GalleryCategory[];
  selectedPlan: SelectedPlan | null;
  initialSelectedItems?: string[];
};

type GalleryImageItem = {
  id: string;
  src: string;
  name: string;
  title: string;
  description?: string;
  tags: string[];
  subcategoryLabel: string;
  subcategorySlug: string;
};

const SELECTED_ITEMS_STORAGE_KEY = "stroke-gallery-selected-items";
const FLOW_STATE_STORAGE_KEY = "stroke-gallery-flow-state";
const FLOW_STEPS_EVENT = ["plan", "awards", "sashes", "contact"] as const;
const FLOW_STEPS_SHOPPING = ["gallery", "contact"] as const;
type StepKey = (typeof FLOW_STEPS_EVENT)[number] | (typeof FLOW_STEPS_SHOPPING)[number];

type FlowState = {
  activeStep: StepKey;
  planConfirmed: boolean;
  awardId: string | null;
  sashId: string | null;
  shoppingItemIds: string[];
  quantities: Record<string, number>;
};

function toSelectedLabel(image: GalleryImageItem | null) {
  if (!image) {
    return "Not selected";
  }
  return `${image.subcategoryLabel} - ${image.title}`;
}

export function GalleryPage({ categories, selectedPlan, initialSelectedItems = [] }: GalleryPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const mode = selectedPlan ? "event" : "shopping";
  const flowSteps = useMemo<StepKey[]>(
    () => (mode === "event" ? [...FLOW_STEPS_EVENT] : [...FLOW_STEPS_SHOPPING]),
    [mode]
  );
  const [flowState, setFlowState] = useState<FlowState>({
    activeStep: mode === "event" ? "plan" : "gallery",
    planConfirmed: mode !== "event",
    awardId: null,
    sashId: null,
    shoppingItemIds: [],
    quantities: {}
  });
  const [lightboxImage, setLightboxImage] = useState<GalleryImageItem | null>(null);
  const [loadedImageIds, setLoadedImageIds] = useState<string[]>([]);
  const [brokenImageIds, setBrokenImageIds] = useState<string[]>([]);

  const categoryMap = useMemo(() => {
    return categories.reduce<Record<string, GalleryCategory>>((acc, category) => {
      acc[category.slug] = category;
      return acc;
    }, {});
  }, [categories]);

  const awardsCategory = categoryMap.awards ?? null;
  const sashesCategory = categoryMap.sashes ?? null;
  const clothingCategory = categoryMap.clothing ?? null;

  const flattenedCategoryImages = (category: GalleryCategory | null) => {
    if (!category) {
      return [];
    }
    return category.subcategories.flatMap((subcategory) =>
      subcategory.images.map((image) => ({
        ...image,
        subcategoryLabel: subcategory.label,
        subcategorySlug: subcategory.slug
      }))
    );
  };

  const awardImages = useMemo(() => flattenedCategoryImages(awardsCategory), [awardsCategory]);
  const sashImages = useMemo(() => flattenedCategoryImages(sashesCategory), [sashesCategory]);
  const clothingImages = useMemo(() => flattenedCategoryImages(clothingCategory), [clothingCategory]);
  const allShoppingImages = useMemo(() => [...awardImages, ...sashImages, ...clothingImages], [awardImages, sashImages, clothingImages]);

  const imageMap = useMemo(() => {
    const allImages = [...awardImages, ...sashImages, ...clothingImages];
    return allImages.reduce<Record<string, GalleryImageItem>>((acc, image) => {
      acc[image.id] = image;
      return acc;
    }, {});
  }, [awardImages, sashImages, clothingImages]);

  useEffect(() => {
    const initialAward = initialSelectedItems.find((id) => id.startsWith("awards/")) ?? null;
    const initialSash = initialSelectedItems.find((id) => id.startsWith("sashes/")) ?? null;
    const initialShopping = initialSelectedItems;

    try {
      const savedStateRaw = window.localStorage.getItem(FLOW_STATE_STORAGE_KEY);
      if (savedStateRaw) {
        const savedState = JSON.parse(savedStateRaw) as FlowState;
        const validActiveStep =
          mode === "event"
            ? (FLOW_STEPS_EVENT.includes(savedState.activeStep as (typeof FLOW_STEPS_EVENT)[number])
                ? (savedState.activeStep as (typeof FLOW_STEPS_EVENT)[number])
                : "plan")
            : (FLOW_STEPS_SHOPPING.includes(savedState.activeStep as (typeof FLOW_STEPS_SHOPPING)[number])
                ? (savedState.activeStep as (typeof FLOW_STEPS_SHOPPING)[number])
                : "gallery");

        setFlowState({
          activeStep: validActiveStep,
          planConfirmed: mode === "event" ? Boolean(savedState.planConfirmed) : true,
          awardId: savedState.awardId,
          sashId: savedState.sashId,
          shoppingItemIds: Array.isArray(savedState.shoppingItemIds) ? savedState.shoppingItemIds : initialShopping,
          quantities: savedState.quantities ?? {}
        });
        return;
      }
    } catch {
      // Ignore malformed payload and continue with initial URL state.
    }

    setFlowState((current) => ({
      ...current,
      awardId: initialAward,
      sashId: initialSash,
      shoppingItemIds: initialShopping
    }));
  }, [flowSteps, initialSelectedItems, mode]);

  useEffect(() => {
    const selectedIds =
      mode === "event"
        ? [flowState.awardId, flowState.sashId].filter((item): item is string => Boolean(item))
        : flowState.shoppingItemIds;
    window.localStorage.setItem(SELECTED_ITEMS_STORAGE_KEY, JSON.stringify(selectedIds));
    window.localStorage.setItem(FLOW_STATE_STORAGE_KEY, JSON.stringify(flowState));
  }, [flowState, mode]);

  useEffect(() => {
    const selectedIds = [flowState.awardId, flowState.sashId, ...flowState.shoppingItemIds].filter(
      (item): item is string => Boolean(item)
    );
    if (flowState.awardId && !imageMap[flowState.awardId]) {
      setFlowState((current) => ({ ...current, awardId: null }));
    }
    if (flowState.sashId && !imageMap[flowState.sashId]) {
      setFlowState((current) => ({ ...current, sashId: null }));
    }
    if (flowState.shoppingItemIds.some((id) => !imageMap[id])) {
      setFlowState((current) => ({
        ...current,
        shoppingItemIds: current.shoppingItemIds.filter((id) => Boolean(imageMap[id]))
      }));
    }
    if (Object.keys(flowState.quantities).some((id) => !selectedIds.includes(id))) {
      setFlowState((current) => {
        const nextQuantities: Record<string, number> = {};
        for (const id of selectedIds) {
          nextQuantities[id] = Math.max(1, current.quantities[id] ?? 1);
        }
        return { ...current, quantities: nextQuantities };
      });
    }
  }, [flowState.awardId, flowState.quantities, flowState.sashId, flowState.shoppingItemIds, imageMap]);

  const awardSelection = flowState.awardId ? imageMap[flowState.awardId] : null;
  const sashSelection = flowState.sashId ? imageMap[flowState.sashId] : null;
  const shoppingSelections = flowState.shoppingItemIds.map((id) => imageMap[id]).filter(Boolean);

  const contactHref = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedPlan) {
      params.set("service", selectedPlan.serviceName);
      params.set("category", selectedPlan.categoryName);
      params.set("plan", selectedPlan.planName);
      params.set("serviceSlug", selectedPlan.serviceSlug);
      params.set("categorySlug", selectedPlan.categorySlug);
      params.set("planSlug", selectedPlan.planSlug);
      params.set("features", selectedPlan.features.join("||"));
    }
    params.set("selectedAward", awardSelection ? `${awardSelection.subcategoryLabel} - ${awardSelection.title}` : "");
    params.set("selectedSash", sashSelection ? `${sashSelection.subcategoryLabel} - ${sashSelection.title}` : "");

    const selectedItems =
      mode === "event"
        ? [awardSelection?.id, sashSelection?.id].filter((item): item is string => Boolean(item))
        : shoppingSelections.map((item) => item.id);

    const quantityPairs = selectedItems.map((id) => `${id}:${flowState.quantities[id] ?? 1}`);
    params.set("mode", mode);
    if (quantityPairs.length > 0) {
      params.set("quantities", quantityPairs.join("||"));
    }
    if (selectedItems.length > 0) {
      params.set(
        "selectedLineItems",
        selectedItems.map((id) => `${imageMap[id]?.subcategoryLabel} - ${imageMap[id]?.title} x${flowState.quantities[id] ?? 1}`).join("||")
      );
    }
    if (selectedItems.length > 0) {
      params.set("selectedItems", selectedItems.join("||"));
    }

    return `/contact-options?${params.toString()}`;
  }, [awardSelection, flowState.quantities, imageMap, mode, sashSelection, selectedPlan, shoppingSelections]);

  function setStep(step: StepKey) {
    setFlowState((current) => ({ ...current, activeStep: step }));
  }

  function goNext() {
    const currentIndex = flowSteps.indexOf(flowState.activeStep);
    const next = flowSteps[currentIndex + 1];
    if (next) {
      setStep(next);
    }
  }

  function goBack() {
    const currentIndex = flowSteps.indexOf(flowState.activeStep);
    const previous = flowSteps[currentIndex - 1];
    if (previous) {
      setStep(previous);
    }
  }

  function isStepDone(step: StepKey) {
    if (step === "plan") return flowState.planConfirmed;
    if (step === "awards") return Boolean(flowState.awardId);
    if (step === "sashes") return Boolean(flowState.sashId);
    if (step === "gallery") return flowState.shoppingItemIds.length > 0;
    return false;
  }

  function selectAward(id: string) {
    setFlowState((current) => ({ ...current, awardId: id }));
  }

  function selectSash(id: string) {
    setFlowState((current) => ({ ...current, sashId: id }));
  }

  function toggleShoppingItem(id: string) {
    setFlowState((current) => ({
      ...current,
      shoppingItemIds: current.shoppingItemIds.includes(id)
        ? current.shoppingItemIds.filter((item) => item !== id)
        : [...current.shoppingItemIds, id],
      quantities: {
        ...current.quantities,
        [id]: current.shoppingItemIds.includes(id) ? 1 : Math.max(1, current.quantities[id] ?? 1)
      }
    }));
  }

  function updateQuantity(id: string, quantity: number) {
    setFlowState((current) => ({
      ...current,
      quantities: {
        ...current.quantities,
        [id]: Math.max(1, quantity)
      }
    }));
  }

  function handleConfirmPlan() {
    setFlowState((current) => ({ ...current, planConfirmed: true, activeStep: "awards" }));
  }

  function handleContinueToContact() {
    startTransition(() => {
      router.push(contactHref);
    });
  }

  const progressValue = ((flowSteps.indexOf(flowState.activeStep) + 1) / flowSteps.length) * 100;
  const cartCount = mode === "event" ? [flowState.awardId, flowState.sashId].filter(Boolean).length : flowState.shoppingItemIds.length;

  return (
    <div className="space-y-8">
      <div className="card-surface p-7 sm:p-8">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Premium gallery for graduation booking and direct shopping.
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-white/65">
          {mode === "event"
            ? "Plan → Awards → Sashes → Contact."
            : "Gallery → Select Items → Quantity → Contact."}{" "}
          Categories and images are discovered from folders automatically.
        </p>
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between text-xs text-white/60">
            <span>Step {flowSteps.indexOf(flowState.activeStep) + 1} of {flowSteps.length}</span>
            <span>{Math.round(progressValue)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: `${progressValue}%` }} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {flowSteps.map((step) => (
              <span
                key={step}
                className={`rounded-full border px-3 py-1 ${
                  flowState.activeStep === step
                    ? "border-accent bg-accent/20 text-white"
                    : isStepDone(step)
                      ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-100"
                      : "border-white/20 text-white/55"
                }`}
              >
                {step === "plan" && "Plan"}
                {step === "awards" && "Awards"}
                {step === "sashes" && "Sashes"}
                {step === "gallery" && "Gallery"}
                {step === "contact" && "Contact"}
              </span>
            ))}
          </div>
        </div>
      </div>

      {mode === "event" && flowState.activeStep === "plan" ? (
        <div className="card-surface p-7 sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">Step 1 - Confirm plan</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">{selectedPlan?.planName}</h2>
          <p className="mt-2 text-sm text-white/60">
            {selectedPlan?.serviceName} • {selectedPlan?.categoryName}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/72">
            {(selectedPlan?.features ?? []).slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleConfirmPlan}
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              Confirm Plan
            </button>
            <Link
              href={`/services/${selectedPlan?.serviceSlug}/${selectedPlan?.categorySlug}/${selectedPlan?.planSlug}`}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/85 transition hover:border-white/40"
            >
              Back to plan details
            </Link>
          </div>
        </div>
      ) : null}

      {mode === "event" && flowState.activeStep === "awards" ? (
        <div className="space-y-6">
          <div className="card-surface p-7">
            <p className="text-sm uppercase tracking-[0.3em] text-white/45">Step 2 - Awards</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Choose one award</h2>
          </div>
          <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {awardImages.map((image) => {
                const isSelected = flowState.awardId === image.id;
                const isLoaded = loadedImageIds.includes(image.id);
                const isBroken = brokenImageIds.includes(image.id);

                return (
                  <motion.article
                    key={image.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-black/40">
                      {!isLoaded ? <div className="absolute inset-0 animate-pulse bg-white/10" /> : null}
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain transition duration-500 group-hover:scale-105"
                        onLoad={() =>
                          setLoadedImageIds((current) =>
                            current.includes(image.id) ? current : [...current, image.id]
                          )
                        }
                        onError={() => {
                          setLoadedImageIds((current) =>
                            current.includes(image.id) ? current : [...current, image.id]
                          );
                          setBrokenImageIds((current) =>
                            current.includes(image.id) ? current : [...current, image.id]
                          );
                        }}
                      />
                      {isBroken ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-sm text-white/75">
                          Image unavailable
                        </div>
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20 opacity-0 transition group-hover:opacity-100" />
                      <button
                        type="button"
                        onClick={() => setLightboxImage(image)}
                        className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/50 px-3 py-1 text-xs text-white/85 opacity-0 transition group-hover:opacity-100"
                      >
                        View
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm text-white">{image.title}</p>
                        <p className="text-xs text-white/55">{image.subcategoryLabel}</p>
                        {image.description ? (
                          <p className="mt-1 line-clamp-2 text-xs text-white/50">{image.description}</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => selectAward(image.id)}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          isSelected
                            ? "border-accent bg-accent/20 text-white"
                            : "border-white/20 text-white/80 hover:text-white"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>
                    {isSelected ? (
                      <span className="absolute left-3 top-3 rounded-full border border-accent/60 bg-accent/25 px-3 py-1 text-xs text-white">
                        Selected
                      </span>
                    ) : null}
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {awardImages.length === 0 ? (
            <div className="card-surface p-8 text-center text-white/65">No items yet in this folder.</div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/85 transition hover:border-white/40"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!flowState.awardId}
              onClick={goNext}
              className="rounded-full border border-accent bg-accent px-6 py-2 text-sm font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      {mode === "event" && flowState.activeStep === "sashes" ? (
        <div className="space-y-6">
          <div className="card-surface p-7">
            <p className="text-sm uppercase tracking-[0.3em] text-white/45">Step 3 - Sashes</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Choose one sash design</h2>
          </div>
          <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {sashImages.map((image) => {
                const isSelected = flowState.sashId === image.id;
                return (
                  <motion.article
                    key={image.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-black/40">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain transition duration-500 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => setLightboxImage(image)}
                        className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/50 px-3 py-1 text-xs text-white/85 opacity-0 transition group-hover:opacity-100"
                      >
                        View
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm text-white">{image.title}</p>
                        <p className="text-xs text-white/55">{image.subcategoryLabel}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => selectSash(image.id)}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          isSelected
                            ? "border-accent bg-accent/20 text-white"
                            : "border-white/20 text-white/80 hover:text-white"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {sashImages.length === 0 ? (
            <div className="card-surface p-8 text-center text-white/65">No sash items found in `/public/assets/sashes`.</div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/85 transition hover:border-white/40"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!flowState.sashId}
              onClick={goNext}
              className="rounded-full border border-accent bg-accent px-6 py-2 text-sm font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      {mode === "shopping" && flowState.activeStep === "gallery" ? (
        <div className="space-y-6">
          <div className="card-surface p-7">
            <p className="text-sm uppercase tracking-[0.3em] text-white/45">Shopping mode</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Select products and quantity</h2>
          </div>
          <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {allShoppingImages.map((image) => {
                const isSelected = flowState.shoppingItemIds.includes(image.id);
                const quantity = flowState.quantities[image.id] ?? 1;
                return (
                  <motion.article
                    key={image.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-black/40">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain transition duration-500 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => setLightboxImage(image)}
                        className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/50 px-3 py-1 text-xs text-white/85 opacity-0 transition group-hover:opacity-100"
                      >
                        View
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm text-white">{image.title}</p>
                        <p className="text-xs text-white/55">{image.subcategoryLabel}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleShoppingItem(image.id)}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          isSelected
                            ? "border-accent bg-accent/20 text-white"
                            : "border-white/20 text-white/80 hover:text-white"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(image.id, quantity - 1)}
                          className="h-7 w-7 rounded-full border border-white/20 text-white"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={(event) => updateQuantity(image.id, Number(event.target.value || 1))}
                          className="w-14 rounded-md border border-white/20 bg-transparent px-2 py-1 text-center text-sm text-white"
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(image.id, quantity + 1)}
                          className="h-7 w-7 rounded-full border border-white/20 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {allShoppingImages.length === 0 ? (
            <div className="card-surface p-8 text-center text-white/65">
              No products found in the gallery folders yet.
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={flowState.shoppingItemIds.length === 0}
              onClick={goNext}
              className="rounded-full border border-accent bg-accent px-6 py-2 text-sm font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}

      {flowState.activeStep === "contact" ? (
        <div className="card-surface p-7 sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            Step {flowSteps.indexOf(flowState.activeStep) + 1} - Contact options
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Your booking summary is ready</h2>
          <p className="mt-3 text-white/70">
            Send this customized request through WhatsApp with all selections prefilled.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/85 transition hover:border-white/40"
            >
              Back
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={handleContinueToContact}
              className="rounded-full border border-accent bg-accent px-6 py-2 text-sm font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Redirecting..." : "Continue to Contact"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-5 right-5 z-40 w-[min(92vw,360px)]">
        <div className="rounded-2xl border border-accent/30 bg-black/90 p-4 text-sm text-white shadow-glow">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/55">Selection summary</p>
          <div className="space-y-1 text-white/85">
            {mode === "event" ? (
              <>
                <p>Plan: {selectedPlan?.planName}</p>
                <p>Award: {toSelectedLabel(awardSelection)}</p>
                <p>Sash: {toSelectedLabel(sashSelection)}</p>
              </>
            ) : (
              <>
                <p>Cart items: {cartCount}</p>
                <p>
                  Quantity total:{" "}
                  {flowState.shoppingItemIds.reduce((total, id) => total + (flowState.quantities[id] ?? 1), 0)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="relative h-[75vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image src={lightboxImage.src} alt={lightboxImage.title} fill className="object-contain bg-black" />
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/65 px-3 py-1 text-sm text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
