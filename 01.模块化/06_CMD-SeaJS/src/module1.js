
define(function (require, exports, module) {
  function add(x, y) {
    return x + y;
  }
  // 暴露出去
  module.exports = add;
})