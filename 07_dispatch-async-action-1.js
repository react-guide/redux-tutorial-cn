// 章节 7 - dispatch-async-action-1.js

// 在上节教程中我们知道了如何分发 action 以及这些 action 如何通过 reducer 函数修改应用状态。

// 但是，到目前为止，我们只考虑了一种情况，同步场景下的 action，准确地说是同步 action creator，它创建同步的 action，
// 也就是当 action creator 被调用时，action 会被立即返回。

// 我们来设想一个简单的异步场景：
// 1）用户点击“Say Hi in 2 seconds”按钮
// 2）当用户点击按钮 A，我们希望经过两秒，视图显示一条消息 Hi
// 3）两秒过去之后，更新视图，显示消息 Hi

// 当然这条消息是应用的状态之一，所以我们必然将其存储于 Redux store。
// 但是我们希望的结果是，在调用 action creator 的两秒之后才把消息存入 store（因为如果立即更新状态，
// 那么就会立即触发所有监听状态变更的订阅者 —— 例如视图，导致消息早于两秒显示）。

// 如果我们按照目前调用 action creator 的方式...

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

var sayActionCreator = function (message) {
    return {
        type: 'SAY',
        message
    }
}

console.log("\n", 'Running our normal action creator:', "\n")

console.log(new Date());
store_0.dispatch(sayActionCreator('Hi'))

console.log(new Date());
console.log('store_0 state after action SAY:', store_0.getState())

// 输出（忽略初始输出）：
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     store_0 state after action SAY: { speaker: { message: 'Hi' } }


// ... 结果 store 被立即更新了。

// 我们希望看到的结果应该类似于下面这样的代码：

var asyncSayActionCreator_0 = function (message) {
    setTimeout(function () {
        return {
            type: 'SAY',
            message
        }
    }, 2000)
}

// 但是这样 action creator 返回的不是 action 而是 undefined。所以这并不是我们所期望的解决方法。

// 这里有个诀窍：不返回 action，而是返回 function。这个 function 会在合适的时机 dispatch action。但是如果我们希望
// 这个 function 能够 dispatch action，那么就需要向它传入 dispatch 函数。于是代码类似如下：

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

// 你可能再次注意到 action creator 返回的不是 action 而是 function。
// 所以 reducer 函数很可能不知道如何处理这样的返回值，而你也并不清楚是否可行，那么让我们一起再做尝试，一探究竟。

// 开始下节教程：08_dispatch-async-action-2.js
