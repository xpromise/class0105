import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import MessageDetail from '../message-detail';

export default class Message extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        messages: [
          {id: 1, content: 'message001~'},
          {id: 2, content: 'message002~~'},
          {id: 3, content: 'message003~~~'}
        ]
      })
    }, 1000)
  }

  // 最外层函数只为了调用传参给里面函数使用
  push = (id) => {
    // 返回一个新函数，新函数才是事件的回调函数
    return () => {
      this.props.history.push(`/home/message/${id}`);
    }
  }

  replace = (id) => {
    // 返回一个新函数，新函数才是事件的回调函数
    return () => {
      this.props.history.replace(`/home/message/${id}`);
    }
  }

  /*
    有两种改变路由路径的方法：
      1. Link NavLink  路由导航链接：如果是render返回返回值需要是一个组件，所以得用Link
      2. this.props.history.push/replace/goBack()  编程式导航：如果是事件回调函数中，不需要返回一个组件，这时候用编程式导航
  */

  render() {

    return <div>
      <ul>
        {
          this.state.messages.map((item) => {
            return <li key={item.id}>
              <Link to={`/home/message/${item.id}`}>{item.content}</Link>
              <button onClick={this.push(item.id)}>push</button>
              <button onClick={this.replace(item.id)}>replace</button>
            </li>
          })
        }
      </ul>
      {/* /home/message/xxxx */}
      <Route path="/home/message/:id" component={MessageDetail}/>
    </div>;
  }
}