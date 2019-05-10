/*
  单个评论组件
 */
import React from 'react';
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// 引入样式
import './index.css';

export default function CommentItem({ delComment, comment }) {
  const { name, content, id } = comment;
  // 删除评论
  const deleteComment = () => {
    // 不常见的全局变量，需要加上window，否则eslint会报错
    if (window.confirm(`您确认要删除${name}的评论吗？`)) {
      // 删除评论
      delComment(id);
    }
  };

  return <li className="list-group-item">
    <div className="handle">
      {/* 执行一段空代码，是有性能消耗 href=javascript:;  选择使用button取代 */}
      <button className="my-button" onClick={deleteComment}>删除</button>
    </div>
    <p className="user"><span>{name}</span><span>说:</span></p>
    <p className="centence">{content}</p>
  </li>
}

/*
export default class CommentItem extends Component {
  static propTypes = {
    delComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired
  }

  // 删除评论
  delComment = () => {
    const { comment : { name, id } , delComment } = this.props;
    /!*const { comment , delComment } = this.props;
    const { name, id } = comment;*!/
    // 不常见的全局变量，需要加上window，否则eslint会报错
    if (window.confirm(`您确认要删除${name}的评论吗？`)) {
      // 删除评论
      delComment(id);
    }
  }

  render() {
    const { name, content } = this.props.comment;

    return <li className="list-group-item">
      <div className="handle">
        {/!* 执行一段空代码，是有性能消耗 href=javascript:;  选择使用button取代*!/}
        <button className="my-button" onClick={this.delComment}>删除</button>
      </div>
      <p className="user"><span>{name}</span><span>说:</span></p>
      <p className="centence">{content}</p>
    </li>
  }

}*/
