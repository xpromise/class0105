// 引入模块的代码放在最上面
// node核心模块或者npm下载的模块放上面
const express = require('express');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// 用户自定义的模块放下面
const db = require('./db');

// 引入路由器模块
const uiRouter = require('./routers/ui-router');
const userRouter = require('./routers/user-router');

const app = express();
// 配置ejs
app.set('views', 'views');
app.set('view engine', 'ejs');

// 向外暴露静态资源
app.use(express.static('public'));

// 配置session
/*
  session：
    1. 是什么？
      本质上一个存储在服务器端的对象
    2. 作用：
      解决cookie的痛点
    3. 工作原理
      1. 当需要创建session对象时，中间件会帮助我们自动创建session对象，并保存在数据库中，还返回一个携带session_id的cookie给浏览器
        req.session.xxx = xxx;  // 创建操作
      2. 当请求经过中间件时，会自动解析cookie，去数据库中找到cookie里面session_id对应数据，挂载到req.session上
        req.session.xxx  // 读取之前保存的值
*/
app.use(session({
  secret: 'hello Atguigu 0105',  // 秘密：参与加密的一个串
  saveUninitialized: false, // 如果不需要保存数据，就不创建sessin对象。
  resave: false, // 如果数据没有修改，不会重新保存数据
  store: new MongoStore({  // 保存在哪里
    url: 'mongodb://localhost:27017/exec',  // mongoDB服务器地址
    touchAfter: 24 * 3600 // 会话只在24小时内更新一次，无论发生多少请求（除了那些改变会话数据的东西)
  }),
  cookie: { // 设置cookie的有效期
    maxAge: 1000 * 3600 * 24 * 7
  }
}));

db
  .then(() => {
    // 使用路由器中间件
    app.use(uiRouter);
    app.use(userRouter);
  })
  .catch();

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});