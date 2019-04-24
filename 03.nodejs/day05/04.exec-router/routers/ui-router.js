const express = require('express');
// node核心模块 -- path : 用来处理路径问题
const path = require('path');
// 创建路由器对象
const router = new express.Router();

// 需要通过 /login 地址 访问 login.html 页面
// 目的： 将网址去掉 .html
router.get('/login', (req, res) => {
  // 将多个路径最终拼接成一个绝对路径（其中../代码回退一层目录）
  const fileName = path.resolve(__dirname, '../', 'public/login.html');
  res.sendFile(fileName);
})
router.get('/register', (req, res) => {
  const fileName = path.resolve(__dirname, '../', 'public/register.html');
  res.sendFile(fileName);
})

// 暴露出去
module.exports = router;