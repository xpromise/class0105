const express = require('express');

const app = express();
/*
  http协议：
    1. 规定互联网中客户端和服务器之间的通信的规则
    2. 超文本超文本传输协议，基于TCP/IP协议位于应用层的协议
    3. 协议规定的具体内容：我们称之为报文：请求报文和响应报文
 */

app.get('/login', (req, res) => {

});

app.listen(4000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});