/*
  定义一个有依赖的模块

  define(['依赖模块名称1', '依赖模块名称2'...], function (m1, m2...) {
    m1就是对应的依赖模块名称1
    m2就是对应的依赖模块名称2
    他们是一一对应的关系，和位置相关
  })
 */

define(['module1'], function (m1) {
  console.log('module2执行了~');
  const result = m1(20, 3);
  // 暴露出去
  return result;
})