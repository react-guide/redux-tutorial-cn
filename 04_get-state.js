// 章节 4 - get-state.js

// 你该如何从我们的Redux实例中取出state？

import { createStore } from 'redux'

var reducer_0 = function (state, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)
}

var store_0 = createStore(reducer_0)
// 输出: reducer_0 was called with state undefined and action { type: '@@redux/INIT' }

// 你可以调用getState来取出Redux为我们保存的state

console.log('store_0 state after initialization:', store_0.getState())
// 输出: store_0 state after initialization: undefined

// So the state of our application is still undefined after the initialization? Well of course it is,
// our reducer is not doing anything... Remember how we described the expected behavior of a reducer in
// "about-state-and-meet-redux"?
//     "A reducer is just a function that receives the current state of your application, the action,
//     and returns a new state modified (or reduced as they call it)"
// Our reducer is not returning anything right now so the state of our application is what
// reducer() returns, hence "undefined".

// 可是难道在初始化之后,我们程序的state依然是undefined？是的，当然是这样，我们的reducer还什么都没做……
// 你是否还记得，在"about-state-and-meet-redux"那一章里，我们是怎么描述一个reducer的预期行为的？
//   “一个reducer只是一个函数，它可以收到程序的当前state，action，
//    并返回一个新的修改（或者像他们那样叫reduced）过的state）”
// 我们的reducer目前还什么都不返回，所以我们程序的状态就是reducer()所返回的东西，也就是“undefined”。

// Let's try to send an initial state of our application if the state given to reducer is undefined:
// 让我们试着在reducer收到的state是undefined时候给我们的程序发送一个初始状态：

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

// As expected, the state returned by Redux after initialization is now {}
// 正如预期的那样，现在Redux初始化以后返回的state变成了{}

// There is however a much cleaner way to implement this pattern thanks to ES6:
// 感谢ES6，现在这个模式实现起来比以前清晰很多

var reducer_2 = function (state = {}, action) {
    console.log('reducer_2 was called with state', state, 'and action', action)

    return state;
}

var store_2 = createStore(reducer_2)
// Output: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState())
// Output: store_2 state after initialization: {}

// You've probably noticed that since we've used the default parameter on state parameter of reducer_2,
// we no longer get undefined as state's value in our reducer's body.
// 你大概已经注意到了，自从我们给reducer_2的state参数传了默认值，
// 我们就再也不会在reducer的函数体里取到一个undefined的state了。

// Let's now recall that a reducer is only called in response to an action dispatched and
// let's fake a state modification in response to an action type 'SAY_SOMETHING'
// 我们现在回忆一下，一个reducer只是作为对一个response的回应而调用，
// 我们来在response里伪造一个action类型是'SAY_SOMETIHG'的state修改

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
// Output: reducer_3 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_3 state after initialization:', store_3.getState())
// Output: redux state after initialization: {}

// Nothing new in our state so far since we did not dispatch any action yet. But there are few
// important things to pay attention to in the last example:
//     0) I assumed that our action contains a type and a value property. The type property is mostly
//        a convention in flux actions and the value property could have been anything else.
//     1) You'll often see the pattern involving a switch to respond appropriately
//        to an action received in your reducers
//     2) When using a switch, NEVER forget to have a "default: return state" because
//        if you don't, you'll end up having your reducer return undefined (and lose your state).
//     3) Notice how we returned a new state made by merging current state with { message: action.value },
//        all that thanks to this awesome ES7 notation (Object Spread): { ...state, message: action.value }
//     4) Note also that this ES7 Object Spread notation suits our example because it's doing a shallow
//        copy of { message: action.value } over our state (meaning that first level properties of state
//        are completely overwritten - as opposed to gracefully merged - by first level property of
//        { message: action.value }). But if we had a more complex / nested data structure, you might choose
//        to handle your state's updates very differently:
//        - using Immutable.js (https://facebook.github.io/immutable-js/)
//        - using Object.assign (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
//        - using manual merge
//        - or whatever other strategy that suits your needs and the structure of your state since
//          Redux is absolutely NOT opinionated on this (remember, Redux is a state container).

// 到目前为止，因为我们还没有dispatch过任何action，所以我们还没有得到任何新state。不过在最后一个例子里，有几点很重要的事情值得特别注意：
//      0) 

// Now that we're starting to handle actions in our reducer let's talk about having multiple reducers and
// combining them.

// Go to next tutorial: 05_combine-reducers.js
