module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 函数后面不留空格
    'space-before-function-paren': 0,
    // 多词组件名
    'vue/multi-word-component-names': 0,
    // 驼峰命名法0为不提醒1为警告2为报错
    camelcase: [1, { properties: 'never' }]
  }
}
