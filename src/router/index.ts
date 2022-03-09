import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

router.afterEach((to) => {
  queueMicrotask(() => {
    if (typeof to.meta.title === "string") {
      document.title = to.meta.title;
    }
  });
});

export const registerPWA = () => {
  const register = async () => {
    const { registerSW } = await import("virtual:pwa-register");
    registerSW();
  };
  router.isReady().then(register);
};

export default router;
