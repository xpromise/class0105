// 引入模块的代码放在最上面
// node核心模块或者npm下载的模块放上面
const express = require('express');
const sha1 = require('sha1');
// 用户自定义的模块放下面
const db = require('./db');
const Users = require('./models/users');
// 唯一的
const app = express();

/*
  需求一：希望用户能通过服务器访问到指定页面
    解决：app.use(express.static('public'));
  需求二：完成注册功能
    1. 设置路由：响应用户提交的注册请求
 */
// 向外暴露静态资源
app.use(express.static('public'));
// 使用内置中间件解析请求体数据
app.use(express.urlencoded({extended: true}));

db
  .then(() => {
    // 需要通过 /login 地址 访问 login.html 页面
    // 目的： 将网址去掉 .html
    app.get('/login', (req, res) => {
      res.sendFile(__dirname + '/public/login.html');
    })
    app.get('/register', (req, res) => {
      res.sendFile(__dirname + '/public/register.html');
    })

    // 应用级中间件，提取重复代码
    app.use((req, res, next) => {

      // 获取获取用户提交的表单数据
      const { username, password, email } = req.body;
      // 创建正则规则
      const usernameReg = /^[a-zA-Z0-9_]{5,10}$/;  // 用户名长度为5-10位，只能是英文、数字和下划线
      const passwordReg = /^[a-zA-Z0-9_]{5,15}$/;  // 密码长度为5-15位，只能是英文、数字和下划线
      const emailReg = /^\w{3,15}@\w{2,5}\.com$/;  // 用户名长度为5-10位，只能是英文、数字和下划线7
      // 再去校验
      if (!usernameReg.test(username)) {
        // 用户名校验失败，返回给用户错误提示
        res.send('用户名长度为5-10位，只能是英文、数字和下划线');
        // 不用再执行后面代码了
        return;
      }

      if (!passwordReg.test(password)) {
        res.send('密码长度为5-15位，只能是英文、数字和下划线');
        return;
      }

      // req.path === '/register' 判断当前请求是注册在请求
      if (req.path === '/register' && !emailReg.test(email)) {
        res.send('邮箱格式不正确');
        return;
      }

      // 来到这里，说明正则校验通过
      next();

    });

    // 确保数据库连接成功后，再进行数据库操作
    app.post('/register', async (req, res) => {
      // 处理注册的逻辑：将用户提交的表单数据保存在数据库中
      /*
        1. 获取用户提交的表单数据
        2. 使用正则表达式检验数据的合法性，如果不合法，直接返回错误提示给用户
        3. 检验密码和确认密码是否一致
        4. 去数据库中检查用户名是否存在，如果存在，直接返回错误提示给用户
        5. 保存用户数据，并且返回成功提示给用户
       */
      // 1. 获取用户提交的表单数据
      const { username, password, rePassword, email } = req.body;
      // 2. 使用正则表达式检验数据的合法性，如果不合法，直接返回错误提示给用户
      /*// 创建正则规则
      const usernameReg = /^[a-zA-Z0-9_]{5,10}$/;  // 用户名长度为5-10位，只能是英文、数字和下划线
      const passwordReg = /^[a-zA-Z0-9_]{5,15}$/;  // 密码长度为5-15位，只能是英文、数字和下划线
      const emailReg = /^\w{3,15}@\w{2,5}\.com$/;  // 用户名长度为5-10位，只能是英文、数字和下划线
      // 再去校验
      if (!usernameReg.test(username)) {
        // 用户名校验失败，返回给用户错误提示
        res.send('用户名长度为5-10位，只能是英文、数字和下划线');
        // 不用再执行后面代码了
        return;
      }

      if (!passwordReg.test(password)) {
        res.send('密码长度为5-15位，只能是英文、数字和下划线');
        return;
      }

      if (!emailReg.test(email)) {
        res.send('邮箱格式不正确');
        return;
      }*/
      // 3. 检验密码和确认密码是否一致
      if (password !== rePassword) {
        // 返回错误提示
        res.send('两次密码输入不一致');
        return;
      }
      // 4. 去数据库中检查用户名是否存在，如果存在，直接返回错误提示给用户
      const result = await Users.findOne({username});
      // 判断用户是否存在
      if (result) {
        // 说明用户已存在
        res.send('用户已存在');
      } else {
        // 说明用户不存在
        // 5. 保存用户数据，并且返回成功提示给用户
        await Users.create({username, password: sha1(password), email});
        res.send(username + '用户注册成功~');
      }

    });

    // 登录功能
    app.post('/login', async (req, res) => {
      /*
        1. 获取用户提交表单数据
        2. 对用户数据进行正则校验
        3. 去数据库中查找是否有指定用户
        4. 找到了并用户名和密码都是正确的，才返回登录成功
       */
      // 1. 获取用户提交表单数据
      const { username, password } = req.body;
      /*// 2. 对用户数据进行正则校验
      const usernameReg = /^[a-zA-Z0-9_]{5,10}$/;  // 用户名长度为5-10位，只能是英文、数字和下划线
      const passwordReg = /^[a-zA-Z0-9_]{5,15}$/;  // 密码长度为5-15位，只能是英文、数字和下划线
      // 再去校验
      if (!usernameReg.test(username)) {
        // 用户名校验失败，返回给用户错误提示
        res.send('用户名长度为5-10位，只能是英文、数字和下划线');
        // 不用再执行后面代码了
        return;
      }

      if (!passwordReg.test(password)) {
        res.send('密码长度为5-15位，只能是英文、数字和下划线');
        return;
      }*/
      // 3. 去数据库中查找是否有指定用户
      const result = await Users.findOne({username, password: sha1(password)});

      if (result) {
        // 4. 找到了并用户名和密码都是正确的，才返回登录成功
        res.send('登录成功~');
      } else {
        // 没有找到，用户名或密码错误
        res.send('用户名或密码错误');
      }
    });

  })
  .catch();

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});