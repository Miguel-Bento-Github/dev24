import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("css-doodle"),
        },
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "dev24",
        short_name: "dev24",
        description: "dev24 landing page",
        theme_color: "#f1f1f1",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  build: {
    // Vite 8 defaults to "baseline-widely-available" (chrome111/safari16.4),
    // which raises the browser floor and rewrites media queries into Level 4
    // range syntax. Pin the target Vite 2 shipped with so the deployed output
    // keeps supporting the same browsers it did before the upgrade.
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
  },
  server: {
    port: 3729,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
