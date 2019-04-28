/*
  数组去重
 */

// const arr = [1, 3, 5, 8, 8, 5, 9, 6, 3, 7];

const arr = [];

for (var i = 0; i < 100000; i++) {
  arr.push(Math.floor(Math.random() * 10000));
}

/*Array.prototype.unique = function () {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    let item1 = this[i];
    // 定义一个重复的标识：默认是没有重复的
    let isRepeat = false;
    for (let j = 0; j < newArr.length; j++) {
      let item2 = newArr[j];
      if (item1 === item2) {
        // 说明新数组中存在item1这个元素，就不添加进行
        isRepeat = true;
        // 新数组中已经存在原来的这个数，需要退出当前循环
        break;
      }
    }
    // 只有重复的标识为false时，才添加当前元素
    if (!isRepeat) {
      newArr.push(item1);
    }
  }

  return newArr;
};*/

/*Array.prototype.unique = function () {
  const obj = {};
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    const item = this[i];
    // 对象的同名属性，只会保留一个
    obj[item] = 0;
  }
  /!*for (let key in obj) {
    newArr.push(+key);
  }*!/
  // return newArr;
  return Object.keys(obj);
};*/

Array.prototype.unique = function () {
  return [...new Set(this)];
};

const startTime = Date.now();
const newArr = arr.unique();
const endTime = Date.now();
console.log(endTime - startTime);  // 1400 ms  376ms  8ms

// console.log(newArr);