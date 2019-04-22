const express = require('express');

const app = express();

app.get('/login', (req, res) => {

});

app.listen(4000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})