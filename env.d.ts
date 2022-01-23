/// <reference types="vite/client" />

// json-module.d.ts
declare module "*.json" {
  const data: unknown;
  export default data;
}
