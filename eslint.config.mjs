
// @ts-check

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import jest from "eslint-plugin-jest";
import eslintReccomended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintReccomended.plugins.prettier,
    },
    rules: {
      ...eslintReccomended.rules,
    },
  },

  //для тестов
  {
    files: ["src/**/*.test.ts"],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs["flat/recommended"].rules,
    },
  },

  {
    ignores: ["dist/*", "coverage/*"],
  },
]);

