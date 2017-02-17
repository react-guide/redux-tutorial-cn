// 章节 2 - about-state-and-meet-redux.js

// 在实际应用中，我们不仅需要 action 告诉我们发生了什么，还要告诉我们需要随之更新数据。

// 这就让我们的应用变的棘手：
// 如何在应用程序的整个生命周期内维持所有数据？
// 如何修改这些数据？
// 如何把数据变更传播到整个应用程序？

// 于是 Redux 登场。

// Redux (https://github.com/reactjs/redux) 是一个“可预测化状态的 JavaScript 容器”。

// 我们先回顾上述提出的问题并用 Redux 的词汇表给出以下解答（部分词汇也来源于 Flux）：

// 如何在应用程序的整个生命周期内维持所有数据？
//      以你想要的方式维持这些数据，例如 JavaScript 对象、数组、不可变数据，等等。
//      我们把应用程序的数据称为状态。这是有道理的，因为我们所说的数据会随着时间的推移发生变化，这其实就是应用的状态。
//      但是我们把这些状态信息转交给了 Redux（还记得么？Redux 就是一个“容纳状态的容器”）。
// 如何修改这些数据？
//      我们使用 reducer 函数修改数据（在传统的 Flux 中我们称之为 store）。
//      Reducer 函数是 action 的订阅者。
//      Reducer 函数只是一个纯函数，它接收应用程序的当前状态以及发生的 action，然后返回修改后的新状态（或者有人称之为归并后的状态）。
// 如何把数据变更传播到整个应用程序？
//      使用订阅者来监听状态的变更情况。

// Redux 帮你把这些连接起来。
// 总之 Redux 提供了：
//     1）存放应用程序状态的容器
//     2）一种把 action 分发到状态修改器的机制，也就是 reducer 函数
//     3）监听状态变化的机制

// 我们把 Redux 实例称为 store 并用以下方式创建：
/*
    import { createStore } from 'redux'
    var store = createStore()
*/

// 但是当你运行上述代码，你会发现以下异常消息：
//     Error: Invariant Violation: Expected the reducer to be a function.

// 这是因为 createStore 函数必须接收一个能够修改应用状态的函数。

// 我们再试一下

import { createStore } from 'redux'

var store = createStore(() => {})

// 看上去没有问题了...

// 继续下一个教程：03_simple-reducer.js
