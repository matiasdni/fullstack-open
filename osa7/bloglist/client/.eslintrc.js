/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: [
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "jest", "cypress", "prettier"],
  rules: {

  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
