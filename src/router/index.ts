import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  queueMicrotask(() => {
    if (typeof to.meta.title === "string") {
      document.title = to.meta.title;
    }
  });
});

export default router;
