/*
  从浏览器地址栏输入一个网址，到页面最终渲染完成，中间发生了什么？
    1. DNS解析：将输入域名地址解析为ip地址
      读取4个缓存（由近到远） 浏览器 - 计算机 - 路由器 - 网络运营商（最低要求）
      递归查询 www.blog.xxx.com
    2. TCP连接：TCP三次握手
      第一次握手：由浏览器发送给服务器的，告诉服务器，我将要发请求，你做好准备
      第二次握手：由服务器发送给浏览器的，告诉浏览器，我准备好了，你放马过来
      第三次握手：由浏览器发送给服务器，告诉服务器，我这边没有问题，马上就要发请求了
    3. 发送请求
      请求报文
    4. 返回响应
      响应报文
    5. 解析并渲染页面：（浏览器渲染原理）
      - 遇到html标记，调用html解析器，解析为DOM树，
      - 遇到CSS标记，调用css解析器，解析为CSSOM树
      - 遇到JS标记，调用js引擎解析其中代码。可能会遇到修改html和css
        - 修改html，用html解析器，重新解析为DOM树，
        - 修改css，调用css解析器，解析为CSSOM树
      - 将DOM树和CSSOM结合成render树
      - 布局layout
      - 渲染render
    6. 断开连接：TCP四次挥手：（断开请求连接需要两次，断开响应连接需要两次）
      第一次挥手：由浏览器告诉服务器，我请求报文发完了，你可以断开连接了
      第二次挥手：由服务器告诉浏览器，我请求报文接收了，我准备断开连接，你也准备断开连接
      第三次挥手：由服务器发送浏览器，我响应报文发完了，你可以断开连接了
      第四次挥手：由浏览器告诉服务器，我响应报文接收了，我准备断开连接，你也准备断开连接

 */