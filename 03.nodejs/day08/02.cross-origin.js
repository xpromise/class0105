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

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})