import React, {Component} from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// ctrl + alt + l 格式化代码
import News from '../news';
import Message from '../message';
import MyNavLink from '../my-nav-link';

export default class Home extends Component {
  render() {
    return <div>
      <h1>
        Home组件的内容
      </h1>
      <div>
        <ul className="nav nav-tabs">
          <li><MyNavLink to="/home/news">News</MyNavLink></li>
          <li><MyNavLink to="/home/message">Message</MyNavLink></li>
        </ul>
        <div>
          <Switch>
            <Route path="/home/news" component={News}/>
            <Route path="/home/message" component={Message}/>
            <Redirect to="/home/news"/>
          </Switch>
        </div>
      </div>
    </div>;
  }
}
