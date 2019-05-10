/*
  评论列表显示组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 引入其他组件
import CommentItem from '../comment-item';

export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  render() {
    // 获取props
    const { comments } = this.props;

    return <div className="col-md-8">
      <h3 className="reply">评论回复：</h3>
      <h2 style={{display: 'none'}}>暂无评论，点击左侧添加评论！！！</h2>
      <ul className="list-group">
        {
          comments.map((comment, index) => {
            return <CommentItem comment={comment} key={index}/>
          })
        }
      </ul>
    </div>
  }
}