/*
  webpack.config.js 就是webpack的配置文件，当你执行webpack指令时，会默认读取配置文件

    1. 入口 entry: string 单个路径/array/object 多个路径
      指示webpack以入口文件为起点开始构建打包
    2. 输出 output
      构建打包后的新文件输出到哪里去
    3. 加载器 loader
      帮助webpack解析它解析不了的文件：less、img、html...
      - 官网找loader，找不到上npm找
      - 下载loader
      - 直接配置使用
    4. 插件 plugins
      做一些功能更强大的事情。做一些loader做不了的事。
    5. 模式 mode
      development 开发
      production 生产：多一个压缩代码

      npm i serve -g
      serve能够快速搭建一个部署静态资源的服务器
      serve -s build

 */

const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 向外暴露的配置对象
module.exports = {
  // 入口文件：指示webpack以入口文件为起点开始构建打包
  entry: './src/js/app.js',
  // 输出: 构建打包后的新文件输出到哪里去
  output: {
    // 输出路径
    path: resolve(__dirname, '../build'),
    // 输出文件名
    filename: 'js/built.js',
    // 所有文件的公共路径
    publicPath: '/'
  },
  module: {
    rules: [
      // 在这里面写具体loader的配置
      {
        // npm i eslint eslint-loader -D
        enforce: 'pre',  // 提前使用当前配置去检查 -- 提前使用
        test: /\.js$/, // 检查是否js文件，一旦通过就会以下面的loader解析，没有通过就不处理
        exclude: /node_modules/, // 排除node_modules的所有文件
        include: [
          resolve(__dirname, '../src/js')
        ], // 只处理当前文件夹下的文件 (正则只能写一层目录, 数组里面要写绝对路径)
        loader: "eslint-loader", // 使用哪个loader处理这些文件
      },
      {
        // npm i babel-loader @babel/core @babel/preset-env -D
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      /*{
        // npm i less-loader less style-loader css-loader -D
        test: /\.less$/,
        use: [{ // 使用多个loader解析：从右往左、从下到上、从后往前执行loader
          loader: "style-loader" // 从js中找到css代码，并创建一个style标签，放置css样式
        }, {
          loader: "css-loader" // 将css代码以commonjs模块化的方式整合在js代码中
        }, {
          loader: "less-loader" // 将less编译成css
        }]
      },*/
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',  // 扩展css前缀，做css兼容性处理
          'less-loader'
        ]
      },
      {
        // npm i url-loader file-loader -D
        test: /\.(png|jpg|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8 * 1024 = 8 kb  8kb以下的图片会做base64处理
              publicPath: '/images', // 修改样式文件中图片url路径
              outputPath: 'images', // 决定图片输出到本地哪里去
              name: '[hash:10].[ext]' // 重命名图片文件  hash:10 hash值取前面10位 ext以图片文件的扩展名取补全（之前是什么扩展名就是什么）
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-gifsicle')({
                  interlaced: false
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2
                }),
                require('imagemin-svgo')({
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                })
              ]
            }
          }
        ]
      },
      {
        // npm i html-loader -D
        test: /\.(html)$/,
        use: {
          loader: 'html-loader' // 处理html中图片
        }
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: {
          loader: 'file-loader',  // 处理其他资源：字体
          options: {
            publicPath: '/media', // 修改样式文件中图片url路径
            outputPath: 'media', // 决定图片输出到本地哪里去
            name: '[hash:10].[ext]' // 重命名图片文件  hash:10 hash值取前面10位 ext以图片文件的扩展名取补全（之前是什么扩展名就是什么）
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以当前文件为模板，创建新文件（自动引入打包后生成js、css文件）
      // 压缩html
      minify: {
        removeComments: true,  // 移除注释
        collapseWhitespace: true,  // 移除空格/换行符
        removeRedundantAttributes: true, // 移除默认值的属性
        useShortDoctype: true,  // 使用html5的doctype
        removeEmptyAttributes: true, // 移除空的属性
        removeStyleLinkTypeAttributes: true, // 移除type="text/css"属性
        keepClosingSlash: true, // 给单标签加上结束符
        minifyJS: true, // 最小化script中js
        minifyCSS: true, // 最小化style中css
        minifyURLs: true, // 缩小url，使用相对路径
      }
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:10].css',
      // chunkFilename: '[id].[hash].css',
    }),
    // OptimizeCssAssetsPlugin需要下载第四个版本
    // 压缩css
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.optimize\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      // canPrint: true
    })
  ],
  // 生产环境
  mode: 'production',
};