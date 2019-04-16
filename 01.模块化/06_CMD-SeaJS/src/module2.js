
define(function (require, exports, module) {
  // 引入依赖
  const m1 = require('./module1');

  const result = m1(3, 4);
  // 暴露出去
  exports.result = result;

})