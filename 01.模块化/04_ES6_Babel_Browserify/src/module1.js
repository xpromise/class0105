/*
  默认暴露
 */

/*function Person(name, age) {
  // 给实例对象添加属性
  this.name = name;
  this.age = age;
}
// 给原型上添加方法，实例对象就继承了~
Person.prototype.setName = function (name) {
  this.name = name;
}*/

// 语法糖：对旧语法的简写
class Person{
  constructor(name, age) {
    // 给实例对象添加属性
    this.name = name;
    this.age = age;
  }
  // 给原型上添加方法，实例对象就继承了~
  setName(name) {
    this.name = name;
  }
}

// 默认暴露
export default Person;