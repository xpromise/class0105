/*
  call、apply、bind
    相同点：三者都能改变函数调用时this指向。
    不同点:
      call  第一个是要改变this指向的对象，后面参数是要调用函数传入的参数（以逗号隔开）
      apply 第一个是要改变this指向的对象，第二个参数是一个数组（数组里面有函数调用的参数）
      bind 传参和call一样。 不会执行函数，返回一个this改变后的函数
 */

const obj1 = {
  fn(x, y) {
    console.log(x, y);
    console.log(this);

    return 789;
  }
};

const obj2 = {
  a: 123
};

/*
obj1.fn.call(obj2, 123, 456); // obj2
obj1.fn(); // obj1
obj1.fn.apply(obj2, [123, 456]);
obj1.fn.bind(obj2, 123, 456)();
*/

Function.prototype.call1 = function (context, ...args) {
  // ...args 代表除第一个参数以外，剩下的参数
  // context 就是要修改this指向的对象
  context._fn = this;
  const result = context._fn(...args); // _fn函数的this就指向context
  // 删除对象上多余的属性
  delete context._fn;
  // console.log(this); // obj1.fn --> obj1.fn.call1() 所以 call1函数的this就指向调用方法的对象
  // this(); // window
  // 将fn函数调用后的返回值，作为call方法的返回值
  return result;
};

Function.prototype.apply1 = function (context, args) {
  context._fn = this;
  const result = context._fn(...args);
  delete context._fn;
  return result;
};

Function.prototype.bind1 = function (context, ...args) {
  // console.log(this); // 指向 obj1.fn
  const _self = this;
  return function () {
    return _self.apply1(context, args);
  };
};

const fn = obj1.fn.bind1(obj2, 123, 456);
fn();

/*
  this指向：
    1. 没有修改this指向的函数，直接调用 window   window.fn()
    2. obj.fn()  obj
    3. call / apply / bind  this指向传入第一个参数
    4. new fn()  创建出来的实例对象
    5. () => {}  离它最近的一层包裹着它的函数的this
 */