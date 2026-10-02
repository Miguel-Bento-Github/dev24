declare module "vue-router" {
  interface RouteMeta {
    title: string;
    description: string;
    /** keeps the page out of search results and the sitemap */
    noindex?: boolean;
  }
}

export const routes = [
  {
    path: "/",
    name: "Work",
    component: () => import("@/views/WorkView.vue"),
    meta: {
      title: "Dev24 | Custom websites and web apps, built in Utrecht",
      description:
        "Dev24 builds custom websites, web apps and software from Utrecht, the Netherlands. No templates, no shortcuts. Recent work: Commuty, Adopt a Plant, Vale.",
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy",
    component: () => import("@/views/PrivacyPolicy.vue"),
    meta: {
      title: "Privacy Policy | Dev24",
      description:
        "This website uses cookies. We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.",
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/NotFoundView.vue"),
    meta: {
      title: "Page not found | Dev24",
      description: "Page not found.",
      noindex: true,
    },
  },
];
export const routeNames = routes.map((route) => route.name);
