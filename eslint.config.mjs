// @ts-check

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import jest from "eslint-plugin-jest";
import eslintReccomended from "eslint-plugin-prettier/recommended";


export default defineConfig(
  eslintReccomended,
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
    ...tseslint.configs.recommended,
  {files: ['**/*.ts']},
  { ignores: ["coverage/*", "dist/*"] },
  {
    // для тестов
    files: ["src/**/*.test.ts"],
    ...jest.configs['flat/recommended'],
  },
);
