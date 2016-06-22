// 章节 12 - Provider-and-connect.js

// 现在是时候见识 redux-react(https://github.com/rackt/react-redux)
// 如何在 Provider 组件中为我们做初次绑定了。

// Provider 是一个 React 组件，它被设计用作于包裹你应用的根组件。
// 它的目的是提供你的 Redux 实例给所有应用中的组件。
// 我们不太关心它是如何做到的，你只需知道: 它用了 React 的上下文功能(context feature),
// 它没有说明文档所已不必在意它，但你实在是好奇的话可以参考: https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      // 正如上面介绍的，Provider 必须包裹你的应用程序根组件。
      // 如此以来，该组件以及它的子元素(甚至更深的后代)就能访问你的 Redux store。
      // 当然，为了允许 Provider 这么做，你必须通过名为 "store" 的 props 将 store 传递给它。
      <Provider store={ this.props.store }>
        <Home />
      </Provider>
    )
  }
}

// 转到 ./home.jsx，从这个React组件中，去发现更多关于 state 和派发 action 的细节。
