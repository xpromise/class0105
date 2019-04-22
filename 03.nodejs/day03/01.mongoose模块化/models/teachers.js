/*
  此模块用来创建集合的
 */
const mongoose = require('mongoose');
// 引入common
const common = require('../common');

// 浅度克隆的方法：将 Object.assign(源对象, 要克隆的目标对象, 要克隆的目标对象, 要克隆的目标对象...);
// 将要克隆的目标对象上的属性和方法复制到源对象上
const result = Object.assign(common, {sex: String}, {hobby: [String]});

// 创建约束对象
const teachersSchema = new mongoose.Schema(result);
// 创建集合
const Teachers = mongoose.model('teachers', teachersSchema);
// 暴露出去
module.exports = Teachers;