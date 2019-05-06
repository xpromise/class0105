## js
* 语法检查：eslint-loader
  * 需要在package.json加上eslintConfig
* 语法转换：babel-loader  

## less
* 编译less成css
  * less-loader（less） css-loader style-loader
  
## img
* url-loader 针对小于8kb的图片做base64处理
  * outputPath 决定图片输出的路径（输出到本地哪里去）
  * publicPath  决定样式文件中图片url路径（页面中使用图片的路径）

## html
* html-webpack-plugin 以指定html文件为模板，创建新文件（自动引入js、css）
* html中图片资源没办法处理：html-loader

## 其他资源
* 统一用file-loader处理

## 自动化任务
* webpack-dev-server 
* webpack 

## 常见错误
* cannot find module 'xxx'  --> 包没有下载，请使用npm i xxx
* cannot resolve 'xxx'  --> 包没有下载，请使用npm i xxx
* xxx is not defined  --> 变量xxx没有定义就直接使用，请先定义
* invalid configuration object --> 无效配置对象，指的是webpack配置对象写错了（其中有一个字段或者值不是规定的类型）
  