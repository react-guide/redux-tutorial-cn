// 章节 6 - dispatch-action.js

// 迄今为止我们的关注点都是绑定我们的 reducer，但我们还未 dispatch 任何一个 action。
// 我们将会用到上一章的 reducer ，并用它们处理一些 action：

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store_0 = createStore(reducer)


console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())
// 输出：
// store_0 state after initialization: { user: {}, items: [] }

// 让我们来 dispatch 我们的第一个 action... 记住在 'simple-action-creator.js' 中所提到的：
//     "为了 dispatch 一个 action，我们需要一个 dispatch 函数。"

// 我们所看到的 dispatch 函数，是 Redux 提供的，并且它会将 action 传递
// 给任何一个 reducer！dispatch 函数本质上是 Redux
// 的实例的属性 "dispatch"

// dispatch 一个 action：

store_0.dispatch({
    type: 'AN_ACTION'
})
// 输出：
// userReducer was called with state {} and action { type: 'AN_ACTION' }
// itemsReducer was called with state [] and action { type: 'AN_ACTION' }

// 每一个 reducer 都被调用了，但是没有一个 action type 是 reducer 需要的，
// 因此 state 是不会发生变化的：

console.log('store_0 state after action AN_ACTION:', store_0.getState())
// 输出：store_0 state after action AN_ACTION: { user: {}, items: [] }

// 但是，等一下！我们是不是可以用一个 action creator 去发送一个 action？我们确实可以
// 用一个 actionCreator，但由于它只是返回一个 action，那么就意味着它不会携带任何东西
// 到这个例子中。但为了面对未来遇到的困难，我们还是以正确的方式，
// 即以 flux 理论去做吧。让我们使用这个 action creator 发送一个我们想要的 action：

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

store_0.dispatch(setNameActionCreator('bob'))
// 输出：
// userReducer was called with state {} and action { type: 'SET_NAME', name: 'bob' }
// itemsReducer was called with state [] and action { type: 'SET_NAME', name: 'bob' }

console.log('store_0 state after action SET_NAME:', store_0.getState())
// 输出：
// store_0 state after action SET_NAME: { user: { name: 'bob' }, items: [] }

// 我们刚刚处理了一个 action，并且它改变了应用的 state！

// 但是这似乎太简单了，并且还不足以充当一个真实的用例。例如，
// 如果我们要在 dispatch action 之前做一些异步的操作，那应该怎么做呢？
// 我们将在下一章节 "dispatch-async-action.js" 中讨论这个问题

// 至止，我们接触的应用流程是这样的：
// ActionCreator -> Action -> dispatcher -> reducer

// 下一章节：07_dispatch-async-action-1.js
