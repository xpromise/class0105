// http模块是nodejs核心模块
const http = require('http');

// 通过http模块来创建服务
const server = http.createServer((request, response) => {
  /*
    request 请求信息：客户端发送请求到服务器
    response 响应信息: 服务器响应给客户端
   */
  // charset=utf-8 告诉浏览器请你用utf8解码
  // text/html 告诉浏览器当前返回的响应是一个html文本
  response.setHeader('content-type', 'text/html;charset=utf-8');

  // 返回一个响应给客户端
  // 修改了服务器代码，一定要重启服务器
  response.end('<h1>这是nodejs返回的响应</h1>');
})

// 通过server监听端口号
// 端口号： 27017  系统想要运行某个东西，必须运行在某一个端口号上。如果有其他程序占用了端口号，就不能再使用了。
// 1 - 65536  三位数以下的端口号，往往都被系统占用了，不建议使用
// 建议使用 3000 4000 3030 8080 8000....
// 访问服务器的地址: http://localhost:3000
server.listen(3000, (err) => {
  if (!err) {
    console.log('服务器启动成功了~');
  } else {
    console.log('服务器启动失败了~', err);
  }
})
