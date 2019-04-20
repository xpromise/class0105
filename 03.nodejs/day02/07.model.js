/*
  1. 引入mongoose
  2. 连接本地mongodb数据库
  3. 创建Schema模式对象
  4. 创建Model模型对象
  5. 创建Document文档对象
  6. 保存数据
 */

// 1. 引入mongoose
const mongoose = require('mongoose');
// 2. 连接本地mongodb数据库
mongoose.connect('mongodb://localhost:27017/mongoose_test', { useNewUrlParser: true, useCreateIndex: true });

const promise = new Promise((resolve, reject) => {
  // 绑定数据库连接事件
  mongoose.connection.once('open', (error) => {
    if (!error) {
      console.log('数据库连接成功了~');
      // 将promise对象状态改成成功的状态
      resolve();
    } else {
      console.log('数据库连接失败~', error);
      // 将promise对象状态改成失败的状态
      reject();
    }
  })
});

(async () => {
  // 等待数据库连接成功
  await promise;

  // 3. 创建Schema模式对象
  const Schema = mongoose.Schema;
  // 通过Schema对象创建一个针对集合中的文档的约束对象
  const stuSchema = new Schema({
    // 这个对象就是用来约束集合中文档的对象
    // 里面放置着约束条件（1. 约束文档可以保存哪些属性 2. 约束文档中属性的值的类型）
    name: String,
    age: Number,
    hobby: [String], // 值是数组，数组里面必须放字符串
    info: Schema.Types.Mixed, // 混合，什么数据类型都行
    phone: {
      type: String,
      unique: true, // 唯一的
      required: true, // 必须的
      // default: '11111111111' // 默认值
    }
  })
  // 4. 创建Model模型对象
  const Students = mongoose.model('students', stuSchema);

  /*
   模型对象方法：CRUD 增删改查
    - create 增
      Model.create(文档对象, 回调函数)  函数返回值是undefined
      Model.create(文档对象) 函数返回值是promise对象
        创建一条文档对象 文档对象就是对象
        创建多条文档对象 文档对象就是数组
    - read 查
      Model.find(查询条件[, 投影], 回调函数) 找没找到，返回值都是一个数组
      Model.findOne(查询条件[, 投影], 回调函数) 会返回找到的第一个文档对象，没有找到是null
        - 操作符：
          1. < <= > >= !=  $lt $lte $gt $gte $ne
          2. 或  $or $in
          3. 正则表达式
        - 投影：用来过滤一些不想要的数据
          如果是 xxx: 0 ，这时候就是过滤掉指定属性，而其他属性保留
          如果是 xxx: 1 ，这时候就是保留指定属性，而过滤掉其他属性

          一般不能混着用。 _id例外
    - update 改
      Model.updateOne(查询条件, 要更新的内容)  更新一个
      Model.updateMany(查询条件, 要更新的内容) 更新多个
    - delete 删
      Model.deleteOne(查询条件)
      Model.deleteMany(查询条件)
   */
  const result = await Students.deleteOne({name: '汪伦'});

  // const result = await Students.updateOne({name: '汪伦'}, {age: 21});

  // const result = await Students.findOne({age: 18, name: '汪伦'});
  // const result = await Students.findOne({age: {$gte: 20}});
  // const result = await Students.find({$or: [{age: 16}, {age: 18}]});
  // sort({age: 1}) 年龄按照从小到大的顺序排序  sort({age: -1}) 年龄按照从大到小的顺序排序
  // const result = await Students.find({age: {$in: [16, 18]}}).sort({age: -1});
  // 模糊匹配
  // const result = await Students.find({name: /^汪/}, {__v: 0, _id: 0});
  // const result = await Students.find({name: /^汪/}, {__v: 1, _id: 1});
  // const result = await Students.find({name: /^汪/}, {name: 1, _id: 0});

  /*const result = Students.create({
    name: 'rose',
    age: 16,
    hobby: ['jack'],
    phone: '3333333333',
    info: 'i like jack'
  }, (error) => {
    // 在nodejs中回调函数默认的第一个参数，往往都是error 错误对象
    // 这个机制叫做错误优先机制。nodejs要求开发者优先处理错误
    if (!error) {
      console.log('数据保存成功');
    } else {
      console.log(error);
    }
  })*/

  /*const result = await Students.create([{
    name: '汪伦',
    age: 20,
    hobby: ['睡觉', '迟到'],
    phone: '66666666666',
    info: '不及汪伦送我钱'
  }, {
    name: '汪伦',
    age: 20,
    hobby: ['睡觉', '迟到'],
    phone: '77777777777',
    info: '不及汪伦送我钱'
  }])*/

  console.log(result);


})();

