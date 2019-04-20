/*
  fs.createReadStream(path)
 */

const fs = require('fs');

// 创建一个可读流
const rs = fs.createReadStream('C:\\Users\\XiongJian\\Desktop\\流失写入文件.avi');

rs.once('open', function () {
  console.log('文件开始读取');
})
// 可读流会自动关闭
rs.once('close', function () {
  console.log('文件读取完毕');
})

// 查看读取的内容
rs.on('data', function (data) {
  console.log(data.length); // 65536 byte --- 64 kb
})