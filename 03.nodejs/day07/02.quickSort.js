/*
  快速排序: http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 */

function quickSort(arr) {

  // 判断数组的长度，如果小于等于1，就直接退出
  if (arr.length <= 1) return arr;

  // 找到中间的基准值
  const index = Math.floor(arr.length / 2);
  // 取出基准值对应的元素: 从数组移除元素
  const result = arr.splice(index, 1)[0];

  // 比基准值小的放左边  比基准值大的放右边
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];

    if (item < result) {
      // 小于的元素
      leftArr.push(item);
    } else {
      // 大于等于的元素
      rightArr.push(item);
    }
  }

  // const left = quickSort(leftArr);
  // const right = quickSort(rightArr);
  // return left.concat([result], right);
  // 返回  左边 + 基准值 + 右边
  return quickSort(leftArr).concat([result], quickSort(rightArr));
}

const arr = [40, 2, 5, 87, 36, 92, 5, 8 , 39, 34, 55];

const result = quickSort(arr);

console.log(result);