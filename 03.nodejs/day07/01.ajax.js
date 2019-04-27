const express = require('express');
const app = express();

// 我们需要通过开发者服务器打开页面，这样发送ajax请求才不会报错
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  console.log(req.query);

  res.send('这是服务器返回的响应~44444444444');
})

app.post('/', (req, res) => {
  console.log(req.body);

  res.send('这是post服务器返回的响应~');
})

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})