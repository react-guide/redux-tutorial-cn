// 教程 12 - Provider-and-connect.js

// 这个文件是我们JS包的入口。 在这里将创建我们的Redux store, 实例化我们的React应用根组件然后将它附加到DOM中。

import React from 'react'
import { render } from 'react-dom'
// 所有创建store的具体代码在./create-store.js中
import createStore from './create-store'
// Application是我们应用的根组件, 它包含了Redux的Provider...
import Application from './application'

// 就像以前的很多例子一样, 我们需要创建Redux实例。 这次所有的代码被移到专门的模块中(译者注:create-store.js), 并返回一个函数来触发实例化。
const store = createStore()

// 现在, 是时候使用ReactDOM.render(或者仅仅用render,这要感谢ES6的解构赋值写法:import { render } from 'react-dom')渲染我们的应用到DOM中
render(
    // ... 接着将我们的Redux store作为props提供给根组件, 于是Redux Provider可以做它该做的事情。
    <Application store={store} />,
    document.getElementById('app-wrapper')
)

// 转到./create-store.js去浏览你已深知的一点: "如何创建一个Redux store?"
