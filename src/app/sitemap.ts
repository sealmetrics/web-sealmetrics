import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content/blog";
import { publishedChapters } from "@/lib/content/open";
import { EN_ROOT, ES_ROOT, sitemapRoutes } from "@/lib/seo/routes";

export const dynamic = "force-static";

const SITE = "https://sealmetrics.com";
const today = new Date().toISOString().split("T")[0];

// blog post slug → the dates that decide <lastmod>. `lastmod` means last
// MODIFIED, so a revised post reports its revision, not its publication. Until
// the revision date moved into the registry it lived inside each page's
// articleSchema() call, invisible from here, and the sitemap under-reported
// freshness on all 19 revised posts.
const blogDates = new Map(blogPosts.map((p) => [p.slug, p]));

function enUrl(p: string): string {
  return p === "/" ? `${SITE}/` : `${SITE}${p}/`;
}
function esUrl(p: string): string {
  return p === "/" ? `${SITE}/es/` : `${SITE}/es${p}/`;
}

function lastModFor(route: string, locale: "en" | "es" = "en"): string {
  const m = route.match(/^\/blog\/(.+)$/);
  if (m) {
    const post = blogDates.get(m[1]);
    if (post) {
      const modified =
        locale === "es" ? post.dateModifiedEs ?? post.dateModified : post.dateModified;
      return modified ?? (locale === "es" ? post.dateEs ?? post.date : post.date);
    }
  }
  return today;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Indexability is derived from each page's own `robots` metadata — see
  // src/lib/seo/routes.ts. Adding a `noindex` page can no longer leak it into
  // the sitemap, and removing one no longer requires editing two places.
  const enRoutes = sitemapRoutes(EN_ROOT);
  const esRoutes = sitemapRoutes(ES_ROOT);

  // Expand dynamic [slug] routes. /open/[slug] is EN-only today.
  for (const c of publishedChapters) {
    enRoutes.push(`/open/${c.slug}`);
  }

  const esSet = new Set(esRoutes);
  const enSet = new Set(enRoutes);

  const entries: MetadataRoute.Sitemap = [];

  // Bilingual: present in both locales → emit both URLs with hreflang.
  for (const route of enRoutes) {
    if (!esSet.has(route)) continue;
    const enHref = enUrl(route);
    const esHref = esUrl(route);
    const languages = { en: enHref, es: esHref, "x-default": enHref };
    entries.push({
      url: enHref,
      lastModified: lastModFor(route),
      alternates: { languages },
    });
    entries.push({
      url: esHref,
      lastModified: lastModFor(route, "es"),
      alternates: { languages },
    });
  }

  // EN-only
  for (const route of enRoutes) {
    if (esSet.has(route)) continue;
    entries.push({ url: enUrl(route), lastModified: lastModFor(route) });
  }

  // ES-only
  for (const route of esRoutes) {
    if (enSet.has(route)) continue;
    entries.push({ url: esUrl(route), lastModified: lastModFor(route, "es") });
  }

  return entries;
}
