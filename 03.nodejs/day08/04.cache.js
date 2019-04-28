const express = require('express');
// 使用解构赋值
const { readFile } = require('fs');
const app = express();

/*
  缓存策略：
    1. 强制缓存：
      响应头中：
        cache-control  http1.1  优先级更高
        expires http1.0

      什么资源会强制缓存：长久不变的资源：logo、jquery

    2. 协商缓存
      etag / last-modified 位于响应头
      if-none-match / if-modified-since 位于请求头

      什么资源协商缓存: 会经常发生变化的资源。

    流程：
      1. 首先看 强制缓存
        - 如果http协议是1.1 就看cache-control
          - max-age的值 + date 看这个值有没有过期
            - 如果过期了。存在协商缓存就看协商缓存，不存在就直接发送请求读取最新的数据
            - 如果没有过期，不会发送请求，直接读取缓存的数据
        - 如果http协议是1.0 就看expires
          - 他的值直接就是过期时间
            - 如果过期了。存在协商缓存就看协商缓存，不存在就直接发送请求读取最新的数据
            - 如果没有过期，不会发送请求，直接读取缓存的数据

      2. 协商缓存
        - 第一次：由服务器返回资源文件给浏览器，
        此时会携带最新的etag（标识文件内容有没有变化）和last-modified（标识修改最近文件修改时间）作为响应头返回给浏览器
        - 下次：浏览器发送请求时，会作为请求头自动携带上if-none-match（上次etag的值） / if-modified-since（上次last-modified的值）
        服务器接受了。
          - 首先判断if-none-match和服务器最新的etag
            如果有检查是否变化：
              如果变化了。返回新文件给浏览器，状态码为200
              如果没有变化，返回状态码304，浏览器就会自动读取缓存
            如果没有if-none-match和服务器最新的etag，才会看if-modified-since
         -  然后判断if-modified-since和last-modified的值
          如果变化了。返回新文件给浏览器，状态码为200
          如果没有变化，返回状态码304，浏览器就会自动读取缓存

 */

app.get('/', (req, res) => {
  readFile('./public/index.html', function (err, data) {
    if (!err) {
      // 通过end方法，将读取好的html文件（buffer）响应回去
      res.end(data);
    } else {
      console.log(err);
    }
  });
});

// 设置路由
app.get('/test.js', (req, res) => {
  console.log('test.js路由触发了~~');
  readFile('./public/test.js', function (err, data) {
    if (!err) {
      // 设置强制缓存
      res.set('cache-control', 'max-age=86400'); //强制缓存1天
      res.set('expires', new Date(Date.now() + 1000 * 3600 * 24).toGMTString()); //强制缓存1天

      res.end(data);
    } else {
      console.log(err);
    }
  });
})

// 在外面初始化 etag 和 lastModified
let etag = '222';
let lastModified = Date.now();

app.get('/test2.js', (req, res) => {
  console.log('test2.js路由触发了~~');

  // 第二次判断请求头中if-none-match / if-modified-since 和 位于服务器的  etag last-modified 的值是否一致
  // 获取请求头 if-none-match
  const ifNoneMatch = req.get('if-none-match');

  if (ifNoneMatch) {
    // 判断是否相等
    if (ifNoneMatch === etag) {
      // 如果相等，走协商缓存，返回状态码304
      res.status(304).end();
    } else {
      readFileAsync(res);
    }
  } else {
    // 说明ifNoneMatch不存在，看last-modified的值
    const ifModifiedSince = Date.parse(req.get('if-modified-since'));

    if (ifModifiedSince === lastModified) {
      // 如果相等，走协商缓存，返回状态码304
      res.status(304).end();
    } else {
      // 不相等，说明文件发生了变化，返回新的文件（新的etag和last-modified）
      readFileAsync(res);
    }
  }

})

function readFileAsync(res) {
  // 不相等，说明文件发生了变化，返回新的文件（新的etag和last-modified）
  readFile('./public/test2.js', function (err, data) {
    if (!err) {
      // 设置协商缓存  etag last-modified
      // 第一次返回新资源和 etag last-modified
      res.set('etag', etag);
      res.set('last-modified', new Date(lastModified).toGMTString());

      res.end(data);
    } else {
      console.log(err);
    }
  });
}

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})