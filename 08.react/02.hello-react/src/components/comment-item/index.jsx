/*
  单个评论组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  render() {
    // 获取props
    const { name, content } = this.props.comment;

    return <li className="list-group-item">
      <div className="handle">
        <a href="javascript:;">删除</a>
      </div>
      <p className="user"><span>{name}</span><span>说:</span></p>
      <p className="centence">{content}</p>
    </li>
  }
}