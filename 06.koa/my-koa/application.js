const http = require('http');

module.exports = class Application {
  constructor() {
    this.middleware = [];
  }

  // 使用中间件
  use(fn) {
    // 将所有中间件函数添加到数组中，统一处理
    this.middleware.push(fn);
    // 为了链式调用
    return this;
  }

  // 监听端口号: 功能单一化
  listen(...args) {
    const server = http.createServer(this.callback());
    // 通过server监听端口号
    server.listen(...args);
  }

  // 处理请求、返回响应的回调函数
  callback() {
    const fn = compose(this.middleware);

    const handleRequest = (req, res) => {
      // 处理请求，返回响应 --> 中间件函数需要在这调用
      // this.middleware.forEach((fn) => fn(req, res));
      // fn(req, res);
      // 创建ctx对象
      const context = this.createContext(req, res);
      this.handleRequest(context, fn);
    };

    return handleRequest;
  }

  // 处理请求：执行处理请求的中间件函数
  handleRequest(context, middlewareFn) {
    // 执行处理请求的中间件函数
    // 执行返回响应的方法（等所有中间件函数执行完毕后才允许返回响应）
    const handleResponse = () => {
      // 来到这里，所有中间件函数执行完毕了，返回响应
      respond(context);
    }

    middlewareFn(context).then(handleResponse);
  }

  createContext(req, res) {
    const context = {};
    context.req = req;
    context.res = res;
    return context;
  }

};

// 高阶函数：执行函数返回另外一个函数
function compose(middleware) {
  return (context) => {
    return dispatch(0);
    function dispatch(i) {
      // 取出中间件函数
      const fn = middleware[i];
      // 如果fn不存在，说明它的值是undefined, 说明执行到头，没有其他中间件函数可以执行了
      if (!fn) return Promise.resolve();
      // dispatch.bind(null, i + 1) 就是next方法
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    }
  }
}

// 返回响应的方法
function respond(context) {
  // 根据响应内容类型，返回不同的响应
  let body = context.body;
  let res = context.res;

  if ('string' == typeof body) return res.end(body);
  if ('object' == typeof body) return res.end(JSON.stringify(body));
  res.end(body);
}


/*
  compose([])()  -->  dispatch(0)  fn(req, res, dispatch.bind(null, 1));
  dispatch(1) -->
 */