function mul(x, y) {
  return x * y;
}

function count(x, y) {
  return x - y;
}

/*
  当模块内部只有一项内容需要向外暴露出去，用module.exports = xxx;
  当模块内部有多项内容需要向外暴露出去，用module.exports = {xxx, yyy};
 */

/*module.exports = {
  mul,
  count
};

exports.mul = mul;
exports.count = count;*/

module.exports = mul;
