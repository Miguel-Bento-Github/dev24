import js from "@eslint/js";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";

// Flat config replacement for the old .eslintrc.cjs. It keeps the same four
// layers that file extended: eslint:recommended, plugin:vue/vue3-essential,
// @vue/eslint-config-typescript/recommended and @vue/eslint-config-prettier.
export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}"],
  },
  {
    name: "app/files-to-ignore",
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
  },
  js.configs.recommended,
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  skipFormatting
);
