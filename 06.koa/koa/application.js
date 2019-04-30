const isGeneratorFunction = require('is-generator-function');
const debug = require('debug')('koa:application');
const onFinished = require('on-finished');
const response = require('./response');
const compose = require('koa-compose');
const isJSON = require('koa-is-json');
const context = require('./context');
const request = require('./request');
const statuses = require('statuses');
const Emitter = require('events');
const util = require('util');
const Stream = require('stream');
const http = require('http');
const only = require('only');
const convert = require('koa-convert');
const deprecate = require('depd')('koa');

module.exports = class Application extends Emitter {
  // 定义类的属性
  constructor() {
    super();
    // 所有中间件函数的数组
    this.middleware = [];
    // Object.create(obj)  以obj对象为原型创建一个新对象 newObj.__proto__ = obj
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  // 监听端口号
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  use(fn) {
    // 将所有设定的中间件函数，统一添加到一个数组中
    this.middleware.push(fn);
    // 满足链式调用
    return this;
  }
  callback() {
    // compose： 执行了所有可以执行的中间件函数，并返回promise
    const fn = compose(this.middleware);

    const handleRequest = (req, res) => {
      // 创建了ctx对象
      const ctx = this.createContext(req, res);
      // handleRequest真正处理请求的函数
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
  handleRequest(ctx, fnMiddleware) {
    // const res = ctx.res;
    // res.statusCode = 404;
    // const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    // onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
  // 创建ctx
  // 将req和res对象上的属性和方法都挂载到ctx上
  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }
};
// 这就是最终返回响应的函数
function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  if (!ctx.writable) return;

  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  if (null == body) {
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
