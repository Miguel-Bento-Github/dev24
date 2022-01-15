export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "Home",
      metaTags: [
        {
          name: "description",
          content: "The home page in our app.",
        },
      ],
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "AboutView" */ "@/views/AboutView.vue"),
    meta: {
      title: "About",
      metaTags: [
        {
          name: "description",
          content: "About page with content about the company.",
        },
      ],
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "NotFoundView" */ "@/views/NotFoundView.vue"),
    meta: {
      title: "404",
      metaTags: [
        {
          name: "description",
          content: "Page not found.",
        },
      ],
    },
  },
];
export const routeNames = routes.map((route) => route.name);
