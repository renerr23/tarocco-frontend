// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import testingLibrary from "eslint-plugin-testing-library";

export default [
  // Base JS + TS configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // enables type-aware linting
        tsconfigRootDir: import.meta.dirname
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        jest: true
      }
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      "testing-library": testingLibrary
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off", // no longer required
      "react/prop-types": "off",

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],

      // Testing Library
      "testing-library/no-debugging-utils": "warn",
      "testing-library/no-dom-import": ["error", "react"],

      // Code style
      "prettier/prettier": "warn"
    }
  }
];
