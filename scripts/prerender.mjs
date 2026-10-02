// Renders every route to a static HTML file once the client and server builds
// are done, so the content is in the page itself and not only in the script.
// Crawlers that do not run JavaScript would otherwise get an empty shell.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const { pages, render, SITE_URL } = await import(
  new URL("../dist-ssr/entry-server.mjs", import.meta.url).href
);

const SEO_BLOCK = /<!--seo-->[\s\S]*<!--\/seo-->/;
const APP_SLOT = 'id="app"><!--app-->';

const template = await readFile(new URL("index.html", dist), "utf8");

if (!SEO_BLOCK.test(template) || !template.includes(APP_SLOT)) {
  throw new Error("index.html is missing the <!--seo--> or <!--app--> marker");
}

for (const { url, file } of pages) {
  const { appHtml, headTags, routeName } = await render(url);

  // function replacements, so a "$" in the markup is not read as a pattern
  const html = template
    .replace(SEO_BLOCK, () => headTags)
    .replace(
      APP_SLOT,
      () => `id="app" data-prerendered="${routeName}">${appHtml}`
    );

  const target = new URL(file, dist);
  await mkdir(new URL("./", target), { recursive: true });
  await writeFile(target, html);
  console.log(`prerendered ${url} -> dist/${file}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter(({ inSitemap }) => inSitemap)
  .map(({ url }) => `  <url><loc>${SITE_URL}${url}</loc></url>`)
  .join("\n")}
</urlset>
`;

await writeFile(new URL("sitemap.xml", dist), sitemap);
console.log("wrote dist/sitemap.xml");
