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
  // 5. 创建Document文档对象
  const s1 = new Students({
    name: 'jack',
    age: 18,
    hobby: ['rose'],
    info: '这是一个coder',
    phone: '222222222'
  })
  console.log(s1);
  // 6. 保存数据
  s1.save((error) => {
    if (!error) {
      console.log('数据保存成功~');
    } else {
      console.log(error);
    }
  });
})();

