/*
  commonjs的模块化规范
    1. 引入模块
      require(模块路径)
        模块路径必须以 ./ 或 ../ 开头，否则就报错：cannot find module 'xxx'
        模块的文件后缀名可以省略，因为解析时会自动补全： js文件和json文件，其他文件就不行

    2. 暴露模块
      module.exports
        module.exports = sum;   -->  sum
        module.exports.sum = sum;  --> {sum: sum}
      exports
        exports.add = add; --> {add: add}

      模块向外暴露出去的是exports还是module.exports?
        module.exports 指向的值
        exports 是 module.exports 的引用

        module.exports = {};
        exports = module.exports;

        exports.add = add;
        exports = add;  // 为什么不行？
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
