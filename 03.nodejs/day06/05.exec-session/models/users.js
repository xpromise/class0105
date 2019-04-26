const mongoose = require('mongoose');

// 允许用户新增、修改(对type的修改可以，但是对required、unique没用) , 不允许删除（我们的删除操作没有任何作用）
// 删库、换一个数据库等
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // 保证唯一性
    required: true, // 保证必须有值
  },
  password: {
    type: String,
    required: true, // 保证必须有值
  },
  email: {
    type: String,
    unique: true, // 保证唯一性
    required: true, // 保证必须有值
  }
});

module.exports = mongoose.model('users', usersSchema);
