/*
  实现：将一个文件复制到另外一个位置
 */

const fs = require('fs');

// 创建一个可读流
const rs = fs.createReadStream('C:\\Users\\XiongJian\\Desktop\\流失写入文件.avi');
// 创建一个可写流
const ws = fs.createWriteStream('./test.avi');

/*
rs.once('open', function () {
  console.log('文件开始读取');
})
// 可读流会自动关闭
rs.once('close', function () {
  console.log('文件读取完毕');
  // 关闭可写流
  ws.end();
})

// 查看读取的内容
rs.on('data', function (data) {
  ws.write(data);
})*/

// 简写方式
rs.pipe(ws);
