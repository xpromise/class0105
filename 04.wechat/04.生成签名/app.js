const express = require('express');
const sha1 = require('sha1');
const fetchTicket = require('./wechat/ticket');
const app = express();
/*
  微信js-sdk使用步骤
  1. 绑定js安全域名
    来到测试号管理页面绑定安全域名
    问题：本地的localhost域名，外界访问不了，需要将其变成一个互联网都能访问网址
    解决： ngrok 内网穿透技术： 将本地localhost的服务器，映射外网能访问的网址。
    指令：ngrok http 3000  生成一个网址，需要将网址填写到安全域名上
  2. JS-SDK使用权限签名算法
    签名算法 需要使用 jsapi_ticket。 jsapi_ticket 需要通过 access_token 才能获取
  3. 获取 access_token： 开始开发 - 获取access——token
  4. 获取 jsapi_ticket：微信网页开发 - js-sdk说明文档 - 附录1
  5. 得到签名
 */

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/search', async (req, res) => {
  // 返回页面之前，在服务器端生成签名
  /*
    1. 参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分）
    2. 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，
    3. 使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。
    4. 对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
   */
  // 1. 参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分）
  const { ticket } = await fetchTicket();
  const url = 'http://1a8c7775.ngrok.io/search';
  const noncestr = Math.random().toString().substring(2);
  const timestamp = Math.floor(Date.now() / 1000);

  console.log(ticket);
  console.log(url);
  console.log(noncestr);
  console.log(timestamp);

  // 2. 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，
  // 3. 使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。
  const arr = [
    `jsapi_ticket=${ticket}`,
    `url=${url}`,
    `noncestr=${noncestr}`,
    `timestamp=${timestamp}`
  ].sort();
  const str = arr.join('&');

  // 4. 对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
  const signature = sha1(str);

  // 将signature、noncestr、timestamp三个参数渲染到页面上，页面上才能使用
  res.render('search', {signature, noncestr, timestamp});
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});