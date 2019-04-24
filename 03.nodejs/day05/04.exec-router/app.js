// 引入模块的代码放在最上面
// node核心模块或者npm下载的模块放上面
const express = require('express');
// 用户自定义的模块放下面
const db = require('./db');

// 引入路由器模块
const uiRouter = require('./routers/ui-router');
const userRouter = require('./routers/user-router');

const app = express();
/*
  需求一：希望用户能通过服务器访问到指定页面
    解决：app.use(express.static('public'));
  需求二：完成注册功能
    1. 设置路由：响应用户提交的注册请求
 */
// 向外暴露静态资源
app.use(express.static('public'));
// 使用内置中间件解析请求体数据
app.use(express.urlencoded({extended: true}));

db
  .then(() => {
    // 使用路由器中间件
    app.use(userRouter);
    app.use(uiRouter);
  })
  .catch();

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});