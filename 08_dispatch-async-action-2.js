// 章节 8 - dispatch-async-action-2.js

// 运行之前我们在 dispatch-async-action-1.js 中实现的第一个异步 action creator：

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    speaker: function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)

        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state;
        }
    }
})
var store_0 = createStore(reducer)

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", 'Running our async action creator:', "\n")
store_0.dispatch(asyncSayActionCreator_1('Hi'))

// 输出：
//     ...
//     /Users/classtar/Codes/redux-tutorial/node_modules/redux/node_modules/invariant/invariant.js:51
//         throw error;
//               ^
//     Error: Invariant Violation: Actions must be plain objects. Use custom middleware for async actions.
//     ...

// 我们所设计的 function 似乎没有进入 reducer 函数。但是 Redux 给出了温馨提示：使用自定义中间件（middleware）来支持异步 action。
// 看来我们的方向是正确的，可中间件（middleware）又是什么呢？

// 我向你保证 action creator asyncSayActionCreator_1 不仅没有问题，而且只要我们搞清楚 middleware 的概念并掌握它的使用方法，
// 这个异步 action creator 就会按照我们所设想的结果执行。

// 开始下节教程：09_middleware.js
