export function createPageUrl(page) {
  if (!page) return "/";
  const slug = page.toLowerCase();
  if (slug === "home") return "/";
  return `/${slug}`;
} 