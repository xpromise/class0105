import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  static propTypes = {
    updateSearchName: PropTypes.func.isRequired
  }
  // 为了收集表单数据定义的
  state = {
    searchName: ''
  }

  search = () => {
    // 获取数据
    const { searchName } = this.state;

    if (searchName) {
      // 调用父组件传过来的方法
      this.props.updateSearchName(searchName);
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