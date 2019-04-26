const express = require('express');
// node核心模块 -- path : 用来处理路径问题
const path = require('path');

const cookieParser = require('cookie-parser');

const Users = require('../models/users');
// 创建路由器对象
const router = new express.Router();

// 导致一些用不上的路由也被处理了
// router.use(cookieParser());

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

router.get('/usercenter', cookieParser(), async (req, res) => {
  // 获取cookie，并判断是否是某个用户的
  const { user } = req.cookies;
  // user不存在，用户一定没有登录过
  if (!user) {
    res.redirect('/login');
    return;
  }
  // 返回给指定用户响应
  const result = await Users.findOne({_id: user});

  if (result) {
    // 找到了指定用户
    res.render('user-center', {username: result.username});
  } else {
    // 没有找到
    res.redirect('/login');
  }

})

// 暴露出去
module.exports = router;