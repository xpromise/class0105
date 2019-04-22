// 1. 引入mongoose
const mongoose = require('mongoose');
// 2. 连接本地mongodb数据库
mongoose.connect('mongodb://localhost:27017/mongoose_test1', { useNewUrlParser: true, useCreateIndex: true });
// 需求：需要模块外部知道模块内部代码有没有执行完毕
// 解决: 向外暴露promise对象
module.exports = new Promise((resolve, reject) => {
  // 绑定数据库连接事件
  mongoose.connection.once('open', (error) => {
    if (!error) {
      console.log('数据库连接成功了~');
      // 将promise对象状态改成成功的状态
      resolve();
    } else {
      console.log('数据库连接失败~', error);
      // 将promise对象状态改成失败的状态
      reject();
    }
  })
});