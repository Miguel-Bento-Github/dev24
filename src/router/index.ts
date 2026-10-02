import { applySeo, seoFor } from "@/seo";
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type Router,
} from "vue-router";
import { routes } from "./routes";

export const createAppRouter = () => {
  const router = createRouter({
    // the prerender runs in Node, where there is no browser history to wrap
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior({ hash }, from, saved) {
      if (hash) {
        return {
          el: hash,
        };
      } else if (saved) {
        return saved;
      } else {
        return { top: 0 };
      }
    },
  });

  if (!import.meta.env.SSR) {
    router.afterEach((to) => {
      queueMicrotask(() => applySeo(seoFor(to)));
    });
  }

  return router;
};

export const registerPWA = (router: Router) => {
  const register = async () => {
    const { registerSW } = await import("virtual:pwa-register");
    registerSW();
  };
  router.isReady().then(register);
};
