/*
  所有模块化的模块都被包裹一层函数中：
    那么Commonjs和ES6模块化有没有函数呢？
      答案：有 。   怎么样才能看到这个函数？
        function (exports, require, module, __filename, __dirname) {}
          exports 暴露模块
          require 引入模块
          module module.exports 暴露模块
          __filename  当前文件的绝对路径
          __dirname   当前文件的目录的绝对路径
 */

// 在函数内部打印当前函数
console.log(arguments.callee.toString());

console.log(__filename);  // C:\Users\XiongJian\Desktop\0105\class0105\03.nodejs\day01\03.function-in-node.js
console.log(__dirname); // C:\Users\XiongJian\Desktop\0105\class0105\03.nodejs\day01
