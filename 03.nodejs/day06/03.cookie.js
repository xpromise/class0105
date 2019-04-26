const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

/*
  cookie:
    1. 是什么？
      本质上就是一个存储在浏览器端的文本：key-value关系
    2. 作用：
      用来存储特定数据
      用来在网络通信中解决http协议无状态的问题（可以用来区分不同的请求）
    3. 工作原理：
      第一次：浏览器发送请求到服务器上，服务器判断请求通过，返回一个cookie（包含用户信息）给浏览器，浏览器接收到cookie并保存下来
      下次：浏览器发送请求时会将所有cookie都自动携带上，服务器接收到请求并分析其中的cookie，就能知道哪个用户发送的请求，从而针对当前用户进行响应
    4. 使用：
      - 设置cookie，返回给浏览器
        res.cookie(key, value[, options]);

      - 读取cookie，分析其中内容
        req.cookies
        我们需要通过第三方中间件解析cookie --- cookie-parser

      - 删除cookie
        res.clearCookie(key);

    5. 时效性
      会话cookie （当服务器返回cookie给浏览器时，开始会话。关闭浏览器结束会话）
        res.cookie('user', 'sunwukong');
      持久化cookie
        res.cookie('user', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 7});  // 7天后才消失
    6. 缺点：
      长度和数量都有限制：数量为20个左右，大小为4kb左右
      传输流量大：（发送请求占的带宽更多，产生流量更多）
      安全性更低：存储在浏览器端

*/
// 第三方中间件：解析cookie数据，挂载到req.cookies上
app.use(cookieParser());

app.get('/cookie1', (req, res) => {
  // 设置一个cookie
  res.cookie('user1', 'sunwukong');
  res.cookie('user2', 'zhubajie', {maxAge: 1000 * 3600 * 24 * 7});
  // 返回响应
  res.end('success1');
});

app.get('/cookie2', (req, res) => {
  // 读取cookie
  console.log(req.cookies);
  /*
    { 'Webstorm-d632f404': '6dd4cb30-4200-4430-b5a8-a4ca17524f5d',
      user: 'sunwukong' }
   */
  res.end('success2');
});

app.get('/cookie3', (req, res) => {
  // 删除cookie
  // res.clearCookie('user2');
  res.cookie('user2', 'xxxx', {maxAge: 0});

  res.end('success3');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})