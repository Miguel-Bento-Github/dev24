import type { RouteLocationNormalized } from "vue-router";

export const SITE_URL = "https://www.dev24.net";

type Seo = {
  title: string;
  description: string;
  /** absent for pages that should stay out of search results */
  canonical?: string;
};

export const seoFor = ({
  path,
  meta,
}: Pick<RouteLocationNormalized, "path" | "meta">): Seo => ({
  title: meta.title,
  description: meta.description,
  // "/privacy-policy/" and "/privacy-policy" are the same page
  canonical: meta.noindex
    ? undefined
    : `${SITE_URL}${path.replace(/(.)\/$/, "$1")}`,
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** The head tags for a page, as markup for the prerendered HTML. */
export const renderSeoTags = ({ title, description, canonical }: Seo) =>
  [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    canonical
      ? `<link rel="canonical" href="${escapeHtml(canonical)}" />`
      : `<meta name="robots" content="noindex" />`,
    canonical && `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  ]
    .filter(Boolean)
    .join("\n    ");

const upsert = (selector: string, create: () => HTMLElement) => {
  const existing = document.head.querySelector<HTMLElement>(selector);
  if (existing) return existing;

  const element = create();
  document.head.appendChild(element);
  return element;
};

const setMeta = (attribute: "name" | "property", key: string, content: string) => {
  const meta = upsert(`meta[${attribute}="${key}"]`, () => {
    const element = document.createElement("meta");
    element.setAttribute(attribute, key);
    return element;
  });
  meta.setAttribute("content", content);
};

const remove = (selector: string) =>
  document.head.querySelector(selector)?.remove();

/** Keeps the head tags in step with the route on client-side navigation. */
export const applySeo = ({ title, description, canonical }: Seo) => {
  document.title = title;
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);

  if (!canonical) {
    remove('link[rel="canonical"]');
    remove('meta[property="og:url"]');
    setMeta("name", "robots", "noindex");
    return;
  }

  remove('meta[name="robots"]');
  setMeta("property", "og:url", canonical);
  upsert('link[rel="canonical"]', () => {
    const link = document.createElement("link");
    link.rel = "canonical";
    return link;
  }).setAttribute("href", canonical);
};
