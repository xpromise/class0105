const express = require('express');
// 引入路由器实例对象
const router = require('./router');
const app = express();

// 放在app上。 router就是一个中间件函数
// 路由器中间件
app.use(router);

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})