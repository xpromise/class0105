// 引入模块的代码放在最上面
// node核心模块或者npm下载的模块放上面
const express = require('express');
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