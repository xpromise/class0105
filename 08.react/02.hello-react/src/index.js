import React from 'react';
import ReactDOM from 'react-dom';
// 引入antd样式
// import 'antd/dist/antd.min.css';

import App from './App';


// 所有路由组件必须在BrowserRouter的子组件内，才能使用
ReactDOM.render(
  <App />
, document.getElementById('root'));