const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('这是服务器返回的响应');
});

app.get('/jsonp', (req, res) => {
  const { callback } = req.query; // callback: getData
  // const data = '这是服务器返回的响应111';
  const data = [{name: 'jack'}, {name: 'bob'}];  // json with padding

  res.send(`${callback}(${JSON.stringify(data)})`); // getData('这是服务器返回的响应');
});

// http://www.ruanyifeng.com/blog/2016/04/cors.html

app.get('/cors', (req, res) => {
  // 使用cors解决 : 兼容性不好
  const saftArr = ['http://localhost:4000', 'http://localhost:63342'];
  // res.set('Access-Control-Allow-origin', '*'); // 允许所有地址跨域，访问当前资源
  res.set('Access-Control-Allow-origin', 'http://localhost:4000'); // 允许单个地址跨域，访问当前资源

  res.send('这是cors服务器返回的响应');
})

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})