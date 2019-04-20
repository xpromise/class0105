/*
  fs.readFile(path[, options], callback)
 */

const fs = require('fs');

fs.readFile('./c.txt', function (error, data) {
  if (!error) {
    // data是读取的文件内容，默认是buffer数据
    console.log(data.toString());
  } else {
    console.log(error);
  }
})