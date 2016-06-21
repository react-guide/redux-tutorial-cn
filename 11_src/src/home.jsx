// 教程 12 - Provider-and-connect.js

// 我们的教程快结束了, 离对 Redux 有一个好的认识只差一步: 如何从 store 中的 state 读取, 和以及如何派发 actions?

// 这两个问题可以用 react-redux 的 connect 绑定一并解决。

// 如我们之前解释的, 当使用 Provider 组件的时候, 我们允许应用中所有组件访问 Redux。
// 但这个访问只能通过没有配备说明文档的功能 "React 的 context" 来完成。
// 为了避开这如"黑魔法"般的 React API , React-Redux 暴露了一个函数, 这样你就能在组件的 类中使用它。

// 我们讨论的这个函数就是 "connect" , 它能让我们用 Redux 的 store 字面值与组件连接上。
// 这样一来, 它就能让你 store 中的 dispatch 函数通过组件的 props 传递,
// 而且可以添加任何你想暴露的属性, 这些暴露的属性将作为你 store 中 state 的一部分。

// 使用 "connect", 能仅用很少的代码将一个笨拙组件 (dumb component) 转换成一个智能组件 (smart component)
// 参见: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

// "connect" is a function that takes as parameters few mapping functions and that returns a function expecting
// the actual component class you want to connect.
// 这样一个函数(指 "connect") 被称之为高阶组件 (HOC, Higher Order Component)。
// 高阶组件(译者注: 原文为 Higher Order functions, 可能写错了)来源于"函数设计模式", 这种设计可以在不使用继承的情况下向其添加功能与行为 (component, store, ...)
// 这种方式有利于合成继承, 而且也是开发 React 应用的优先方法(但不是仅限的方法)。
// 下面有更多关于高阶组件 (HOC) 与合成的文章:
// - https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.lpp7we7mx
// - http://natpryce.com/articles/000814.html

// 高阶函数 "connect" 旨在解决所有, 从最简单到最复杂的使用情况。
// 在本例中, 我们不会用 "connect" 做很复杂的事,
// 但你可以去下面链接看看完整的 "connect" API 文档:
// https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// 这有个 "connect" 的完整用法:
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// 这还有个你应该如何使用它:
/*
  const wrappedComponentClass = connect(...)(ComponentClass)
*/

// 我们只关注这里 "connect" 的第一个参数: mapStateToProps...

// "connect" 接收了一个参数, 该参数是个函数, 它用于将你想要暴露给组件的数据片段从 state 中选取出来。
// 该函数逻辑上称之为 "selector", 它接收2个参数: 你 store 中的 state, 和当前组件的 props。
// 如下面所示, 我们将该函数命名为 "mapStateToProps"。
// 这个语义化的命名, 只是为了清晰表达该函数是用于: 将 state 映射(或解释为提取)到一些组件的 props 中。
// 组件的 props 还作为参数来提供, 就像通常从基于 state 中的 props 中提取数据片段一样,
// 例如: state.items[props.someID]。

// "mapStateToProps" 应该返回你想要暴露给组件的 props (一般通过一个字面量对象)。
// 这取决于在返回 state 时, 先转换接收到的 state。
// 你可以看看下面 "connect" 的最简单用法(就在组件类的定义之后)。

import React from 'react'
import { connect } from 'react-redux'
// 我们用 ES6 的 import 写法来获取所有的 action 创建函数, 如同我们在 reducers 中那样。
// 如果你还没看过我们的 action 创建函数, 转到 ./action-creators.js 去看看。
import * as actionCreators from './action-creators'

