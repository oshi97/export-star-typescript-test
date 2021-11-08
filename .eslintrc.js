module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['*.js'],
  plugins: [
    '@typescript-eslint',
    'export-star'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "export-star/no-duplicate-identifiers": 1
  }
};