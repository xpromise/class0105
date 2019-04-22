/*
  此模块用来创建集合的
 */
const mongoose = require('mongoose');
// 引入common
const common = require('../common');

// 创建约束对象
const studentsSchema = new mongoose.Schema(common);
// 创建集合
const Students = mongoose.model('students', studentsSchema);
// 暴露出去
module.exports = Students;