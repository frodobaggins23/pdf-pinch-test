module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'quotes': [1, 'single'],
    'react/jsx-indent': [1, 2, {indentLogicalExpressions: true}],
    'react/jsx-indent-props': [1, 2],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
  },
}
