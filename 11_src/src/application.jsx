// 教程 12 - Provider-and-connect.js

// 现在是时候见识redux-react (https://github.com/rackt/react-redux)
// 如何在Provider组件中为我们做初次绑定了。

// Provider是一个React组件,它被设计用作于包裹你应用的根组件。
// 它的目的是提供你的Redux实例给所有应用中的组件。
// 我们不太关心它是如何做到的, 你只需知道: 它用了React的上下文功能(context feature),
// 没有文档说明它, 所已不必在意, 但你实在是好奇的话可以看: https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
        // 正如上面介绍的, Provider必须包裹你的应用程序根组件。
        // 如此以来, 该组件以及它的子元素(甚至更深的后代)就能访问你的Redux store。
        // 当然, 为了允许Provider这么做, 你必须通过名为"store"的props将store传递给它。
      <Provider store={ this.props.store }>
        <Home />
      </Provider>
    )
  }
}

// 转到 ./home.jsx 去发现你能从这个React组件中, 看到关于state和派发action的什么。
