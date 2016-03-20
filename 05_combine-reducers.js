// 章节 5 - combine-reducers.js

// We're now starting to get a grasp of what a reducer is...
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

// ... but before going further, we should start wondering what our reducer will look like when
// we'll have tens of actions:
// 在继续之前，我们想象一c下拥有很多 action 的 reducer 长什么样子

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

// It becomes quite evident that a single reducer function cannot hold all our
// application's actions handling (well it could hold it, but it wouldn't be very maintainable...).
// 很显然，只有一个 reducer 是hold不住我们整个应用中所有 action 的
// （好吧，事实上它是可以的，但这将会变得很难维护。）

// Luckily for us, Redux doesn't care if we have one reducer or a dozen and it will even help us to
// combine them if we have many!
// 幸运的是，Redux 不关心我们到底是只有一个 reducer ，还是有一打（12个）reducer 。
// 如果我们有多个 reducer ，Redux 能帮我们合并成一个。

// Let's declare 2 reducers
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

// I'd like you to pay special attention to the initial state that was actually given to
// each reducer: userReducer got an initial state in the form of a literal object ({}) while
// itemsReducer got an initial state in the form of an array ([]). This is just to
// make clear that a reducer can actually handle any type of data structure. It's really
// up to you to decide which data structure suits your needs (an object literal, an array,
// a boolean, a string, an immutable structure, ...).
// 我希望你能注意到赋给每个 reducer 的默认 state ： 
//     1. 赋给 userReducer 的默认 state 是一个空对象，即 {}
//     2. 赋给 itemsReducer 的默认 state 是一个空数组，即 []
// 赋予不同类型的值是为了说明 reducer 是可以处理任何类型的数据结构的。你完全可以选择那些符合
// 你的需求的数据结构作为 state 的值。（例如，字面量对象、数组、布尔值、字符串或其它固定结构）

// With this new multiple reducer approach, we will end up having each reducer handle only
// a slice of our application state.
// 在这种多个 reducer 的模式下，我们可以让每个 reducer 只处理整个应用的 state 中的一部分。

// But as we already know, createStore expects just one reducer function.
// 但我们需要知道，createStore 只接收一个 reducer 函数。

// So how do we combine our reducers? And how do we tell Redux that each reducer will only handle
// a slice of our state?
// It's fairly simple. We use Redux combineReducers helper function. combineReducers takes a hash and
// returns a function that, when invoked, will call all our reducers, retrieve the new slice of state and
// reunite them in a state object (a simple hash {}) that Redux is holding.
// Long story short, here is how you create a Redux instance with multiple reducers:
// 那么，我们怎么合并所有的 reducer ？ 我们又该如何告诉 Redux 每个 reducer 只处理一部分的 state 呢？
// 其实这很简单。我们使用 combineReducers 辅助函数。
// combineReducers 接收一个 [对象](what-is-hash) 并返回一个[函数](what-is-func)，当 combineReducers 被调用时，它会去调用每个 reducer ，
// 把返回的每一块 state 重新组合成一个大 state 对象（也就是 Redux 中的 Store）。
[what-is-hash]: "https://github.com/camsong/redux-in-chinese/blob/master/docs/api/combineReducers.md#参数"
[what-is-func]: "https://github.com/camsong/redux-in-chinese/blob/master/docs/api/combineReducers.md#返回值"

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
// Output:
// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_9.r.k.r.i.c.n.m.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_4.f.i.z.l.3.7.s.y.v.i' }
var store_0 = createStore(reducer)
// Output:
// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

// As you can see in the output, each reducer is correctly called with the init action @@redux/INIT.
// But what is this other action? This is a sanity check implemented in combineReducers
// to assure that a reducer will always return a state != 'undefined'.
// Please note also that the first invocation of init actions in combineReducers share the same purpose
// as random actions (to do a sanity check).
// 正如你从输出中看到的，每个 reducer 都被正确地调用了（接收了 init action @@redux/INIT ）。
// 这个 action 是什么鬼？这是 combineReducers 实施的一个安全检查，确保 reducer 永远不会返回 undefined 。

console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// It's interesting to note that Redux handles our slices of state correctly,
// the final state is indeed a simple hash made of the userReducer's slice and the itemsReducer's slice:
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// Since we initialized the state of each of our reducers with a specific value ({} for userReducer and
// [] for itemsReducer) it's no coincidence that those values are found in the final Redux state.

// By now we have a good idea of how reducers will work. It would be nice to have some
// actions being dispatched and see the impact on our Redux state.

// Go to next tutorial: 06_dispatch-action.js
