/*
  1. 问题：
    浏览器不能识别commonjs模块化语法，只有nodejs平台识别
    但是希望浏览器能识别
  2. 解决：
    通过某个工具将commonjs模块化语法编译成浏览器能识别的js语法
    工具：browserify
    下载并安装： npm i browserify -g   在任意cmd窗口运行当前指令
    使用：
      - 来到当前文件的目录
      - 运行 browserify ./app.js -o ./built.js

 */
// 引入其他两个模块，使用
const m1 = require('./module1');
const m2 = require('./module2');
const m3 = require('./module3');

console.log(m1);
console.log(m2);

console.log(m1.sum(1, 2, 3, 4));
console.log(m2.add(1, 2));
console.log(m3(2, 3)); // {}：因为暴露出去的是module.exports指向的值，他的默认值为{}
