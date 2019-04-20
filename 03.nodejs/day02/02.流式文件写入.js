/*
  流式文件写入
    fs.createWriteStream(path)
    将文件内容一段一段分别写入
 */

const fs = require('fs');
// 创建一个可写流
let ws = fs.createWriteStream('./d.txt');

// 监听写入状态（什么时候开始写入，什么时候写入完毕）
// 绑定一次性事件，执行一次后会自动的解绑
ws.once('open', function () {
  console.log('文件开始写入了~');
})
// 没有触发文件写入完毕，导致文件流一直在等待。
// 内存泄漏： 占用一片内存，但是没有实际用途
// 内存溢出： 超过了当前内存的最大空间，直接崩溃
ws.once('close', function () {
  console.log('文件写入完毕~');
})

// 要往文件中写入内容
ws.write('态度');
ws.write('细节');
ws.write('目标');
ws.write('行动');

// 手动关闭可写流
ws.end();

ws = null;

