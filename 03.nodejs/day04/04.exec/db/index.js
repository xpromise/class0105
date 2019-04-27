/*
  此模块用来连接数据库的
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exec', { useNewUrlParser: true, useCreateIndex: true });

module.exports = new Promise((resolve, reject) => {
  // 判断数据库是否连接成功
  mongoose.connection.once('open', (err) => {
    if (!err) {
      console.log('数据库连接成功了~');
      resolve();
    } else {
      console.log(err);
      reject();
    }
  })
})