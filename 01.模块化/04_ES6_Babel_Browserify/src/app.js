/*
  主模块/入口模块/入口文件：所有模块化的js文件都是由 主模块 引入后生效的
    app.js  main.js  index.js

  ES6模块化规范
    1. 引入模块
      import
      import xxx from '模块路径';
      import { xxx, yyy } from '模块路径';

      模块路径的规则与commonjs一致：
        我们使用babel将ES6模块化语法编译成Commonjs模块化语法，这时nodejs平台能识别
        如果需要浏览器识别，需要借助browserify工具将Commonjs模块化语法编译浏览器能识别的语法

    2. 暴露模块
      export
      - 默认暴露
        export default xxx; --> import xxx from '模块路径';
      - 分别暴露
        export const a = xxx;
        export const b = function () {}; --> import { xxx, yyy } from '模块路径';
      - 统一暴露
        export {xxx, yyy}; --> import { xxx, yyy } from '模块路径';

   ES6模块化规范问题：
    nodejs平台不识别这个语法
    浏览器平台也不识别这个语法

    借助一个工具将其编译成浏览器/nodejs平台能够识别的语法
      babel -- 专门用来编译语法（将高级语法/浏览器不识别的语法编译成浏览器能识别的低级语法）

      用法：
        0. 来到当前工作根目录
          04_ES6_Babel_Browserify
        1. 初始化package.json
          npm init -y
        2. 下载并安装babel相关的包
          npm install --save-dev @babel/core @babel/cli @babel/preset-env
        3. 创建 .babelrc 配置文件（这个文件就是babel运行时读取的配置文件）
          {
            "presets": ["@babel/env"]
          }
        4. 运行指令：将ES6模块化语法编译成浏览器识别的语法
          npx babel src -d dist
            将src下面的所有js文件编译输出到dist目录下
          browserify dist/app.js -o dist/built.js
 */

/*
  1. 引入模块
      import
      import xxx from '模块路径';
      import { xxx, yyy } from '模块路径';

  2. 暴露模块
    export
    - 默认暴露
      export default xxx; --> import xxx from '模块路径';
    - 分别暴露
      export const a = xxx;
      export const b = function () {}; --> import { xxx, yyy } from '模块路径';
    - 统一暴露
      export {xxx, yyy}; --> import { xxx, yyy } from '模块路径';

   3. ES6模块语法 nodejs平台不识别、浏览器也不识别
      借助 babel 将ES6模块化语法编译成 commonjs 语法，这个语法只能 nodejs 平台识别
      借助 browserify 将 commonjs 语法编译成浏览器能识别的语法
 */

// 引入模块
// 引入默认暴露的模块
import Person from './module1';
// 引入分别暴露/统一暴露的模块
import { name, age } from './module2';
import { add, mul } from './module3';

console.log(new Person('bob', 20));
console.log(name);
console.log(add(2, 3), mul(2, 3));