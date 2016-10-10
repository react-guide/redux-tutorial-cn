// 章节 4 - get-state.js

// 如何从 Redux 实例中读取 state ？

import { createStore } from 'redux'

var reducer_0 = function (state, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)
}

var store_0 = createStore(reducer_0)
// 输出: reducer_0 was called with state undefined and action { type: '@@redux/INIT' }

// 为了读取 Redux 保存的 state，你可以调用 getState

console.log('store_0 state after initialization:', store_0.getState())
// 输出: store_0 state after initialization: undefined

// 都已经初始化过了，难道程序的 state 还是 undefined 的？没错，正是如此，
// 到目前为止，我们的 reducer 还什么事都没做过…… 你是否还有印象，我们在 "about-state-and-meet-redux" 那一章里是怎么描述一个 reducer 的预期行为的？
//   “一个 reducer 只是一个函数，它能收到程序当前的 state 与 action，
//    然后返回一个 modify（又或者学别人一样称之为 reduce ）过的新 state ”
// 我们的 reducer 目前什么都不返回，所以程序的 state 当然只能是 reducer() 返回的那个叫 “undefined” 的东西。

// 接下来，我们试着在 reducer 收到 undefined 的 state 时，给程序发一个初始状态：

var reducer_1 = function (state, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)
    if (typeof state === 'undefined') {
        return {}
    }

    return state;
}

var store_1 = createStore(reducer_1)
// 输出：reducer_1 was called with state undefined and action { type: '@@redux/INIT' }

console.log('store_1 state after initialization:', store_1.getState())
// 输出：store_1 state after initialization: {}

// 如我们所愿，现在 Redux 初始化以后返回的 state 变成 {} 了
//
// 感谢ES6，这个模式现在实现起来很清晰：

var reducer_2 = function (state = {}, action) {
    console.log('reducer_2 was called with state', state, 'and action', action)

    return state;
}

var store_2 = createStore(reducer_2)
// 输出: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState())
// 输出: store_2 state after initialization: {}

// 估计你已经发现了，我们给 reducer_2 的 state 参数传了默认值之后，
// reducer 就不会再取到 undefined 的 state 了。

// 小结一下：调用  reducer ，只是为了响应一个派发来的 action 。
// 接下来，我们在 response 里模拟一个 state 修改，其响应的 action 类型是 'SAY_SOMETIHG'

var reducer_3 = function (state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)

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

var store_3 = createStore(reducer_3)
// 输出: reducer_3 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_3 state after initialization:', store_3.getState())
// 输出: store_3 state after initialization: {}

// 到目前为止，我们都还没有得到一个新 state， 因为我们还没有真的派发过任何 action 。
// 不过在最后一个例子里，有几个点值得注意：
//
//     0) 我假设了 action 里一定包含了一个 type 跟一个 value 。type 基本上是 flux action 已经约定俗成的，
//        而 value 属性可以是任何类型的。
//     1) 这里有个常见模式：在 reducer 里用 switch 来响应对应的 action 。
//     2) 用 switch 的时候， **永远** 不要忘记放个 “default” 来返回 “state”，否则，
//        你的 reducer 可能会返回 “undefined” （等于你的 state 就丢了）
//     3) 注意 { message: action.value } 是怎么被合并到当前 state 来形成新 state 的，
//        这全要感谢牛逼的 ES7 notation (Object Spread): { ...state, message: action.value }
//     4) 还要注意：之所以这个例子能用ES7 Object Spread notation ，是因为它只对 state 里的
//         { message: action.value} 做了浅拷贝（也就是说， state 第一个层级的属性直接被 { message: action.value } 覆盖掉了 —— 与之相对，其实也有优雅的合并方式 ）
//         但是如果数据结构更复杂或者是嵌套的，那处理state更新的时候，很可能还需要考虑一些完全不同的做法：
//        - 可以考虑： Immutable.js (https://facebook.github.io/immutable-js/)
//        - 可以考虑： Object.assign (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
//        - 可以考虑： 手工合并
//        - 又或者考虑用其它任何能满足需要且适合 state 结构的方法，Redux 对此是全无预设的方式的（要记得 Redux 只是个状态的容器）。

// 现在开始，我们要在 reducer 里处理 action 了，我们将会有多个 reducer 并会组合它们。

// 前往下一个章节: 05_combine-reducers.js
