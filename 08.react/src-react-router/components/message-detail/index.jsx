import React, { Component } from 'react';

export default class MessageDetail extends Component {
  messages = [
    {id: 1, title: 'message1', content: 'message0001'},
    {id: 2, title: 'message2', content: 'message0002'},
    {id: 3, title: 'message3', content: 'message0003'}
  ]

  render() {
    // 获取路径的params参数
    const { id } = this.props.match.params;
    // 找到对应的数据
    const message = this.messages.find((item) => item.id === +id);

    return <ul>
      <li>id: {message.id}</li>
      <li>title: {message.title}</li>
      <li>content: {message.content}</li>
    </ul>;
  }
}