* public/index.html webpack插件找的模板页面
* src/index.js  webpack构建打包的入口文件
* 下载完成脚手架
  * yarn add babel-jest@24.7.1 --dev
  
## 评论管理
* 拆分组件
  * App
  * AddComment
  * CommentList
  * CommentItem
* 实现静态组件
  * 将所有标签都改自结束标签（input）
  * 将class改为className
  * 将style值改为对象方式，不能是字符串
* 实现动态组件
  * 需要state？因为页面有变化
  * state定义在哪个组件？ App
  * state定义成什么数据？ [{name: xxx, content: xxx}, {}]
  * 实现动态展示state数据
  * 写js交互效果
* 定义组件两种方式
  * 工厂函数：如果没有使用 state、ref、生命周期函数，就可以使用工厂函数
  * ES6类：如果组件里面使用了 state、ref、生命周期函数等