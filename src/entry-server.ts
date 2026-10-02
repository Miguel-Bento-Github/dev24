import { renderToString } from "vue/server-renderer";
import { buildApp } from "./app";
import { createAppRouter } from "./router";
import { routes } from "./router/routes";
import { renderSeoTags, seoFor, SITE_URL } from "./seo";

export { SITE_URL };

/** Every route as a static file. The catch-all becomes the host's 404 page. */
export const pages = routes.map(({ path, meta }) => {
  const isCatchAll = path.includes(":");

  return {
    url: isCatchAll ? "/404" : path,
    file: isCatchAll
      ? "404.html"
      : path === "/"
        ? "index.html"
        : `${path.slice(1)}.html`,
    inSitemap: !meta.noindex,
  };
});

export const render = async (url: string) => {
  const router = createAppRouter();
  const app = buildApp(router, true);

  await router.push(url);
  await router.isReady();

  const route = router.currentRoute.value;

  return {
    appHtml: await renderToString(app),
    headTags: renderSeoTags(seoFor(route)),
    routeName: String(route.name),
  };
};
