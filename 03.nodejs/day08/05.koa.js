const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 创建App应用对象
const app = new Koa();

// 引入第三方中间件解析请求体数据
app.use(bodyParser());

// 设置中间件
app.use((context, next) => {
  // 接受请求参数
  // console.log(context.query.username); // 查询字符串参数
  context.body = context.request.body;
  console.log(context.body);
  // 返回响应
  context.body = '这是服务器返回的响应~';
});

// 监听端口好
app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了·');
  else console.log(err);
});