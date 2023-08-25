module.exports = {
  "extends": [
    "stylelint-config-standard", // 配置stylelint拓展插件
    "stylelint-config-html/vue", // 配置vue中template样式格式化
    "stylelint-config-standard-scss", // 配置stylelint scss插件
    "stylelint-config-recommended-vue/scss", // 配置vue中scss样式格式化
    "stylelint-config-recess-order", // 配置stylelint css属性书写顺序插件
    "stylelint-config-prettier" // 配置stylelint和prettier兼容
  ],
  "overrides": [
    { "files": ["**/*.(scss|css|vue|html)"], "customSyntax": "postcss-scss" },
    { "files": ["**/*.(html|vue)"], "customSyntax": "postcss-html" }
  ],
  "ignoreFiles": [
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
    "**/*.json",
    "**/*.md",
    "**/*.yaml"
  ],
  "rules": {
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    "scss/dollar-variable-pattern": null
  }
}