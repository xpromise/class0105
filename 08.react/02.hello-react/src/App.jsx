/*
  定义App应用主/根组件
 */
// 引入依赖
import React, { Component } from 'react';
/*import React from 'react';
import { Component } from 'react';*/
// 在脚手架中所有资源都要引入才能使用：图片、样式等
import logo from './logo.svg';
import './App.css';

// 暴露出去
export default class App extends Component {
  render() {
    return <div>
      <h1>React脚手架练习</h1>
      <img className="logo" src={logo} alt="logo"/>
    </div>
  }
}

