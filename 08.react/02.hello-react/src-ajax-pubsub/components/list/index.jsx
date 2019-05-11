import React, { Component } from 'react';
import axios from 'axios';
import { subscribe } from 'pubsub-js';

export default class List extends Component {

  state = {
    isFirstView: true,  // 初始化渲染使用的状态
    isLoading: false, // loading状态
    success: [], // 请求成功的状态
    error: null // 请求失败的状态
  }

  // 组件将要接收属性（父组件渲染，会将props以标签属性的方式传给子组件，而子组件就会触发当前生命周期函数）
  /*componentWillReceiveProps(nextProps) {
    // console.log(this.props.searchName); // 得到是上一次的props
    // console.log(nextProps);
    // 将初始化状态改为loading状态
    this.setState({
      isLoading: true,
      isFirstView: false
    })
    // 发送请求
    // 请求地址： https://api.github.com/search/users?q=xp  请求方式 get
    axios.get(`https://api.github.com/search/users?q=${nextProps.searchName}`)
      .then((res) => {
        // 请求成功，将loading状态改为成功的状态
        this.setState({
          isLoading: false,
          success: res.data.items.map((item) => ({name: item.login, img: item.avatar_url, url: item.html_url}))
        })
        // console.log(res);
      })
      .catch((err) => {
        // 请求失败，将loading状态改为失败的状态
        this.setState({
          isLoading: false,
          success: [],
          error: '网络出现问题，请刷新试试~'
        })
      })

  }*/

  // 订阅消息
  componentDidMount() {
    // ctrl + shift + u
    // 订阅只能一次，而发布可以多次
    // 使用场景： 兄弟组件、祖孙组件通信
    subscribe('SEARCH_NAME', (msg, data) => {
      // console.log('接收到了消息');
      // console.log(msg, data);  // SEARCH_NAME aaa
      this.setState({
        isLoading: true,
        isFirstView: false
      })
      // 发送请求
      // 请求地址： https://api.github.com/search/users?q=xp  请求方式 get
      axios.get(`https://api.github.com/search/users?q=${data}`)
        .then((res) => {
          // 请求成功，将loading状态改为成功的状态
          this.setState({
            isLoading: false,
            success: res.data.items.map((item) => ({name: item.login, img: item.avatar_url, url: item.html_url}))
          })
          // console.log(res);
        })
        .catch((err) => {
          // 请求失败，将loading状态改为失败的状态
          this.setState({
            isLoading: false,
            success: [],
            error: '网络出现问题，请刷新试试~'
          })
        })

    })

  }

  render() {
    const { isFirstView, isLoading, success, error } = this.state;

    if (isFirstView) {
      return <h1>enter name to search</h1>;
    } else if (isLoading) {
      return <h1>loading...</h1>;
    } else if (success.length) {
      return <div className="row">
        {
          success.map((item, index) => {
            return <div className="card" key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={item.img} style={{width: 100}} alt={item.name}/>
              </a>
              <p className="card-text">{item.name}</p>
            </div>
          })
        }
      </div>;
    } else {
      return <h1>{error}</h1>;
    }
  }
}