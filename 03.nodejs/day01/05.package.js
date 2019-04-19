/*
  package.json中5个字段：
    name: 包名  今后下载时输入名称
    version：版本号 x.x.x
      例如 1.2.3
        1 大版本：当这个包有巨大内容变化时（里面核心代码发生巨大变化）
        2 中版本: 在当前大版本基础上，添加了一个功能（删除）
        3 小版本：修复BUG
    dependence: 生产依赖： jQuery bootstrap
    devDependence：开发依赖:  babel browserify
    script 指令：里面包含运行项目的指令
      script : {
        "start" : "xxxx",  运行项目的指令
        "build" : "xxxx",  构建项目生成打包后的文件的指令
        "test": "xxxx"     测试项目的指令
      }

  什么是生产 / 开发环境？
    生产环境：项目运行时需要的环境
    开发环境：项目构建打包时需要的环境
  什么是生产 / 开发依赖？
    生产依赖：项目运行时需要的依赖包
    开发依赖：项目构建打包时需要的依赖包
 */

