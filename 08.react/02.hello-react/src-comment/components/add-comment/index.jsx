/*
  添加评论组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddComment extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired
  }

  // 初始化状态
  state = {
    name: '',
    content: ''
  }

  id = 3

  handleChange = (stateName) => {
    return (e) => {
      this.setState({
        [stateName]: e.target.value
      })
    }
  }

  addComment = (e) => {
    // 禁止默认行为
    e.preventDefault();
    // 收集表单数据
    const { name, content } = this.state;
    // 添加评论
    this.props.addComment({name, content, id: this.id++});
    // 清空数据
    this.setState({name: '', content: ''});
  }

  render() {
    const { name, content } = this.state;

    return <div className="col-md-4">
      <form className="form-horizontal" onSubmit={this.addComment}>
        <div className="form-group">
          <label>用户名</label>
          <input type="text" value={name} className="form-control" placeholder="用户名" onChange={this.handleChange('name')}/>
        </div>
        <div className="form-group">
          <label>评论内容</label>
          <textarea className="form-control" value={content} rows="6" placeholder="评论内容" onChange={this.handleChange('content')}></textarea>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default pull-right">提交</button>
          </div>
        </div>
      </form>
    </div>
  }
}