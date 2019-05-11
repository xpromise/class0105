import React, { Component } from 'react';
import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';

import About from './components/about';
import Home from './components/home';
import MyNavLink from './components/my-nav-link';


export default class App extends Component {

  render() {
    return <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            <h2>React Router Demo</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/*
              Link组件: 取代a标签   特点：1. 不会刷新整个页面 2. 不会发送请求 3. 产生了浏览器历史记录，并会修改网址
              NavLink组件： 和Link组件特点一样，但是多一个 active className(to属性的值和当前网址路径一样的，就会多active)
              */}
            <MyNavLink to="/about">About</MyNavLink>
            <MyNavLink to="/home">Home</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/*
                在这里要加载about/home组件
                Route组件：根据当前网址进行匹配，如果当前路径匹配上了path的值，就加载component对应的组件
                Redirect组件：只要加载了当前组件，就会重定向到to指定的路径（一般放最后，必须结合Switch组件使用）
                Switch组件：切换路由组件的显示。 默认从上到下匹配路径，一旦匹配上，下面的就不看了
                （如果没有这个组件，默认所有路由都会加载）

                普通组件：之前定义的组件都是普通组件
                路由组件：通过Route组件加载的组件，就称为路由组件。 这些路由组件实例对象有三个属性：history、location、match

                单标签：没有，就用单标签
                双标签：当组件内部有其他内容时（文本、其他组件），就得用双标签
              */}
              <Switch>
                <Route path="/about" component={About}/>
                <Route path="/home" component={Home}/>
                <Redirect to="/about"/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}