// 引入express模块
const express = require('express');

// 创建App应用对象: 基本上设置服务器的方法都在app上
const app = express();

// 设置路由
app.get('/', (request, response) => {
  /*
    request 请求信息：客户端发送请求到服务器
    response 响应信息: 服务器响应给客户端
   */
  // 返回响应
  response.send('<h1>这是express框架服务器返回的响应</h1>');
});

// 监听端口号
app.listen(4000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log('服务器启动失败', err);
})