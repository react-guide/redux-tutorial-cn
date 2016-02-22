// 章节 3 - simple-reducer.js

// 现在，我们知道如何去创建一个 Redux 实例，并让它管理应用中的 state
// 同时，我们需要关注的是那些 reducer 函数，因为它们允许我们改变 state。

// 关于 reducer 与 store：
// 你可能已经注意到，在简介中 flux 的图解显示，我们有 "Store"，并没有
// 像 Redux 中所拥有的 "Reducer"。那么，Store 与 Reducer 实际上有哪些区别呢？
// 实际上要比你想象的简单：Store 可以保存你的 data，而 Reducer 不能。
// 因此在传统的 flux 中，store 可以管理它们的 state，然而在 Redux 中，每次一个 reducer
// 被调用时，都是通过需要更新的 state 来进行的。这样的话，Redux 的 store 就变成了
// “无状态的 store” 并且重命名为 reducer。

// 如上所述，在创建一个 Redux 实例前，需要给它一个 reducer 函数...

import { createStore } from 'redux'

var store_0 = createStore(() => {})

// ... 因此当一个 action 发生时，在应用中 Redux 每一次都可以调用这个函数。
// 给定 reducer(s) 去 createStore，实际上是让 redux 如何注册 action 的 "handlers"（读取 reducers）
// 这也是我们在 01_simple-action-creator.js 章节中所讨论的。

// 在我们的 reducer 中加入一些 log

var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)

// 输出：Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]

// 看出来了吗？实际上，我们的 reducer 被调用时是没有 dispatch 任何的 action...
// 这是因为初始化了应用的 state，
// 实际上，Redux dispatch 了一个初始化的 action ({ type: '@@redux/INIT' })

// 在被调用时，一个 reducer 会得到这些参数：(state, action)
// 在应用初始化后，state 还没被初始化，那么它的值是 "undefined" 的，
// 这是非常符合逻辑的

// 在 Redux 发送 "init" action 之后，我们应用中的 state 又会是怎么样的呢？

// 下一章节：04_get-state.js
