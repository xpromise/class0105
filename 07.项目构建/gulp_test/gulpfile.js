/*
  gulpfile.js gulp的配置文件：当我运行gulp指令时，会自动找的配置文件
    所有构建工具都是基于nodejs平台运行的（所以模块化使用commonjs）。

    gulp配置任务过程：
      1. 上插件网搜插件 gulp-xxx  https://gulpjs.com/plugins/
      2. 下载插件  npm i xxx -D
      3. 引入插件
      4. 配置插件任务  gulp.task(插件任务名, callback)
      5. 运行任务  gulp 插件任务名 (需要在当前配置文件的目录运行)

    npm
      - npm init 手动一个个输入配置 / npm init -y 初始化一个默认配置
      - npm i xxx -g 全局安装（当需要在cmd中运行指令时，这个指令需要全局安装）
      - npm i xxx 局部/本地安装（当项目需要某个依赖包时，这个依赖包需要本地安装）

    gulp
      gulp.task()  注册任务
      gulp.src(string/array)  输入（将指定文件导入到gulp的流中）
        string 单个路径
        array 多个路径
      gulp.dest() 输出（将流中的文件写入到指定位置）
      gulp.watch(源码目录, 一旦变化要执行的任务) 监视

   babel
     1. 是什么?  一个js的编译器
     2. 作用：
      将typescript / jsx语法 编译成js语法
      将 ES6及其以上的高级（新）语法 编译成 es5或以下的低级（旧）语法，这样绝大部分浏览器就能兼容了

   eslint:
    1. 是什么？ 一个js语法检查工具
    2. 作用：检查常见js语法错误
    3. 使用：
      需要在package.json中定义配置
        "eslintConfig": {
          "parserOptions": {
            "ecmaVersion": 7,  // 使用es7和一下的所有语法
            "sourceType": "module" // 使用es6的模块化语法
          },
          "extends": "eslint:recommended", // 使用eslint推荐的默认配置
          "env": {
            "browser": true  // 支持使用浏览器端的全局变量
          }
        }


*/

// 引入插件
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const eslint = require('gulp-eslint');
const less = require('gulp-less');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const open = require('open');

// 配置插件任务
// 语法检查 eslint
gulp.task('eslint', () => {
  return gulp.src(['src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())  // 检查语法错误提示规则
    .pipe(eslint.failAfterError()) // 一旦出错就停止运行任务
    .pipe(livereload());
});
// 语法转换（es6模块化语法转换为commonjs，es6其他语法转换为es5以下语法）
gulp.task('babel', function () {
  return gulp.src('src/js/*.js')  // 将指定目录下的文件导入到gulp的流中（读取文件），返回值是一个可读流
    .pipe(babel({  // 使用babel插件对流中的文件进行语法转换（ES6模块化语法转换成commonjs语法）
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))  // 将流中文件输出到指定目录去
    .pipe(livereload());
});
// 将commonjs语法转换成浏览器能识别的语法
gulp.task('browserify', function () {
  // 所有gulp任务函数中都必须指定return，否则报错
  return gulp.src('build/js/app.js') // browserify会根据入口文件自动找相关所有依赖文件，而babel不会，babel只对要处理的文件处理
    .pipe(browserify())  // 将commonjs语法转换成浏览器能识别的语法
    .pipe(rename('built.js')) // 将文件重命名
    .pipe(gulp.dest('build/js'))
    .pipe(livereload());
});

gulp.task('less', function () {
  // 减少多次的文件读写操作
  return gulp.src('./src/less/*.less')
    .pipe(less()) // 将less文件编译成css文件
    .pipe(concat('built.css'))  // 合并多个css文件，并命名为built.css
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});
// 自动化任务
gulp.task('watch', function () {
  // 热更新文件
  livereload.listen();
  // 开启服务器，自己开启的服务器才能控制热更新
  connect.server({
    name: 'Dev App',
    root: ['./build'],  // 服务器要运行的代码位置
    port: 3000, // 端口号
    livereload: true // 开启热更新，刷新页面
  });
  // 自动打开浏览器
  open('http://localhost:3000');
  // 自动化任务: 自动编译
  // 一旦js源码文件发生变化，就自动编译运行之前设定的任务
  gulp.watch('src/js/*.js', gulp.series(['eslint', 'babel', 'browserify']));
  gulp.watch('src/less/*.less', gulp.series(['less']));
});

// 配置任务：为了统一执行之前配置好的任务
// 任务名是 default ， 输入指令可以省略
gulp.task('default', gulp.series(['eslint', 'babel', 'browserify'])); // 同步执行、顺序执行
// gulp.task('default', gulp.parallel(['eslint', 'babel', 'browserify'])); // 异步执行，同一时间干多件事，谁先干完谁先结束

/*
  开发环境：
    能将用户写的源代码编译运行的环境：编译代码（js、less）、语法检查、自动化任务

 */
