/*
  浏览器中js由什么组成：
    DOM 文档对象模型 -- document 操作DOM
    BOM 浏览器对象模型 -- window 操作浏览器
    ESMA SCRIPT规范 -- 详细的js语法规范
  nodejs中js包含哪些方面：
    不包含DOM
    基本不包含BOM，但少量的一些好用的方法保留下来了
      console
      setTimeout / setInterval
    基本包含全部的ESMA SCRIPT规范

  nodejs中全局对象叫 global
    console
    Buffer
    process.nextTick  立即执行函数
    setTimeout / clearTimeout
    setInterval / clearInterval
    setImmediate / clearImmediate  立即执行函数
 */

// console.log(global);
process.nextTick(() => {
  console.log('process.nextTick执行了');
})

setImmediate(() => {
  console.log('setImmediate执行了');
})

setTimeout(() => {
  console.log('setTimeout执行了');
}, 1000)

console.log('所有全局代码执行完了');
/*
 nodejs的事件轮询机制：
  概念：用来执行处理异步代码
  分为6个阶段：
    1. timers定时器阶段
      执行定时器到点的回调函数（所有定时器setTimeout / setInterval的回调函数都在这个阶段执行）
    2. idle,prepare准备阶段
      TCP错误回调
    3. 系统阶段
      系统内部使用
    4. poll轮询阶段
      会执行绝大部分的回调函数，里面有一个回调队列，这个队列就保存着所有要执行的回调函数
      查看回调队列是否有回调函数
        有
          依次取出，同步执行。
          直到全部执行完毕，或者系统出错
        没有
          如果之前设置过 setImmediate 函数，就回去第五个阶段，如果之前没有设置过，就一直在第四阶段（当前阶段）停留
          如果定时器到点了，为了去第一阶段执行定时器的回调函数，它也得去第五阶段
    5. check检查阶段
      只负责执行 setImmediate 的回调函数
    6. 关闭阶段
      执行关闭事件的回调函数  close  end ...

    process.nextTick 能在任意阶段，优先执行

    事件轮询就是反复执行这6个阶段的函数。从第一个阶段开始，到第六个阶段结束，再重新执行第一个阶段....
 */