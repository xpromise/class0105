/*
  await关键字只能在async函数中使用
  作用：
    1. 等待: 只会等待promise对象，其他内容都不等
      当promise内部状态变成成功的状态时，就不等了
      当promise内部状态变成失败的状态时，中断async函数的执行（后面戴代码不执行了），并报错
    2. 提取promise对象成功状态的返回值，赋值给左边
 */


(async () => {

  await setTimeout(() => {
    console.log('1');
  }, 3000);

  await console.log('2');

  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3');
      resolve(111);
    }, 2000)
  })

  /*result
    .then((res) => {
      console.log(res); // 111
    })*/

  console.log(result); // promise  111

  console.log('4~');
})();
