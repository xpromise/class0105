const express = require('express');
const sha1 = require('sha1');
const path = require('path');

const Users = require('../models/users');

const router = new express.Router();

// 使用内置中间件解析请求体数据
router.use(express.urlencoded({extended: true}));

// 应用级中间件，提取重复代码
router.use((req, res, next) => {

  // 获取获取用户提交的表单数据
  const { username, password, email } = req.body;
  // 创建正则规则
  const usernameReg = /^[a-zA-Z0-9_]{5,10}$/;  // 用户名长度为5-10位，只能是英文、数字和下划线
  const passwordReg = /^[a-zA-Z0-9_]{5,15}$/;  // 密码长度为5-15位，只能是英文、数字和下划线
  const emailReg = /^\w{3,15}@\w{2,5}\.com$/;  // 用户名长度为5-10位，只能是英文、数字和下划线7

  // 判断是登录还是注册
  const isRegister = req.path === '/register';

  /*// 再去校验
  if (!usernameReg.test(username)) {
    // 用户名校验失败，返回给用户错误提示
    // res.render(fileName, {usernameError: '用户名长度为5-10位，只能是英文、数字和下划线', passwordError: ''});
    res.render(fileName, {errorMsg: {usernameError: '用户名长度为5-10位，只能是英文、数字和下划线'}});
    // 不用再执行后面代码了
    return;
  }

  if (!passwordReg.test(password)) {
    // res.render(fileName, {passwordError: '密码长度为5-15位，只能是英文、数字和下划线', usernameError: '' });
    res.render(fileName, {errorMsg: {passwordError: '密码长度为5-15位，只能是英文、数字和下划线'}});
    return;
  }

  // req.path === '/register' 判断当前请求是注册在请求
  if (isRegister && !emailReg.test(email)) {
    res.send('邮箱格式不正确');
    return;
  }*/

  // 初始化错误对象
  const errorMsg = {};
  // 再去校验
  if (!usernameReg.test(username)) {
    errorMsg.usernameError = '用户名长度为5-10位，只能是英文、数字和下划线';
  }

  if (!passwordReg.test(password)) {
    errorMsg.passwordError = '密码长度为5-15位，只能是英文、数字和下划线';
  }

  // req.path === '/register' 判断当前请求是注册在请求
  if (isRegister && !emailReg.test(email)) {
    errorMsg.emailError = '邮箱格式不正确';
  }

  if (errorMsg.usernameError || errorMsg.passwordError || errorMsg.emailError) {
    const fileName = isRegister ? 'register.ejs' : 'login.ejs';
    res.render(fileName, {errorMsg, username, email});
    return;
  }

  // 来到这里，说明正则校验通过
  next();

});

// 确保数据库连接成功后，再进行数据库操作
router.post('/register', async (req, res) => {
  // 处理注册的逻辑：将用户提交的表单数据保存在数据库中
  const { username, password, rePassword, email } = req.body;

  if (password !== rePassword) {
    // 返回错误提示
    res.render('register.ejs', {errorMsg: {rePasswordError: '两次密码输入不一致'}, username, email});
    return;
  }
  // 数据库操作相对其他代码是非常耗时的。
  // 开发时，尽可能减少不必要的数据库操作
  const result = await Users.findOne({username});
  // 判断用户是否存在
  if (result) {
    // 说明用户已存在
    res.render('register.ejs', {errorMsg: {usernameError: '用户已存在'}, username, email});
  } else {
    // 说明用户不存在
    // const result = await Users.findOne({email});
    // if (result) {
      // 邮箱已存在
      // res.render('register.ejs', {errorMsg: {emailError: '邮箱已存在'}, username, email});
    // } else {
      await Users.create({username, password: sha1(password), email});
      // res.send(username + '用户注册成功~');
      // 调整到登录页面
      // const fileName = path.resolve(__dirname, '../', 'public/login.html'); // 网址不会变
      // res.sendFile(fileName)
      res.redirect('/login'); // / 代表当前服务器地址--> http://localhost:3000
    // }
  }

});

// 登录功能
router.post('/login', async (req, res) => {
  /*
    1. 获取用户提交表单数据
    2. 对用户数据进行正则校验
    3. 去数据库中查找是否有指定用户
    4. 找到了并用户名和密码都是正确的，才返回登录成功
   */
  // 1. 获取用户提交表单数据
  const { username, password } = req.body;
  // 3. 去数据库中查找是否有指定用户
  const result = await Users.findOne({username, password: sha1(password)});

  if (result) {
    // 4. 找到了并用户名和密码都是正确的，才返回登录成功页面
    // 返回一个代表用户信息的cookie给浏览器
    // username 会被用户直接写入cookie
    console.log(result);
    res.cookie('user', result._id, {maxAge: 1000 * 3600 * 24 * 7});
    res.redirect('/usercenter');
  } else {
    // 没有找到，用户名或密码错误
    res.render('login', {errorMsg: {usernameError: '用户名或密码错误'}, username});
  }
});

// 暴露出去
module.exports = router;