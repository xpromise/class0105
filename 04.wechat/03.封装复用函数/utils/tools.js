const { writeFile, readFile } = require('fs');

function writeFileAsync(fileName, data) {
  return new Promise((resolve, reject) => {
    // 不能直接保存对象数据，需要转换为json字符串
    writeFile(fileName, JSON.stringify(data), (err) => {
      if (!err) {
        resolve();
      } else {
        reject();
      }
    })
  })
}

function readFileAsync(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (!err) {
        resolve(JSON.parse(data.toString()));
      } else {
        reject(err);
      }
    })
  })
}

function isValid(data) {
  return data.expires_in > Date.now();
}

module.exports = {
  writeFileAsync,
  readFileAsync,
  isValid,
}