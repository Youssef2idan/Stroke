import fs from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";
import { unstable_cache } from "next/cache";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".jfif"]);
const PUBLIC_ASSETS_ROOT = path.join(process.cwd(), "public", "assets");
const IGNORED_ROOT_ENTRIES = new Set(["favicon", "icons", "site.webmanifest", "browserconfig"]);
const ROOT_CATEGORY_ALIASES: Record<string, string> = {
  clothes: "clothing"
};
const CATEGORY_ORDER = ["awards", "sashes", "clothing"];

type ImageMeta = {
  title?: string;
  description?: string;
  tags?: string[];
};

type FolderMeta = {
  images?: Record<string, ImageMeta>;
};

export type GalleryImage = {
  id: string;
  src: string;
  name: string;
  title: string;
  description?: string;
  tags: string[];
};

export type GallerySubcategory = {
  slug: string;
  label: string;
  images: GalleryImage[];
};

export type GalleryCategory = {
  slug: string;
  label: string;
  subcategories: GallerySubcategory[];
};

function toLabel(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toCategoryLabel(value: string) {
  if (value === "clothing") {
    return "Clothing / الملابس";
  }
  return toLabel(value);
}

function toSingular(word: string) {
  return word.endsWith("s") ? word.slice(0, -1) : word;
}

function getSubcategoryLabel(categorySlug: string, subcategorySlug: string) {
  const base = toLabel(subcategorySlug);
  const categoryBase = toLabel(toSingular(categorySlug));
  return `${base} ${categoryBase}`;
}

function removeExtension(fileName: string) {
  const extension = path.extname(fileName);
  return fileName.slice(0, -extension.length) || fileName;
}

async function readFolderMeta(directoryPath: string): Promise<FolderMeta | null> {
  const metaPath = path.join(directoryPath, "meta.json");
  try {
    const raw = await fs.readFile(metaPath, "utf8");
    return JSON.parse(raw) as FolderMeta;
  } catch {
    return null;
  }
}

async function readImagesFromDirectory(
  directoryPath: string,
  urlBase: string,
  categorySlug: string,
  sourceCategoryFolder: string,
  subcategorySlug: string
) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const folderMeta = await readFolderMeta(directoryPath);

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }))
    .map((entry) => {
      const imageMeta = folderMeta?.images?.[entry.name];
      const baseSrc =
        subcategorySlug === "general"
          ? `${urlBase}/${sourceCategoryFolder}/${entry.name}`
          : `${urlBase}/${sourceCategoryFolder}/${subcategorySlug}/${entry.name}`;
      return {
        id: `${categorySlug}/${subcategorySlug}/${entry.name}`,
        src: baseSrc,
        name: entry.name,
        title: imageMeta?.title ?? toLabel(removeExtension(entry.name)),
        description: imageMeta?.description,
        tags: imageMeta?.tags ?? []
      };
    });
}

