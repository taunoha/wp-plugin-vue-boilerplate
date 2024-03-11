module.exports = {
    root: true,
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:vue/vue3-recommended",
      "plugin:prettier/recommended",
      "@vue/eslint-config-prettier",
    ],
    env: {
      "vue/setup-compiler-macros": true,
    },
    rules: {
      "vue/script-setup-no-uses-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
      }],
      'prettier/prettier': [
        'error', {
          "htmlWhitespaceSensitivity": "ignore"
        }
      ]
    },
    globals: {
      "_": "readable",
      "jQuery": "readable",
      "see_on_minu_esimene_plugin": "readable",
      "wp": "readable"
    }
  };
  
  