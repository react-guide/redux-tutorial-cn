// 章节 1 - simple-action-creator.js

// 我们在前言中已经简单提到过 action，但具体什么是 action creator，它们又是如何关联到 action 的呢？

// 其实，通过几行简单的代码就可以解释清楚了！

// action creator 就是函数而已...
var actionCreator = function() {
    // ...负责构建一个 action （是的，action creator 这个名字已经很明显了）并返回它
    return {
        type: 'AN_ACTION'
    }
}

// 这就完了？是的，仅此而已。

// 然而，有一件事情需要注意，那就是 action 的格式。flux 一般约定 action 是一个拥有 type 属性的对象。
// 然后按 type 决定如何处理 action。当然，action 依旧可以拥有其他属性，你可以任意存放想要的数据。

// 在后面的章节中，我们会发现 action creator 实际上可以返回 action 以外的其他东西，比如一个函数。
// 这在处理异步时很有用（更多的内容可以查阅 dispatch-async-action.js）。

// 我们可以直接调用 action creator，如同预期的一样，我们会得到一个 action：
console.log(actionCreator())
// 输出： { type: 'AN_ACTION' }

// 好了，以上代码没有任何问题，却也毫无用处...
// 在实际的场景中，我们需要的是将 action 发送到某个地方，让关心它的人知道发生了什么，并且做出相应的处理。
// 我们将这个过程称之为“分发 action（Dispatching an action）”。

// 为了分发 action，我们需要...一个分发函数（=￣ω￣=）。
// 并且，为了让任何对它感兴趣的人都能感知到 action 发起，我们还需要一个注册“处理器（handlers）”的机制。
// 这些 action 的“处理器”在传统的 flux 应用中被称为 store，在下个章节中，我们会介绍它们在 Redux 中叫什么。

// 至止，我们的应用中包含了以下流程：
// ActionCreator -> Action

// 可以在以下链接中了解更多关于 action 和 action creator 的内容：
// http://rackt.org/redux/docs/recipes/ReducingBoilerplate.html

// 下一章节： 02_about-state-and-meet-redux.js
