;(function webpackUniversalModuleDefinition(root, factory) {
  // root => window
  // factory => function () { // 子应用代码 return { ... } // 导出结果 }

  // CommonJS 模块模范
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()

  // 兼容 AMD 模块规范
  else if (typeof define === 'function' && define.amd) define([], factory)

  // CommonJS
  else if (typeof exports === 'object') exports['app-vue2-app'] = factory()

  // window[xxx'] = factory()
  else root['app-vue2-app'] = factory()
})(window, function () {
  // 这是内部的代码

  // 最后会返回导出的结果
  return {
    a: 1,
    b: 2
  }
})
