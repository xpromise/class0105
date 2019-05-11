import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// 所有路由组件必须在BrowserRouter的子组件内，才能使用
ReactDOM.render(<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));