module.exports = {
  root: true,
  extends: [
    '@react-native',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  plugins: ['prettier'],
}; 