async function getGalleryDataFromBasePath(basePath: string, urlBase: string): Promise<GalleryCategory[]> {
  let categoryEntries: Dirent[] = [];

  try {
    categoryEntries = await fs.readdir(basePath, { withFileTypes: true });
  } catch {
    return [];
  }

  const categories = await Promise.all(
    categoryEntries
      .filter((entry) => entry.isDirectory())
      .filter((entry) => !IGNORED_ROOT_ENTRIES.has(entry.name.toLowerCase()))
      .map(async (categoryEntry) => {
        const rawCategorySlug = categoryEntry.name.toLowerCase();
        const categorySlug = ROOT_CATEGORY_ALIASES[rawCategorySlug] ?? rawCategorySlug;
        const categoryPath = path.join(basePath, categoryEntry.name);
        let subcategoryEntries: Dirent[] = [];

        try {
          subcategoryEntries = await fs.readdir(categoryPath, { withFileTypes: true });
        } catch {
          return null;
        }

        const directImages = await readImagesFromDirectory(
          categoryPath,
          urlBase,
          categorySlug,
          categoryEntry.name,
          "general"
        ).catch(() => []);

        const nestedSubcategories: Array<GallerySubcategory | null> = await Promise.all(
          subcategoryEntries
            .filter((entry) => entry.isDirectory())
            .map(async (subcategoryEntry) => {
              const subcategoryPath = path.join(categoryPath, subcategoryEntry.name);
              const images = await readImagesFromDirectory(
                subcategoryPath,
                urlBase,
                categorySlug,
                categoryEntry.name,
                subcategoryEntry.name
              ).catch(() => []);

              return {
                slug: subcategoryEntry.name,
                label: getSubcategoryLabel(categorySlug, subcategoryEntry.name),
                images
              };
            })
        );

        const subcategories: GallerySubcategory[] = [
          ...(directImages.length > 0
            ? [
                {
                  slug: "general",
                  label: `${toLabel(categorySlug)} Collection`,
                  images: directImages
                }
              ]
            : []),
          ...nestedSubcategories.filter((subcategory): subcategory is GallerySubcategory => subcategory !== null)
        ];

        if (subcategories.length === 0) {
          return null;
        }

        return {
          slug: categorySlug,
          label: toCategoryLabel(categorySlug),
          subcategories
        };
      })
  );

  const dedupedCategories = categories
    .filter((category): category is GalleryCategory => Boolean(category))
    .reduce<Record<string, GalleryCategory>>((acc, category) => {
      const existing = acc[category.slug];
      if (!existing) {
        acc[category.slug] = category;
        return acc;
      }

      const mergedSubcategories = [...existing.subcategories];
      for (const subcategory of category.subcategories) {
        const existingSubcategory = mergedSubcategories.find((item) => item.slug === subcategory.slug);
        if (!existingSubcategory) {
          mergedSubcategories.push(subcategory);
          continue;
        }
        const existingIds = new Set(existingSubcategory.images.map((image) => image.id));
        existingSubcategory.images = [
          ...existingSubcategory.images,
          ...subcategory.images.filter((image) => !existingIds.has(image.id))
        ];
      }

      acc[category.slug] = {
        ...existing,
        subcategories: mergedSubcategories
      };
      return acc;
    }, {});

  return Object.values(dedupedCategories).sort((a, b) => {
      const aIndex = CATEGORY_ORDER.indexOf(a.slug);
      const bIndex = CATEGORY_ORDER.indexOf(b.slug);
      const normalizedA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const normalizedB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      if (normalizedA !== normalizedB) {
        return normalizedA - normalizedB;
      }
      return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
    });
}

export async function getGalleryData() {
  return unstable_cache(
    async () => {
      const categories = await getGalleryDataFromBasePath(PUBLIC_ASSETS_ROOT, "/assets");
      const hasSashes = categories.some((category) => category.slug === "sashes");
      const awards = categories.find((category) => category.slug === "awards");
      const legacySashSubcategory = awards?.subcategories.find((subcategory) => subcategory.slug === "sash");

      if (!hasSashes && legacySashSubcategory && legacySashSubcategory.images.length > 0) {
        categories.push({
          slug: "sashes",
          label: "Sashes",
          subcategories: [
            {
              slug: "classic",
              label: "Classic Sash",
              images: legacySashSubcategory.images.map((image) => ({
                ...image,
                id: image.id.replace("awards/sash/", "sashes/classic/")
              }))
            }
          ]
        });
      }

      return categories.sort((a, b) => {
        const aIndex = CATEGORY_ORDER.indexOf(a.slug);
        const bIndex = CATEGORY_ORDER.indexOf(b.slug);
        const normalizedA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
        const normalizedB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
        if (normalizedA !== normalizedB) {
          return normalizedA - normalizedB;
        }
        return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
      });
    },
    ["gallery-data-v2"],
    { revalidate: 300 }
  )();
}
