// 章节 12 - Provider-and-connect.js

// 这里没有很多要说的， 现在你已经看到过这些很多次， 而且应该对它们很熟悉了...

// 尽管这样，但还是有一点要注意: 我们这里不使用之前用过的 thunk middleware。
// 替而代之的是 promise middleware，它允许我们处理异步的 action 创建函数,
// 然后漂亮的实时处理UI更新(也可以做一些乐观的更新)。
// 这个中间件在 https://github.com/rackt/redux/issues/99有讨论,
// 在 react-redux-universal-example: https://github.com/erikras/react-redux-universal-hot-example中有非常好的使用案例,
// 我强烈推荐你去看一看(之后不是现在;))。

import { createStore, applyMiddleware, combineReducers } from 'redux'
// 你可以去看一看这个中间件，它不是很复杂，而且能帮你锻炼出对中间件更敏锐的理解。
import promiseMiddleware from './promise-middleware'

// 在本应用中我们仅有一个 reducer,
// 但是下面用 ES6 写的 import，有趣且一气呵成的导入并生成了多个 reducer。
// 去 ./reducers.js 看看我们的 reducer 究竟是怎么做的(这里没有魔法)。
import * as reducers from './reducers'

// 这里看到的 data 参数是用于初始化 Redux store。
// 为简单起见我们不讨论它，但要感谢它让你在有真实数据的情况下来初始化 reducer。
// 例如在一个同构/通用应用中，你能从服务器端拉取数据，然后序列化并传递到客户端,
// 你的 Redux store 就能用这些数据来初始化。
// 这里我们没传任何数据，但最好要知道这个 createStore 是做什么的
export default function(data) {
  var reducer = combineReducers(reducers)
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)

  return store
}

// 转到 ./application.jsx，去学习使用 Provider 组件首次将 Redux 绑定到 React。
