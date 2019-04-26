const express = require('express');
const app = express();
/*
  场景：我需要在页面中渲染错误提示数据
  解决: 服务器渲染技术

  ejs：
    1. 是什么？
      高效的 JavaScript 模板引擎。 用来编译运行js模板代码的，性能高
      之前文件 html  模板代码文件 ejs
    2. 作用：
      用来服务器渲染：将位于服务器端的数据渲染到指定页面上
    3. 使用：
      - 下载ejs
        npm i ejs
      - 配置项：
        告诉express，你的模板资源放在哪里。（才能找到）
          app.set('views', '模板资源目录');
        告诉express，你使用哪个模板引擎解析模板资源
          app.set('view engine', '使用哪个模板引擎解析模板资源')
 */
// views就是模板资源目录
app.set('views', './views');
// 使用ejs解析模板资源
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // 错误提示
  const err = '<h1>用户名密码错误</h1>';
  const data = [{name: 'jack', age: 18}, {name: 'jack', age: 18}, {name: 'jack', age: 18}, {name: 'jack', age: 18},{name: 'jack', age: 18},{name: 'jack', age: 18},]
  // 使用配置好的模板引擎解析传入的模板资源
  // 将指定数据渲染到ejs页面上, 并返回渲染完成数据的页面给前端   res.render('模板页面', 指定数据)
  // 指定数据：必须是对象结构
  res.render('index.ejs', {err, data});
})

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})