class Home extends React.Component {
  onTimeButtonClick (delay) {
      // 当用户点击这个按钮的时候, 该句柄会派发一个action来响应。
      // 这里我们使用的 dispatch 函数由 props 中的 connect "自动"提供。
      // 还有多种其他的方法来调用已经绑定到 dispatch 中的 actionCreator, 这意味着可以向 "connect" 提供第二个参数:
      // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
      // "delay" 的值传递给 actionCreators.getTime, 用于在获取当前时间之前模拟一次成功的异步操作。
      // 尝试修改 delay 的值, 验证延迟是否正确影响了我们的 UI。
    this.props.dispatch(actionCreators.getTime(delay))
  }
  render () {

      // 要感谢 "connect", 我们能够通过 props 来获取已选择的具体的数据
    var { frozen, time, reduxState } = this.props
    var attrs = {}
    const DELAY = 500 // 单位: 毫秒

    if (frozen) {
        attrs = {
          disabled: true
        }
    }

    return (
      <div>
        <h1>Provider and connect example</h1>
        <span>
          <b>What time is it?</b> { time ? `It is currently ${time}` : 'No idea yet...' }
        </span>
        <br /> <br />
        <i>
          When clicking the button below, the time will be provided after a {DELAY}ms delay.<br />
          Try to change this value (in <b>src/home.jsx - line 95</b>) to verify that the delay given correctly impacts our UI.
        </i>
        <br />
        {/* 这里注册按钮的 "onClick" 句柄: */}
        <button { ...attrs } onClick={() => this.onTimeButtonClick(DELAY)}>Get time!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}

// 这个函数中, 我们将想通过 props 暴露给组件的数据片段从 state 中提取出来。
const mapStateToProps = (state/*, props*/) => {
  return {
    frozen: state._time.frozen,
    time: state._time.time,
    // 像下面这样 (reduxState: state) 将整个 state 都提供出去不太好,
    // 这里这样写只是给你看一下, 更多相关请见:
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome

// 你也许注意到了, 正是要感谢 Redux, 在 state(当前时间下) 的驱动下我们有了动态的组件,
// 该 state 在组件中并不扮演任何角色,
// 我们的组件仅仅只接收 props 中需要的数据。
// 这种组件称之为无状态的组件。在应用程序中你应该总是开发无状态的组件(如之前见过的的笨拙组件)。
// 因为无状态组件具有更高的复用性。
// 就像 "onTimeButtonClick" 句柄中建议的, 将点击回调通过 "connect" 的第二个参数 "mapDispatchToProps" 传递的时候, 我们可以做更多事情。
// 如此这般, 我们就可以将按钮的行为提取出来, 通过替换不同的点击动作, 使之有更高的复用性。
// 复用性似乎成了一个花哨且过度使用的概念, 但是可复用组件意味着, 它可以被很容易的测试, 因为你可以注入任何数据, 然后检查它是否处理正常, 确保它行为正确。

// 在转到 ./12_final-words.js 之前, 请先阅读一下这个旁注: 如何使用 "connect" 连接高阶组件的另外一种方法...

// 因为 connect(...) 返回2个东西: 接收一个类(class) 的函数, 和另外一个类(class),
// 如果你愿意的话, 可以使用 ES7 的修饰器(Decorator) 方法来写。
// 修饰器(Decorator) 是 ES7 中的实验性功能, 它使我们能在设计类与属性时对其进行修改,
// 更多请见: https://github.com/wycats/javascript-decorators

// 该功能是实验性的, 它受制于语言标准的变化。
// 这意味着, 如果你使用了它, 你必须当心和接受标准演进所带来的不确定性。
// 修饰器提供了一个语法糖, 用它编码会和上面的代码有些小区别。
// 以前这样写:

/*
  class MyClass {}
  export default somedecorator(MyClass)
*/

// 现在这样写:

/*
  @somedecorator
  export default class MyClass {}
*/

// Applying this syntax to redux connect, you can replace:

/*
  let mapStateToProps = (state) => { ... }
  class MyClass {}
  export default connect(mapStateToProps)(MyClass)
*/

// by:

/*
  let mapStateToProps = (state) => { ... }
  @connect(mapStateToProps)
  export default class MyClass {}
*/

// As you can see the application of the HOC function on the component class is now made implicit ( @connect(mapStateToProps) )
// instead of calling it ourselves ( @connect(mapStateToProps)(Myclass) ). Some find this approach more elegant, others
// dislike the fact that it's hiding what is really happening and many just don't get how decorators works. Knowing all that
// and remembering that decorators are still experimental, you can now decide by youselves which "connect" usage you
// prefer and you won't be suprised to find both syntax in the many articles, tutorials, starter kits, etc. out there.

// Go to ./12_final-words.js for our last advice about what to do now...
