/*
  flat方法：用于扁平化数组
 */

const arr = [1, [2], [[3], [4]], [[[5]]]];

function flat(arr) {
  /*
    什么时候函数需要形参：如果函数内部需要使用函数外部的数据，传参
   */
  // 初始化是一个空数组
  let result = [];

  // [[3], [4]] --> [3]  [4]
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      // 元素是数组
      // concat连接数据的方法，它不会修改原数组
      result = result.concat(flat(item)); // 每次调用flat方法  返回一个result
    } else {
      // 元素不是数组
      result.push(item);
    }
  })

  // 返回一个扁平化后的数组
  return result;
  
}

console.log(flat(arr));

Array.prototype.flat = function () {
  /*
    什么时候函数需要形参：如果函数内部需要使用函数外部的数据，传参
   */
  // 初始化是一个空数组
  let result = [];
  // this指向调用方法的这个对象 -- arr
  this.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(item.flat()); // 每次调用flat方法  返回一个result
    } else {
      // 元素不是数组
      result.push(item);
    }
  })
  // 返回一个扁平化后的数组
  return result;
};

console.log(arr.flat());
/*
  1. 绝大部分使用let定义变量，只有确定不变的量用const，90%的变量都是let定义的
  2. 绝大部分使用const定义变量，只有确定可变的量用let，90%的变量都是const定义的

  使用哪种方式：看我们定义的量是常量居多还是变量居多
    我们在实际项目中常量居多
  不确定一个量到底是变量还是常量：默认用const定义，只有将来变化了，在改为let
 */


