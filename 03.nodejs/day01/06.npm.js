/*
  npm 包管理器，用来管理（下载、删除、发布、更新...）所有包
  常用指令：
    1. 下载
      npm install / i xxx
        node_modules/  里面包含所有通过npm下载的包
        package-lock.json 缓存文件、里面包含之前下载包的信息（版本号、下载地址、hash值），目的为了下一次在下载重复的包时速度更快
        将被下载的包 往package.json添加为生产依赖
      等价于 npm i xxx --save / -S 下载并添加到生产依赖中

      npm i react@16.7.0 下载指定版本的包

      npm i xxx --save-dev / -D 下载并添加到开发依赖中

      npm i 下载当前目录下package.json中所有依赖包

      npm i xxx -g 全局安装。不是给模块引入使用的，而是使用其指令
        C:\Users\XiongJian\AppData\Roaming\npm 这个安装包的位置

    2. 删除
      npm remove xxx  删除node_modules中的包，和package.json、package-lock.json中依赖关系
      npm uninstall xxx
    3. 扩展
      npm init -y 初始化包描述文件（包含基本配置） package.json

    注意：
      1. 保证当前包中有package.json文件
      2. 保证下载时是在当前package.json文件的目录下下载

    在cmd中退出操作：ctrl + c

    淘宝的镜像服务器：
      npm config set registry https://registry.npm.taobao.org
      yarn config set registry https://registry.npm.taobao.org

    1. 下载yarn
      npm i yarn -g
    2. 使用：
      yarn add xxx  下载并添加到生产依赖
      yarn add xxx --dev 开发依赖

    如果npm和yarn混着用:
      如果之前用npm下载过，再用yarn下载，再用npm下载，这时候npm会把yarn下载的包给删除掉
      原因是因为npm默认看了package-lock.json文件，而yarn下载时并没有修改package-lock.json文件。
      对于npm来讲它认为package-lock.json文件没有包含的包是多余的包，就给删除了
 */