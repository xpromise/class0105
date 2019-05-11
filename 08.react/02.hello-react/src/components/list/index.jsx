import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class List extends Component {
  static propTypes = {
    searchName: PropTypes.string.isRequired
  }

  // 组件将要接收属性（父组件渲染，会将props以标签属性的方式传给子组件，而子组件就会触发当前生命周期函数）
  componentWillReceiveProps(nextProps) {
    // console.log(this.props.searchName); // 得到是上一次的props
    // console.log(nextProps);

    // 发送请求
    // 请求地址： https://api.github.com/search/users?q=xp  请求方式 get
    axios.get(`https://api.github.com/search/users?q=${nextProps.searchName}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {

      })

  }

  render() {
    return <div className="row">
      <div className="card">
        <a href="https://github.com/reactjs" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{width: 100}}/>
        </a>
        <p className="card-text">reactjs</p>
      </div>
      <div className="card">
        <a href="https://github.com/reactjs" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{width: 100}}/>
        </a>
        <p className="card-text">reactjs</p>
      </div>
      <div className="card">
        <a href="https://github.com/reactjs" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{width: 100}}/>
        </a>
        <p className="card-text">reactjs</p>
      </div>
      <div className="card">
        <a href="https://github.com/reactjs" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{width: 100}}/>
        </a>
        <p className="card-text">reactjs</p>
      </div>
      <div className="card">
        <a href="https://github.com/reactjs" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/6412038?v=3" style={{width: 100}}/>
        </a>
        <p className="card-text">reactjs</p>
      </div>
    </div>;
  }
}