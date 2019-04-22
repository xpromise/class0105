// 引入db模块
const db = require('./db'); // 如果目录下有index.js文件，可以省略不写，最终找的还是index.js模块
// 引入模型对象
const Students = require('./models/students');
const Teachers = require('./models/teachers');

// 使用db模块
db
  .then(async () => {
    // 数据库连接成功~ 才能操作数据库
    const result1 = await Students.create({name: 'jack', age: 18, sex: '男'});
    const result2 = await Teachers.create({name: 'jack', age: 18, sex: '男'});
    console.log(result1, result2);
  })
  .catch(() => {
    // 数据库连接失败~

  })

