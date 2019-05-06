/*
  webpack.config.js 就是webpack的配置文件，当你执行webpack指令时，会默认读取配置文件
    1. 入口 entry: string 单个路径/array/object 多个路径
    2. 输出 output
    3. 加载器 loader
      - 官网找loader，找不到上npm找
      - 下载loader
      - 直接配置使用
    4. 插件 plugins
    5. 模式 mode


 */

const { resolve } = require('path');

// 向外暴露的配置对象
module.exports = {
  // 入口文件：指示webpack以入口文件为起点开始构建打包
  entry: './src/js/app.js',
  // 输出: 构建打包后的新文件输出到哪里去
  output: {
    // 输出路径
    path: resolve(__dirname, 'build/js'),
    // 输出文件名
    filename: 'built.js'
  },
  module: {
    rules: [
      // 在这里面写具体loader的配置
      {
        enforce: 'pre',  // 提前使用当前配置去检查 -- 提前使用
        test: /\.js$/, // 检查是否js文件，一旦通过就会以下面的loader解析，没有通过就不处理
        exclude: /node_modules/, // 排除node_modules的所有文件
        include: /src/, // 只处理当前文件夹下的文件
        loader: "eslint-loader", // 使用哪个loader处理这些文件
        /*options: {
          // eslint options (if necessary)
        }*/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [

  ],
  // 开发环境
  mode: 'development'
};