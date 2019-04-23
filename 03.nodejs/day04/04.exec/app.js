// 引入模块的代码放在最上面
// node核心模块或者npm下载的模块放上面
const express = require('express');
// 用户自定义的模块放下面
const db = require('./db');
const Users = require('./models/users');

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
    // 确保数据库连接成功后，再进行数据库操作
    app.post('/register', (req, res) => {
      // 处理注册的逻辑：将用户提交的表单数据保存在数据库中
      /*
        1. 获取用户提交的表单数据
        2. 使用正则表达式检验数据的合法性，如果不合法，直接返回错误提示给用户
        3. 去数据库中检查用户名是否存在，如果存在，直接返回错误提示给用户
        4. 保存用户数据，并且返回成功提示给用户
       */

      // 1. 获取用户提交的表单数据
      const { username, password, rePassword, email } = req.body;
      // 2. 使用正则表达式检验数据的合法性，如果不合法，直接返回错误提示给用户
      // 创建正则规则
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
      }
      // 3. 检验密码和确认密码是否一致
      if (password !== rePassword) {
        // 返回错误提示
        res.send('两次密码输入不一致');
        return;
      }
      // 4. 去数据库中检查用户名是否存在，如果存在，直接返回错误提示给用户
      // 5. 保存用户数据，并且返回成功提示给用户


    })
  })
  .catch()



app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});