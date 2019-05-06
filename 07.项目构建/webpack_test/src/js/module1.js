
const add = (...args) => args.reduce((p, c) => p + c, 0);
// 默认暴露
export default add;