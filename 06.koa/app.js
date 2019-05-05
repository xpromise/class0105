const Koa = require('./my-koa/application');

const app = new Koa();

app.use((context, next) => {
  console.log('中间件执行了11~');
  next();
  /*
    dispatch(1)
      -->
        ((req, res, next) => {
          console.log('中间件执行了22~');
          res.end('success');
          next();
        })()
   */
});

app.use((context, next) => {
  console.log('中间件执行了22~');
  // res.end('success');
  context.body = {name: 'jack'};
  next();
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})
