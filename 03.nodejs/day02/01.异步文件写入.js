/*
  fs - file system 文件系统
    异步文件写入
    fs.writeFile(path, data[, options], callback)
      - path 要写入文件路径
      - data 要写入文件的内容
      - options 可选值（可传可不传）：一定有默认值
        配置对象：属性名固定的对象
        mode: 设置文件操作权限，默认值是0o666
          0o111 文件可执行
          0o222 文件可写入
          0o444 文件可读取
          0o666 文件可读可写
        flag: 要怎么操作当前文件，默认值是 'w'
          'w'  写入文件
          'r'  读取文件
          'a'  追加文件
      - callback 回调函数（当文件写入成功/失败，都会触发当前回调函数）
        - error 错误对象
          如果有错误，值就是对象，对象里面包含出错原因
          如果没有错误，值就是null

 */
// fs是nodejs的核心模块，需要用户手动引入才能使用
const fs = require('fs');

// 异步写入文件
fs.writeFile('./c.txt', '今天天气真晴朗', {mode: 0o666, flag: 'a'}, function (error) {
  if (!error) {
    // 方法没出错
    console.log('文件写入成功~');
  } else {
    console.log('文件写入失败', error);
  }
})