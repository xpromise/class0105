/*
  1. 执行async函数，返回值是promise对象
    (默认是pending状态，当async函数代码全部执行完毕就是resolved状态，如果有一个失败就是rejected状态)
    通过函数内部指定return ，来指定最终async函数返回的promise对象内部的值
  2. promise由then/catch方法：
      这些方法的返回值默认是成功状态的promise对象，如果想要失败状态的promise对象，就需要自己返回一个Promise.reject()
 */

/*async function fn() {
  // await new Promise((resolve) => setTimeout(function () {
  //   console.log(111);
  //   resolve();
  // }, 1000));
  // console.log(222);
  return 123;
}

const result = fn();
console.log(result); // Promise { undefined }  Promise { pending }*/

new Promise((resolve, reject) => {
  setTimeout(() => {
    reject();
  }, 0);
})
  .then((res) => {
    console.log(111);
  })
  .catch((err) => {
    console.log(222);
    // return 456789;
    return Promise.reject();
  })
  .then((res) => {
    console.log(res);
  })
  .catch(() => {
    console.log(444);
  })

