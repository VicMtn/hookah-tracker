import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "@vue/eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: ["dist", "dist-ssr", "coverage", "node_modules"],
  },

  js.configs.recommended,

  ...pluginVue.configs["flat/recommended"],

  {
    files: ["**/*.vue", "**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  prettier,
];
