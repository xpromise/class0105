import React, { Component } from 'react';

import Search from './components/search';
import List from './components/list';

export default class App extends Component {
  state = {
    searchName: ''
  }

  // 修改状态数据方法
  updateSearchName = (searchName) => {
    this.setState({
      searchName
    })
  }

  render() {
    return <div className="container">
      <Search updateSearchName={this.updateSearchName}/>
      <List searchName={this.state.searchName}/>
    </div>
  }
}