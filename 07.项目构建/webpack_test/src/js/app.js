import add from './module1';

import { name, age } from './module2';
import { mul, count } from './module3';
// 引入资源，并定义变量接收使用
import data from '../json/data.json';
// 只引入资源，不使用
import '../less/test1.less';
import '../less/test2.less';
import '../less/iconfont.less';

/*
  webpack ./src/js/app.js -o ./build/js/built.js --mode=development
    - 将es6模块化语法编译成浏览器能识别的语法
    - 不能编译es6其他语法
  webpack ./src/js/app.js -o ./build/js/built.js --mode=production
    - 将es6模块化语法编译成浏览器能识别的语法
    - 不能编译es6其他语法
    - 压缩js代码

  webpack只能识别js和json模块，其他资源模块不能识别。 需要使用loader帮助webpack解析这些资源
*/

/* eslint-disable */
console.log(add(6, 6));
console.log(name, age);
console.log(mul(2, 3));
console.log(count(2, 1));
console.log(data);
/* eslint-enable */