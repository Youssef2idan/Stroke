import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { GalleryPage } from "@/components/gallery-page";
import { getGalleryData } from "@/lib/gallery";
import { getCategoryBySlug, getPlanBySlug, getServiceBySlug } from "@/lib/services";

type GalleryPageProps = {
  searchParams?: {
    service?: string;
    category?: string;
    plan?: string;
    selectedItems?: string;
  };
};

export const metadata: Metadata = {
  title: "Gallery",
  description: "Dynamic product gallery for awards, sashes, and future categories connected to Stroke plans."
};

function parsePipeSeparated(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function GalleryRoute({ searchParams }: GalleryPageProps) {
  const categories = await getGalleryData();
  const serviceSlug = searchParams?.service;
  const categorySlug = searchParams?.category;
  const planSlug = searchParams?.plan;
  const initialSelectedItems = parsePipeSeparated(searchParams?.selectedItems);

  const service = serviceSlug ? getServiceBySlug(serviceSlug) : null;
  const category = serviceSlug && categorySlug ? getCategoryBySlug(serviceSlug, categorySlug) : null;
  const plan = serviceSlug && categorySlug && planSlug ? getPlanBySlug(serviceSlug, categorySlug, planSlug) : null;

  const hasAnyPlanQuery = Boolean(serviceSlug || categorySlug || planSlug);
  if (hasAnyPlanQuery && (!serviceSlug || !categorySlug || !planSlug || !service || !category || !plan)) {
    redirect("/services");
  }

  const selectedPlan =
    service && category && plan
      ? {
          serviceSlug: service.slug,
          categorySlug: category.slug,
          planSlug: plan.slug,
          planName: plan.title,
          categoryName: category.title,
          serviceName: service.title,
          features: plan.features
        }
      : null;

  return (
    <section className="section-spacing pt-36 sm:pt-40">
      <Container>
        <GalleryPage
          categories={categories}
          selectedPlan={selectedPlan}
          initialSelectedItems={initialSelectedItems}
        />
      </Container>
    </section>
  );
}
