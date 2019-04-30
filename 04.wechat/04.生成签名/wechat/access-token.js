/*
  access_token:
    1. 是什么？
      access_token是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用access_token。
    2. 特点：
      大小至少为512字节
      有效期2小时，需定时刷新
      重复获取将导致上次获取的access_token失效。
    3. 请求地址
      https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    4. 请求方式：GET
    5. 请求参数：
      grant_type=client_credential
      appid=wxc8e92f7ab70fbca0
      secret=b4054e90b75787c78e0af50bf7fc3e87
    6. 设计：
      目的：得到access_token
      设计：
        第一次：发送请求，得到access_token, 保存起来
        第二次：读取保存的access_token，判断access_token是否过期
          如果过期了，重新发送请求，得到access_token, 保存起来
          如果没有过期，直接使用
     7. 整理：
       读取保存的access_token  fs.readFile
          有：（第二次）
            判断access_token是否过期
              如果过期了，重新发送请求，得到access_token, 保存起来  fs.writeFile
              如果没有过期，直接使用
          没有：（第一次）
            发送请求，得到access_token, 保存起来
 */

const rp = require('request-promise-native');

const { writeFileAsync, readFileAsync, isValid } = require('../utils/tools');

// 类
class AccessToken {
  constructor() {
    this.accessToken = null;
  }

  async getAccessToken() {
    try {
      // 定义请求地址
      const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc8e92f7ab70fbca0&secret=b4054e90b75787c78e0af50bf7fc3e87';
      // 发送请求
      /*
        1. 下载两个库
          request  request-promise-native
        2. 引入
        3. 使用
       */
      const result = await rp({url, json: true, method: 'GET'});
      /*
        {
        access_token:
     '21_6xYDd1JrUoiglndZsiwcVcEJUhwKotkAvQGXRqbU_vn1Q27y6FUUYftKW7nGqj0yiHEYCa4vyNsrHqc5EYL5rwKr4PS-hBDD2Yq_Reao-a2UwB_4KJhzK0lnzvWVTXJ9fwMADT3lLB3FFekTXHFeAGAJTR',
        expires_in: 7200
        }
       */
      // 保存之前设置过期时间, 给5分钟宽裕时间（因为存在网络延迟等影响因素）
      result.expires_in = Date.now() + 7200000 - 300000;
      // 保存起来
      // 给writeFile包一层promise对象，目的为了等writeFile执行完毕，在执行其他代码
      await writeFileAsync('accessToken.txt', result);
      // 将result作为当前函数返回值
      // async函数默认返回值是promise对象，promise对象内部保存的数据看async函数内部return的返回值
      return result;

    } catch (e) {
      console.log('getAccessToken方法出了问题：', e);
    }
  }

  fetchAccessToken() {
    // 优化下面的过程。如果accessToken存在并且是在有效期，那么直接读取内存的数据就OK
    if (this.accessToken && isValid(this.accessToken)) {
      return Promise.resolve(this.accessToken);
    }

    /*
      读取保存的access_token  fs.readFile
            有：（第二次）
              判断access_token是否过期
                如果过期了，重新发送请求，得到access_token, 保存起来  fs.writeFile
                如果没有过期，直接使用
            没有：（第一次）
              发送请求，得到access_token, 保存起来
     */
    // 读取保存的access_token
    return readFileAsync('accessToken.txt')
    /*
      .then() .catch() 方法默认返回promise对象，所以才能无限写
       then/catch函数返回的promise对象内部的值就看传入的第一个参数（函数）的返回值
     */
      .then(async (res) => {
        // 判断access_token是否过期
        if (isValid(res)) {
          // 没有过期
          // res相当于then函数返回值promise内部数据
          return res;
        } else {
          // 过期了
          return await this.getAccessToken();
        }
      })
      .catch(async (err) => {
        // 发送请求，得到access_token, 保存起来
        return await this.getAccessToken();
      })
      .then((res) => {
        // 不管触发上面的then还是catch函数，最终都会执行当前then函数
        // 将变量赋值为access_token
        this.accessToken = res;
        return res;
      })
  }
}


// 定义变量临时保存access_token数据
// let accessToken = null;

/**
 * 获取access_token
 */
/*async function getAccessToken() {
  try {
    // 定义请求地址
    const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc8e92f7ab70fbca0&secret=b4054e90b75787c78e0af50bf7fc3e87';
    // 发送请求
    /!*
      1. 下载两个库
        request  request-promise-native
      2. 引入
      3. 使用
     *!/
    const result = await rp({url, json: true, method: 'GET'});
    /!*
      {
      access_token:
   '21_6xYDd1JrUoiglndZsiwcVcEJUhwKotkAvQGXRqbU_vn1Q27y6FUUYftKW7nGqj0yiHEYCa4vyNsrHqc5EYL5rwKr4PS-hBDD2Yq_Reao-a2UwB_4KJhzK0lnzvWVTXJ9fwMADT3lLB3FFekTXHFeAGAJTR',
      expires_in: 7200
      }
     *!/
    // 保存之前设置过期时间, 给5分钟宽裕时间（因为存在网络延迟等影响因素）
    result.expires_in = Date.now() + 7200000 - 300000;
    // 保存起来
    // 给writeFile包一层promise对象，目的为了等writeFile执行完毕，在执行其他代码
    await writeFileAsync('accessToken.txt', result);
    // 将result作为当前函数返回值
    // async函数默认返回值是promise对象，promise对象内部保存的数据看async函数内部return的返回值
    return result;

  } catch (e) {
    console.log('getAccessToken方法出了问题：', e);
  }
}*/

/**
 * 执行函数，得到有效的access_token
 */
/*function fetchAccessToken() {
  // 优化下面的过程。如果accessToken存在并且是在有效期，那么直接读取内存的数据就OK
  if (accessToken && isValid(accessToken)) {
    return Promise.resolve(accessToken);
  }

  /!*
    读取保存的access_token  fs.readFile
          有：（第二次）
            判断access_token是否过期
              如果过期了，重新发送请求，得到access_token, 保存起来  fs.writeFile
              如果没有过期，直接使用
          没有：（第一次）
            发送请求，得到access_token, 保存起来
   *!/
  // 读取保存的access_token
  return readFileAsync('accessToken.txt')
  /!*
    .then() .catch() 方法默认返回promise对象，所以才能无限写
     then/catch函数返回的promise对象内部的值就看传入的第一个参数（函数）的返回值
   *!/
    .then(async (res) => {
      // 判断access_token是否过期
      if (isValid(res)) {
        // 没有过期
        // res相当于then函数返回值promise内部数据
        return res;
      } else {
        // 过期了
        return await getAccessToken();
      }
    })
    .catch(async (err) => {
      // 发送请求，得到access_token, 保存起来
      return await getAccessToken();
    })
    .then((res) => {
      // 不管触发上面的then还是catch函数，最终都会执行当前then函数
      // 将变量赋值为access_token
      accessToken = res;
      return res;
    })
}*/

// 测试代码
/*!(async () => {
  let result = await fetchAccessToken();
  result = await fetchAccessToken();
})()*/

module.exports = AccessToken;
