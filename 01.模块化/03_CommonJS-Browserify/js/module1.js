// 模块一

function sum(...args) {
  /*
    ...args  真数组
    arguments 伪数组：只有数组length和通过下标取/赋值

     args.reduce((previous, current) => {}, initValue)
     previous 上次函数返回值
     current 当前遍历数据的元素
     initValue 就是第一次 previous 的值
   */
  return args.reduce((previous, current) => previous + current, 0);
}

// 暴露出去
// module.exports = sum;
module.exports.sum = sum;