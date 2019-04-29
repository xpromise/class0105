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
       读取保存的access_token
          有：（第二次）
            判断access_token是否过期
              如果过期了，重新发送请求，得到access_token, 保存起来
              如果没有过期，直接使用
          没有：（第一次）
            发送请求，得到access_token, 保存起来
 */