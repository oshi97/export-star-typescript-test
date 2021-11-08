module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['*.js'],
  plugins: [
    '@typescript-eslint',
    'export-rule'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "export-rule/no-template-literals": 1
  },
  settings: {
    'import/resolver': 'typescript'
  }
};