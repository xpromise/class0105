// 引入express
const express = require('express');
// 获取Router路由器对象
const Router = express.Router;
// 创建路由器实例对象
// router: 可以看做是一个小型的app应用对象（有app对象的部分功能：能够设置路由和中间件）
/*
  路由器：
    1. 是什么？
      一个集中性管理路由和中间件的对象
      看做是一个小型的app应用对象（有app对象的部分功能：能够设置路由和中间件）
    2. 作用：
      满足多人协同开发
      按照功能对路由和中间件进行模块化
    3. 使用
 */
const router = new Router();

router.use((req, res, next) => {
  console.log('中间件执行了~');

  next();
});

router.get('/', (req, res) => {
  console.log(req.query);

  res.send('服务器返回的响应');
});
// router要想生效：得想法办放在app上
// 将router暴露出去
module.exports = router;
