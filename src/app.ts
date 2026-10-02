import { createPinia } from "pinia";
import { createApp, createSSRApp } from "vue";
import type { Router } from "vue-router";
import App from "./App.vue";

/**
 * `hydrate` picks up prerendered markup instead of rendering from scratch. The
 * prerender itself needs it too, so the markup carries the hydration markers.
 */
export const buildApp = (router: Router, hydrate: boolean) => {
  const app = hydrate ? createSSRApp(App) : createApp(App);

  app.use(createPinia());
  app.use(router);

  return app;
};
