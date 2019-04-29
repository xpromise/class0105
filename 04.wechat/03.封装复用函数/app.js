const express = require('express');
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
 */

app.get('/search', (req, res) => {

});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});