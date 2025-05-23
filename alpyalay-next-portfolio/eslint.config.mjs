import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import eslintConfigPrettier from "eslint-config-prettier"; // To disable ESLint rules that conflict with Prettier

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // next/core-web-vitals likely includes next/typescript already
  {
    // Configuration for Tailwind CSS plugin
    plugins: {
      tailwindcss: eslintPluginTailwindcss,
    },
    rules: {
      ...eslintPluginTailwindcss.configs.recommended.rules, // Apply recommended Tailwind CSS rules
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/classnames-order": "warn", // Keep this for linting, prettier-plugin-tailwindcss will handle fixing
    },
  },
  eslintConfigPrettier, // Add Prettier config last to override other formatting rules
];

export default eslintConfig;
