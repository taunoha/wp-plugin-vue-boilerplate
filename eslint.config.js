import js from '@eslint/js';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import prettier from "eslint-plugin-prettier/recommended";
import pluginVue from 'eslint-plugin-vue';
import { createRequire } from 'node:module';

const autoImportRules = createRequire(import.meta.url)('./.eslintrc-auto-import.json');

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
  {
    languageOptions: {
      globals: {
        ...autoImportRules.globals
      }
    },
    rules: {
      ...autoImportRules.rules
    }
  },
  {
    files: ["src/**/*.ts", "src/**/*.vue", "src/*.mjs", "src/**/*.js"],
    ...prettier,
  },
  {
    files: ["src/**/*.vue"],
    rules: {
      "prettier/prettier": ["error", { htmlWhitespaceSensitivity: "ignore" }],
    },
  },
  {
    files: ["src/components/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    }
  },
  {
    files: ["src/components/*.vue"],
    rules: {
      "vue/multi-word-component-names": "error",
    }
  },
]
