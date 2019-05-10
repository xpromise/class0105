/*
  App组件、应用主组件
 */
// 引入依赖
import React, { Component } from 'react';

// 引入其他组件
import AddComment from './components/add-comment';
import CommentList from './components/comment-list';

// 暴露组件
export default class App extends Component {
  // 初始化状态
  state = {
    comments: [
      {name: 'jack', content: 'i love rose', id: 1},
      {name: 'rose', content: 'i love my husband', id: 2}
    ]
  }

  // 添加评论
  addComment = (comment) => {
    // 更新状态数据
    this.setState({
      comments: [comment, ...this.state.comments]
    })
  }

  render() {
    // 获取状态数据
    const { comments } = this.state;
    console.log(comments);

    return <div>
      <header className="site-header jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>请发表对React的评论</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <AddComment addComment={this.addComment}/>
        <CommentList comments={comments}/>
      </div>
    </div>
  }
}