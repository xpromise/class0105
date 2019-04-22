// 引入express模块
const express = require('express');

// 创建App应用对象: 基本上设置服务器的方法都在app上
// application: express框架中最核心的对象，特点：唯一的
const app = express();

// 设置路由
// 请求方式：get / post
// 请求路径：http://localhost:4000/test
/*
  http://localhost:4000/test
    localhost 代表本机的默认域名
  http://127.0.0.1:4000/test
    127.0.0.1 代表本机的默认IP地址
  http://192.168.13.35:4000/test
    192.168.13.35 代表本机的局域网ip地址

  访问服务器的地址：
    协议名://域名（ip地址）:端口号/资源名称

    默认端口号 (在网页地址栏中默认不显示)
      http 80
      https 443
    默认资源名 index.html
 */
// 处理请求的回调函数：
app.get('/test', (request, response) => {
  /*
    request 请求信息：客户端发送请求到服务器
    response 响应信息: 服务器响应给客户端
   */
  // 返回响应
  response.send('<h1>这是express111框架服务器返回的响应</h1>');
});

app.post('/', (request, response) => {
  /*
    request 请求信息：客户端发送请求到服务器
    response 响应信息: 服务器响应给客户端
   */
  // 返回响应
  response.send('<h1>这是express111框架服务器返回的响应</h1>');
});

// 监听端口号：为了将服务器启动在4000端口下
app.listen(4000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log('服务器启动失败', err);
})