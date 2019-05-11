import React, { Component } from 'react';
import { publish } from 'pubsub-js';

export default class Search extends Component {
  // 为了收集表单数据定义的
  state = {
    searchName: ''
  }

  search = () => {
    // 获取数据
    const { searchName } = this.state;

    if (searchName) {
      // 发布消息
      publish('SEARCH_NAME', searchName);
    }
  }

  handleChange = (e) => {
    this.setState({
      searchName: e.target.value
    })
  }

  render() {
    return <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" onChange={this.handleChange}/>
        <button onClick={this.search}>Search</button>
      </div>
    </section>
  }
}