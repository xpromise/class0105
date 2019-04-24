const mongoose = require('mongoose');

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
