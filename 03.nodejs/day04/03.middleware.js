// file --> settings --> editor --> live templates
const express = require('express');
const app = express();

/*
  中间件middleware：
    1. 是什么？
      本质上是一个函数
    2. 组成:
      request 和路由一致，都是请求信息
      response 和路由一致，都是响应信息
      next 函数，作用：用来调用堆栈下一个中间件函数
    3. 作用:
      执行任意代码（函数）
      接收请求(所有请求都能接收)，返回响应
      调用堆栈下一个中间件函数/路由
    4. 执行规则：
      express会将所有路由和中间件按照先后顺序添加一个数组中。
        当请求访问服务器时，服务器就会遍历这个数组，取出对应中间件（所有请求都匹配）/路由看是否匹配(请求方式和请求路径)
        满足条件就会执行路由/中间件的回调函数。
          如果中间件调用了next方法，还会看一下路由或者中间件
          如果没有调用，请求终止了~（后面的就不看了）
        不满足条件，再看下一个路由/中间件看是否满足条件，如果都没满足呢？返回404 cannot get /xxx
    5. 应用：
      内置中间件：
        指得是express框架内置的一些直接可以使用的中间件函数
        express.static() 用来向外暴露服务器的静态资源
        express.urlencoded({extended: true}) 用来解析请求体参数
      第三方中间件
        指得是其他社区开发者开发的开源中间件
        cookieParser() 用来cookie数据
      应用级中间件
        开发者自己开发的中间件：
          提取重复代码
      路由器中间件
      错误处理中间件
        用来处理中间件/路由的错误: 必须传四个参数
        app.use((err, req, res, next) => {})
 */

// 引入内置中间件解析请求体参数
app.use(express.urlencoded({extended: true}));
// 向外暴露静态资源（长期不会发生变化的资源），外部就能直接访问静态资源
app.use(express.static('public'));

app.post('/', (req, res) => {
  console.log('路由执行了~');
  // 接收post请求请求体参数
  console.log(req.body); // { username: 'sunwukong', password: '123123' }
  console.log(a);
});

// 后面所有的路由和中间件都需要被其处理
app.use((req, res, next) => {
  // 接收请求参数
  const { username, password } = req.query;
  // 正则验证
  const usernameReg = /^[0-9]$/;

  if (!usernameReg.test(username)) {
    // 正则校验失败
    res.send('error');
    return;
  }

  // 通过正则验证
  next();
})

// 只针对于特定的路由去处理
function reg(req, res, next) {
  // 接收请求参数
  const { username, password } = req.query;
  // 正则验证
  const usernameReg = /^[0-9]$/;

  if (!usernameReg.test(username)) {
    // 正则校验失败
    res.send('error');
    return;
  }

  // 通过正则验证
  next();
}

app.get('/login', reg, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/register', (req, res) => {
  // 返回文件
  res.sendFile(__dirname + '/public/index.html');
})


app.use((err, req, res, next) => {
  console.log(err);
  res.end('error');
})


app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})


