import { services } from "@/data/services";

export function getServiceBySlug(serviceSlug: string) {
  return services.find((service) => service.slug === serviceSlug) ?? null;
}

export function getCategoryBySlug(serviceSlug: string, categorySlug: string) {
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return null;
  }

  return service.categories.find((category) => category.slug === categorySlug) ?? null;
}

export function getPlanBySlug(serviceSlug: string, categorySlug: string, planSlug: string) {
  const category = getCategoryBySlug(serviceSlug, categorySlug);

  if (!category) {
    return null;
  }

  return category.plans.find((plan) => plan.slug === planSlug) ?? null;
}

export function getAllServiceParams() {
  return services.map((service) => ({ serviceSlug: service.slug }));
}

export function getAllCategoryParams() {
  return services.flatMap((service) =>
    service.categories.map((category) => ({
      serviceSlug: service.slug,
      categorySlug: category.slug
    }))
  );
}

export function getAllPlanParams() {
  return services.flatMap((service) =>
    service.categories.flatMap((category) =>
      category.plans.map((plan) => ({
        serviceSlug: service.slug,
        categorySlug: category.slug,
        planSlug: plan.slug
      }))
    )
  );
}
