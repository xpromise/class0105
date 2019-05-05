/*
  gulpfile.js gulp的配置文件：当我运行gulp指令时，会自动找的配置文件
    所有构建工具都是基于nodejs平台运行的（所以模块化使用commonjs）。

    gulp配置任务过程：
      1. 上插件网搜插件 gulp-xxx  https://gulpjs.com/plugins/
      2. 下载插件  npm i xxx -D
      3. 引入插件
      4. 配置插件任务  gulp.task(插件任务名, callback)
      5. 运行任务  gulp 插件任务名 (需要在当前配置文件的目录运行)
 */

// 引入插件
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");

// 配置插件任务
gulp.task('babel', function () {
  return gulp.src('src/js/*.js')  // 将指定目录下的文件导入到gulp的流中（读取文件），返回值是一个可读流
    .pipe(babel({  // 使用babel插件对流中的文件进行语法转换（ES6模块化语法转换成commonjs语法）
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))  // 将流中文件输出到指定目录去
});

gulp.task('browserify', function() {
  // 所有gulp任务函数中都必须指定return，否则报错
  return gulp.src('build/js/app.js')
    .pipe(browserify())  // 将commonjs语法转换成浏览器能识别的语法
    .pipe(rename('built.js')) // 将文件重命名
    .pipe(gulp.dest('./build/js'))
});