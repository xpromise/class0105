/*
  commonjs模块化规范：
    1. 引入其他模块
      require(模块路径)
        模块路径：
          - 如果是自定义模块（用户自己定义的模块），路径必须以 ./ 或 ../ 开头
          - 如果是nodejs自带的模块（核心模块）或者通过npm下载的模块，路径直接写模块名称
    2. 暴露当前模块内容
      exports
      module.exports
        模块向外暴露的是什么？是module.exports指向的值，而exports只是module.exports一个引用而已

    解决nodejs代码提示： file -- settings -- 在上面搜nodejs -- 打个勾/点击按钮
 */

// 引入nodejs自带模块
const http = require('http');
// 引入自定义模块
const add = require('./module1');

console.log(add(2, 3));
console.log(http);
