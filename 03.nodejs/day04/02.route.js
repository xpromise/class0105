const express = require('express');
const app = express();

/*
  路由(route)：
    1. 组成：
      请求方式 method : GET POST PUT DELETE
      请求路径： 定义访问服务器的网址
          一对一：
            '/'  --> http://localhost:3000/
            '/login'  --> http://localhost:3000/login
         多对一：
          '/hotel/:xxx' --> http://localhost:3000/hotel/123  http://localhost:3000/hotel/456
          正则表达式： /\/shop\/(1\d{2}|200)/ --> http://localhost:3000/shop/123 ...

       请求方式和请求路径：当服务器接收到请求后，遍历所有的路由，只有满足了请求方式和请求路径这两个条件，才会由这个路由处理

       回调函数（句柄函数、钩子函数）：用来处理请求，返回响应的函数
        request 请求信息：浏览器给服务器
          req.params 获取params参数：请求路径的:id
          req.query  获取查询字符串参数
          req.body   获取请求体参数(默认express服务器不解析请求体数据，所以默认{})

          req.headers  获取请求头所有信息
          req.get()   获取请求头中一条信息

          req.cookies 获取cookie
        response 响应信息：服务器给浏览器
          // 返回响应的方法
          res.download(文件路径) 返回一个文件，浏览器会自动下载
          res.sendFile(文件路径) 返回一个文件，浏览器会自动打开展示
          res.end()  快速返回响应，响应内容不做任何处理
          res.json()  将响应内容转化为json字符串，在返回响应
          res.send()  根据不同的响应内容，做不同的处理
            如果是buffer数据，就会设置一个响应头 Content-Type: application/octet-stream
            如果是string数据，就会设置一个响应头 Content-Type: text/html;charset=utf8
            如果是object/array数据，就转化为json字符串，在返回响应
          res.redirect()  请求资源重定向，重定向到新的网址

          // 设置响应信息
          res.get()  获取响应头信息
          res.set()  设置响应头信息
          res.status() 设置响应状态码

        自动检测代码的变化，一旦变化，会自动重启服务器
        - 下载
          npm i nodemon -g
        - 启动项目
          右键 + run
          nodejs xxxx

          需要使用 nodemon xxx
   2. 是什么？
     一种key-value映射关系：key值的是请求路径path，value指的是回调函数callback
   3. 作用：
     接收请求、返回响应
     定义请求路径（定义访问服务器的网址）
   4. 执行规则：
    express会将所有路由按照先后顺序添加一个数组中。
    当请求访问服务器时，服务器就会遍历这个数组，取出路由看是否匹配(请求方式和请求路径)
    满足条件就会执行路由的回调函数。然后请求终止了~（后面的就不看了）
    不满足条件，再看下一个路由看是否满足条件，如果都没满足呢？返回404 cannot get /xxx
 */

// GET请求方式路由
app.get('/', (req, res) => {
  // console.log(req.query); // { username: 'aaa', age: '18' }

  // console.log(req.headers);
  // console.log(req.get('accept'));

  // 注意：在一个路由中，返回响应有且只能一次
  // res.send('这是服务器响应~');
  // res.download('./01.面试题.js');
  // console.log(__dirname); // 服务器处理绝对路径问题的
  // res.sendFile(__dirname + '/01.面试题.js');

  // 设置响应头信息
  res.set('content-type', 'text/html;charset=utf8');
  console.log(res.get('content-type'));

  res.status(500).end('这是服务器响应~');
  // res.json({name: 'jack', age: 18});


  // res.redirect('https://www.baidu.com');
});
// POST请求方式路由
app.post('/shop/a', (req, res) => {

});

app.get('/hotel/:id', (req, res) => {
  // 区别不同页面：得到id值
  console.log(req.params); // { id: '123456' }
  res.send('这是服务器返回的响应·');
});

app.get(/\/shop\/(1\d{2}|200)/, (req, res) => {
  res.send('这是正则表达式路由，服务器返回的响应·');
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功~');
  else console.log(err);
});