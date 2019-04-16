// require的配置
requirejs.config({
  baseUrl: './src/', // 所有模块的公共路径
  paths: {
    module1: 'module1',
    module2: 'module2'
  }
})

// 定义主模块内容
requirejs([], function () {
  console.log('main执行了~');

  // 按需加载
  document.getElementById('btn').onclick = function () {
    requirejs(['module2'], function (m2) {
      console.log(m2);
    })
  }

})