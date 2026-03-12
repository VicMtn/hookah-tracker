import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "@vue/eslint-config-prettier";

export default [
  {
    ignores: ["dist", "dist-ssr", "coverage", "node_modules"],
  },

  js.configs.recommended,

  ...pluginVue.configs["flat/recommended"],

  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  prettier,
];
