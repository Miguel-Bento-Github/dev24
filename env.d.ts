/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// json-module.d.ts
declare module "*.json" {
  const data: unknown;
  export default data;
}

declare interface Window {
  CookieFirst: {
    consent: {
      necessary: boolean;
      performance: boolean;
      functional: boolean;
      advertising: boolean;
    };
  };
}
