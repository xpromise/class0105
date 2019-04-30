
const rp = require('request-promise-native');

const AccessToken = require('./access-token');
const { writeFileAsync, readFileAsync, isValid } = require('../utils/tools');

// 定义变量临时保存ticket数据
let ticket = null;

/**
 * 获取ticket
 */
async function getTicket() {
  try {
    // 获取access_token

    const { access_token } = await new AccessToken().fetchAccessToken();
    // 定义请求地址
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    // 发送请求
    const result = await rp({url, json: true, method: 'GET'});
    // 保存之前设置过期时间, 给5分钟宽裕时间（因为存在网络延迟等影响因素）
    result.expires_in = Date.now() + 7200000 - 300000;
    delete result.errcode;
    delete result.errmsg;
    // 保存起来
    // 给writeFile包一层promise对象，目的为了等writeFile执行完毕，在执行其他代码
    await writeFileAsync('ticket.txt', result);
    // 将result作为当前函数返回值
    // async函数默认返回值是promise对象，promise对象内部保存的数据看async函数内部return的返回值
    return result;

  } catch (e) {
    console.log('getticket方法出了问题：', e);
  }
}

/**
 * 执行函数，得到有效的ticket
 */
function fetchTicket() {
  // 优化下面的过程。如果ticket存在并且是在有效期，那么直接读取内存的数据就OK
  if (ticket && isValid(ticket)) {
    return Promise.resolve(ticket);
  }
  // 读取保存的ticket
  return readFileAsync('ticket.txt')
  /*
    .then() .catch() 方法默认返回promise对象，所以才能无限写
     then/catch函数返回的promise对象内部的值就看传入的第一个参数（函数）的返回值
   */
    .then(async (res) => {
      // 判断ticket是否过期
      if (isValid(res)) {
        // 没有过期
        // res相当于then函数返回值promise内部数据
        return res;
      } else {
        // 过期了
        return await getTicket();
      }
    })
    .catch(async (err) => {
      // 发送请求，得到ticket, 保存起来
      return await getTicket();
    })
    .then((res) => {
      // 不管触发上面的then还是catch函数，最终都会执行当前then函数
      // 将变量赋值为ticket
      ticket = res;
      return res;
    })
}

// 测试代码
/*!(async () => {
  let result = await fetchTicket();
  result = await fetchTicket();
})()*/

module.exports = fetchTicket;
