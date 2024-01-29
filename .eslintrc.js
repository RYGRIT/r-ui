module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    /*
      off - 0
      warn - 1
      error - 2
    */
    'no-extra-semi': 0, // 存在于 eslint:recommended 中 https://github.com/eslint/eslint/blob/v8.56.0/packages/js/src/configs/eslint-recommended.js#L37
    'prefer-const': [2, { destructuring: 'all' }],
    'no-console': 2
  }
}
