/*
  定义一个没有依赖的模块
    这个模块运行不需要其他模块
 */

define(function () {
  console.log('module1执行了~');
  // 模块内容
  function add(x, y) {
    return x + y;
  }
  // 暴露出去
  return add;
})