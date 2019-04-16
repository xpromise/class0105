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
  /*
    数组的简单方法：push、unshift、pop、splice... 会影响原数组（会修改原数组数据）
    数组的高级方法：
      reduce 统计、求和、累加。。。 计算购物车的总价
      forEach 遍历
        for循环 （用来遍历数组） 性能最好，一般不用
        for in循环 （用来遍历对象（多）、数组（极少））
        for of循环 （用来遍历有iterator接口的容器，对象默认不行）
        forEach（用来遍历数组）
        while循环 （一般用来取代递归函数：函数内部调用自己函数）

        数组 --> forEach((item, index) => {})  item在前写的时候就可以省略index
        对象 --> for in
      map：用来对原数组进行加工处理，生成新数组（不会修改原数组），新数组长度和原数组一样，但内容往往发生变化
        对原数据进行加工显示，显示加工后的数据
      filter：用来对原数组进行加工处理，生成新数组（不会修改原数组），新数组长度比原数组更少，但内容不会变化
        对原数据进行过滤显示，只显示符合条件的数据
   */

  return args.reduce((previous, current) => previous + current, 0);
}

// 暴露出去
// module.exports = sum;
module.exports.sum = sum;