// 章节 5 - combine-reducers.js

// 我们现在来看一下什么是 reducer

var reducer_0 = function (state = {}, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

// 在继续之前，我们先来想象一下拥有很多 action 的 reducer 长什么样子

var reducer_1 = function (state = {}, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        case 'DO_SOMETHING':
            // ...
        case 'LEARN_SOMETHING':
            // ...
        case 'HEAR_SOMETHING':
            // ...
        case 'GO_SOMEWHERE':
            // ...
        // etc.
        default:
            return state;
    }
}

// 很显然，只有一个 reducer 是 hold 不住我们整个应用中所有 action 操作的（好吧，事实上它能 hold 得住，
// 但这会变得很难维护。）

// 幸运的是，Redux 不关心我们到底是只有一个 reducer ，还是有一打（12个）reducer 。
// 如果我们有多个 reducer ，Redux 能帮我们合并成一个。

// 让我们来定义 2 个 reducer

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

// 我希望你特别留意赋给每个 reducer 的初始 state ：
//     1. 赋给 userReducer 的初始 state 是一个空对象，即 {}
//     2. 赋给 itemsReducer 的初始 state 是一个空数组，即 []
// 赋予不同类型的值是为了说明 reducer 是可以处理任何类型的数据结构的。你完全可以选择那些符合你的需求的
// 数据结构作为 state 的值。（例如，字面量对象、数组、布尔值、字符串或其它不可变结构）

// 在这种多个 reducer 的模式下，我们可以让每个 reducer 只处理整个应用的部分 state 。

// 但我们需要知道，createStore 只接收一个 reducer 函数。

// 那么，我们怎么合并所有的 reducer？ 我们又该如何告诉 Redux 每个 reducer 只处理一部分 state 呢？
// 其实这很简单。我们使用 combineReducers 辅助函数。

// combineReducers 接收一个对象并返回一个函数，当 combineReducers 被调用时，它会去调用每个
// reducer，并把返回的每一块 state 重新组合成一个大 state 对象（也就是 Redux 中的 Store）。
// 长话短说，下面演示一下如何使用多个 reducer 创建一个 Redux 实例：

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_9.r.k.r.i.c.n.m.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_4.f.i.z.l.3.7.s.y.v.i' }
var store_0 = createStore(reducer)
// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

// 正如你从输出中看到的，每个 reducer 都被正确地调用了（但接收了个 init action @@redux/INIT ）。
// 这个 action 是什么鬼？这是 combineReducers 实施的一次安全检查，用以确保 reducer 永远不会返回
// undefined。请注意，在 combineReducers 中第一次调用 init action 时，其实是随机 action 来的，
// 但它们有个共同的目的 (即是做一个安全检查)。

console.log('store_0 state after initialization:', store_0.getState())
// 输出：
// store_0 state after initialization: { user: {}, items: [] }

// 有趣的是，我们发现 Redux 正确处理了 state 的各个部分。最终的 state 完全是一个简单的对象，由
// userReducer 和 itemsReducer 返回的部分 state 共同组成。
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// 由于我们为每个 reducer 初始化了一个特殊的值（userReducer 的是空对象 {} ，itemsReducer 的是空数
// 组 [] ）,所以在最终 Redux 的 state 中找到那些值并不是巧合。

// 现在，关于 reducer 如何工作我们已经有了清楚的理解。是时候去看看当 action 被分发（dispatch）时会对
// Redux 的 state 有什么影响。

// 继续下一个教程: 06_dispatch-action.js
