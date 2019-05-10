/*
  入口文件：webpack打包的入口文件
 */
// 引入依赖
import React from 'react';
import ReactDOM from 'react-dom';

// 引入组件
import App from './App';

// 将组件渲染到页面指定容器上。
ReactDOM.render(<App />, document.getElementById('root'));
