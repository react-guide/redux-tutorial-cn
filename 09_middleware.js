// 章节 9 - middleware.js

// 在 dispatch-async-action-2.js 章节中我们留下了一个概念：”中间件“。中间件
// 以某种方式帮助我们处理处理异步的 action 。所以 中间件到底是什么呢？

// 通常来说中间件是在某个应用中A和B两部分之间的一块，把A发送数据到B的形式从
// A -----> B
// 变成:
// A ---> middleware 1 ---> middleware 2 ---> middleware 3 --> ... ---> B

// 那么中间件在 Redux 环境下如何帮助我们呢？看上去 Redux 不会自动处理我们从异步 action creator 中
// 返回的函数，但如果在 action creator 和 reducer 之间增加一个中间件，就可以把这个函数变得
// 适合 Redux 处理：

// action ---> dispatcher ---> middleware 1 ---> middleware 2 ---> reducers

// 每当一个 action (或者其诸如异步 action createror 中的某个函数）被分发时，我们的中间件就会被调用
// 并且在需要的时候协助 action creator 对真正的 action 进行分发（或者什么都不做-这很合理，也是我们有时会期望的效果）

// 在 Redux 中，中间件是纯粹的函数，有非常鲜明的特点并且严格的遵循以下格式：
/*
    var anyMiddleware = function ({ dispatch, getState }) {
        return function(next) {
            return function (action) {
                // your middleware-specific code goes here
            }
        }
    }
*/

// 如上所述，中间件由三个嵌套的函数构成（这样可以实现有序调用）：
// 1) 第一层向其余两层提供分发函数和一个 getState 函数（因为你的中间件或 action creator 可能需要从 state 中读取数据）
// 2) 第二层提供 next 函数，它允许你显式的将处理过的输入传递给下一个中间件或 Redux（这样 Redux 最后可以调用所有 reducer)。
// 3) 第三层提供从之前的中间件或 dispatch 接收到的 action ，他们都可以触发下一个中间件（让 action 保持流动) 或者
//    以任何合适的方式让 action 继续执行。

// 学习过函数式编程的人可能会意识到给上述代码提供一个功能模式：柯里化（如果你不理解也没关系，跳过接下去的 10 行
// 不会影响你对 redux 的理解）。使用柯里化，你可以简化上述函数：
/*
    // "curry" may come any functional programming library (lodash, ramda, etc.)
    var thunkMiddleware = curry(
        ({dispatch, getState}, next, action) => (
            // your middleware-specific code goes here
        )
    );
*/

// 我们为异步 action creator 提供的中间件叫 thunk middleware 它的代码在：https://github.com/gaearon/redux-thunk.
// 它看上去是这样 (为了可读性使用 es5 语法书写该函数）:

var thunkMiddleware = function ({ dispatch, getState }) {
    // console.log('Enter thunkMiddleware');
    return function(next) {
        // console.log('Function "next" provided:', next);
        return function (action) {
            // console.log('Handling action:', action);
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}

// 为了让 Reudx 知道我们有一个或多个中间件，我们必须使用 Redux 的一个 helper 函数：applyMiddleware.

// "applyMiddleware" 把所有中间件作为参数，返回一个供 Redux createStore 调用的函数。
// 当最后这个函数被调用时，它会产生”一个专门为 store 的 dispatch 提供中间件的高度序列化的 store"。
// (来自 https://github.com/rackt/redux/blob/v1.0.0-rc/src/utils/applyMiddleware.js)

// 下面就是如何将一个中间件融入到 Redux store:

import { createStore, combineReducers, applyMiddleware } from 'redux'

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
// 针对多个中间件， 使用: applyMiddleware(middleware1, middleware2, ...)(createStore)

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
                return state
        }
    }
})

const store_0 = finalCreateStore(reducer)
// 输出:
//     speaker was called with state {} and action { type: '@@redux/INIT' }
//     speaker was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_s.b.4.z.a.x.a.j.o.r' }
//     speaker was called with state {} and action { type: '@@redux/INIT' }

// 现在我们有了全部就绪的中间件 store 实例，现在再次尝试分发我们的异步 action：

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")

store_0.dispatch(asyncSayActionCreator_1('Hi'))
// 输出:
//     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
//     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }

// 当我们调用异步 action creator 两秒之后，action 成功的分发出去。

// 你可能会好奇，一个中间件如何 log 出所有已分发的 action ，是这样：

function logMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
}

// Same below for a middleware to discard all actions that goes through (not very useful as is
// 同样的，下面是一个中间件如何抛出所有经过的 action （不是很实用，但是逻辑上它可以在传到其余
// 中间件或 Redux 的过程中有选择的抛出一部分 action）：
function discardMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('discardMiddleware action received:', action)
        }
    }
}

// 通过使用 logMiddleware 或 discardMiddleware 试着修改上述的 finalCreateStore 调用
// 看看会发生什么...
// 比如，这样用:
//     const finalCreateStore = applyMiddleware(discardMiddleware, thunkMiddleware)(createStore)
// 会让你的 action 永远不接触你的 thunkMiddleware 甚至 reducer 。

// 在 http://rackt.org/redux/docs/introduction/Ecosystem.html, 的中间件部分可以了解其他例子。

// 总结一下到目前为止我们所学的：
// 1) 我们知道怎样写 action 和 action creator
// 2) 我们知道怎样分发我们的 action
// 3) 我们知道怎样使用中间件处理特定的 action 比如异步 action

// 让一个 Flux 应用行程闭环，我们还剩下唯一的一块就是如何订阅 state 的更新
// 让他们”react化“（比如重新渲染我们的组件)

// 所以我们怎么订阅 Redux store 的变更呢？

// 继续下一个教程: 10_state-subscriber.js
