module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: "babel-eslint", // Specify babel-eslint as the parser
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module", // Specify the source type as 'module'
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
