export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "Dev24",
      metaTags: [
        {
          name: "description",
          content: "The home page in our app.",
        },
      ],
    },
  },
  {
    path: "/work",
    name: "Work",
    component: () => import("@/views/WorkView.vue"),
    meta: {
      title: "Work",
      metaTags: [
        {
          name: "description",
          content: "Some of my web development work.",
        },
      ],
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy",
    component: () => import("@/views/PrivacyPolicy.vue"),
    meta: {
      title: "Privacy Policy",
      metaTags: [
        {
          name: "description",
          content:
            "This website uses cookies. We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.",
        },
      ],
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/NotFoundView.vue"),
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
