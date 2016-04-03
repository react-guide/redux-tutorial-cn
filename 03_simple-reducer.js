// 章节 3 - simple-reducer.js

// 现在，我们知道如何去创建一个 Redux 实例，并让它管理应用中的 state
// 下面讲一下这些 reducer 函数是如何转换 state 的。

// Reducer 与 Store 区别：
// 你可能已经注意到，在简介章节中的 Flux 图表中，有 Store，但没有
// Redux 中的 Reducer。那么，Store 与 Reducer 到底有哪些区别呢？
// 实际的区别比你想象的简单：Store 可以保存你的 data，而 Reducer 不能。
// 因此在传统的 Flux 中，Store 本身可以保存 state，但在 Redux 中，每次调用 reducer
// 时，都会传入待更新的 state。这样的话，Redux 的 store 就变成了
// “无状态的 store” 并且改了个名字叫 Reducer。

// 如上所述，在创建一个 Redux 实例前，需要给它一个 reducer 函数...

import { createStore } from 'redux'

var store_0 = createStore(() => {})

// ...所以每当一个 action 发生时，Redux 都能调用这个函数。
// 往 createStore 传 Reducer 的过程就是给 Redux 绑定 action 处理函数（也就是 Reducer）的过程。
// action 处理函数在 01_simple-action-creator.js 章节中有讨论过。

// 在 Reducer 中打印一些 log

var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)

// 输出：Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]

// 看出来了吗？我们的 reducer 被调用了，但我们并没有 dispatch 任何 action...
// 这是因为在初始化应用 state 的时候，
// Redux dispatch 了一个初始化的 action ({ type: '@@redux/INIT' })

// 在被调用时，一个 reducer 会得到这些参数：(state, action)
// 在应用初始化时，state 还没被初始化，因此它的值是 "undefined"，
// 这是非常符合逻辑的

// 在处理 “init” action 之后，我们应用中的 state 又会是怎么样的呢？

// 下一章节：04_get-state.js
