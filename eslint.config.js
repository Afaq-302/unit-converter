import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import next from "eslint-config-next";

export default [
  { ignores: [".next", "dist"] },

  // ✅ Next.js recommended rules (includes Next plugin)
  ...next.configs["core-web-vitals"],

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }, // ✅ fixes "Unexpected token <"
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
];
