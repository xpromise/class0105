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
 */
app.use((req, res, next) => {
  console.log('中间件1执行了');
  console.log(req.query);

  // res.end('11111');

  next();
});

app.get('/', (req, res) => {
  console.log('路由执行了~');
})

app.use((req, res, next) => {
  console.log('中间件2执行了');
  console.log(req.query);

});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})


