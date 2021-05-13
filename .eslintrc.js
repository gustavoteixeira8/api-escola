module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'import/newline-after-import': 'off',
    'import/first': 'off',
    'no-useless-escape': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'camelcase': 'off',
  },
};
