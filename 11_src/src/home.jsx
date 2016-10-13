// 教程 12 - Provider-and-connect.js

// 到这为止我们的教程就基本上结束了, 关于 Redux 唯一剩下的问题
// 就是我们如何能读取 store 里面的 state 以及如何进行action的分发。

// 这两个问题都能够使用 Connect 去解决。

// 正如我们前面所讲解的, 当我们使用 Provider 组件时,　我们允许我们应用中的所有组件访问Redux.
// 但是这种访问只能使用不正式的特性 React's context 来实现,
// 为了避免这种"黑科技"式 (不规范) 的 API 调用,
// React-Redux 为我们暴露了一个组件中的函数让我们可以使用。

// 这个函数就是 Connect , 它让我们可以实现一个组件和 Redux store 的绑定,
// 通过这种绑定可以让store通过组件的属性 (prop) 分发函数,
// 也可以根据我们自己的需要增加任何需要暴露的属性作为store里面state的一部分。

// 使用了 Connect , 你可以通过添加很少的代码让一个组件变得更"聪明",
// (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

// Connect 是一个接受一些映射函数作为参数, 并返回一个你想要链接的组件类函数, 的函数.
// 这样的函数被叫做高层组件 (Higher Order Component (HOC))
// HOC 函数是一种在不修改继承的情况下能够添加特性和行为到输入 (component, store) 中的函数模式。
// 这种方式比较继承更强调构成,
// 这也是创建 React 应用更建议的方式 (其实并没有这个限制)
// 阅读更多关于 HOC 和 composition 的文档:
// - https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.lpp7we7mx
// - http://natpryce.com/articles/000814.html

// Connect "HOC" 主要被设计用于解决无论简单和困难的使用场景。
// 在现有的例子中, 我们不会使用 Connect 最复杂的形式,
// 但是你可以在完整的 API 文档中找到有关的全部信息:
// https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// 以下是完整的 Connect 特征:
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// 它的使用方法如下:

/*
  const wrappedComponentClass = connect(...)(ComponentClass)
*/

// 我们在这里会主要讲解 Connect 的第一个参数: mapStateToProps

// Connect 将一个选择你想要将哪一些 state 暴露给组件的函数作为第一个参数。
// 这个函数我们一般称它为 Selector。
// 它需要接受两个参数: 当前 store 的状态 (state) 以及当前组件的 prop。
// 可以看见我们将这个函数命名为 "mapStateToProps",
// 这个名字从字面意义上告诉我们它的作用:
// 它创造了从 state 到一些组件 props 的映射 (map)

// 为了完成提取部分组建的 props 作为 state 的动作, (Ex: state.items[props.someID]).
// 组件的 props 也被作为参数提供。
// "mapStateToProps" 被期望返回所有你希望暴露给你的组件的 props, 通常通过一个对象常量 (object literal)返回。
// 你可以在返回前修改取得的 state 值。下面是一些简单的 Connect 应用 (在定义组件之后)

import React from 'react'
import { connect } from 'react-redux'
// 我们会使用一些 ES6 中的 import 技巧来得到所有的 action creator 并生成一个哈希值,
// 就跟我们当时在 reducer 部分所做的一样。如果你还没有了解action creator的话, 去看看相关章节吧~  (./action-creators.js).

import * as actionCreators from './action-creators'

class Home extends React.Component {
  onTimeButtonClick (delay) {
    // 这个按钮处理器在用户的点击事件后会分发一个 action。
    // 我们在这里会使用一个 Connect 提供的分发函数,
    // 也有很多其他的调用被绑定到分发器的 actionCreator 的方式,
    // 这种方式提供了第二个 Connect 的参数：
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    // 被传到 actionCreators.getTime 的 delay 值是为了在我们能得到当前时间之前模拟异步的工作,
    // 试着修改这个值来正确影响我们的 UI
    this.props.dispatch(actionCreators.getTime(delay))
  }
  render () {

    // 因为 Connect 我们能够通过 props 取到特定的数据
    var { frozen, time, reduxState } = this.props
    var attrs = {}
    const DELAY = 500 // 毫秒

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

// 这是我们的 select 函数, 它会把我们需要在属性 (prop) 中对我们的组件暴露的数据从 state 中抽离出来
const mapStateToProps = (state/*, props*/) => {
  return {
    frozen: state._time.frozen,
    time: state._time.time,
    // 像 (reduxState: state) 这样提供整个 state 是一种不好的实现,
    // 我们在这里这样写是为了让大家能看到我们页面字符串化的结果。更多信息请访问以下链接:
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome

// 也许你会发现因为 Redux 让我们可以拥有需要一些状态 (比如保存当前时间) 的动态组件,
// 而这个状态并不在组件当中存在,
// 我们的组件只会接受含有需要的数据的 prop。
// 我们现在拥有了一个无状态组件 (stateless component), 相比较有状态的组件,
// 我们在编码中应该尽可能更多的使用无状态组件, 因为它们更易于被复用。
// 正如在 "onTimeButtonClick" 处理器中建议的一样, 我们甚至可以把点击的回调函数作为一个 prop
// 从 Connect 的第二个参数 "mapDispatchToProps" 中传入。这么做的话, 我们就可以在组件之外获得按钮的行为,
// 通过允许另一种点击行为让我们更易于重用这个按钮。
// 可复用性的概念也许看起来被过度强调了, 但是拥有一个可复用的组件通常也意味着
// 这个组件能够很简单的被测试 (因为你可以将任何你想要的数据和处理器插入你的组件中,
// 从而很简单的保证它的正确运行)

// 在去看 ./12_final-words.js 之前, 请仔细看以下另一种使用 Connect HOC 的方法。

// 因为 Connect 返回了一个接受一个 class 并返回另一个 class 的函数，
// 我们可以用它作为 ES7 的 decorator。Decorator 是一种 ES7 的实验新特性,
// 让我们能够在设计的时候注释和修改 class 和属性 (https://github.com/wycats/javascript-decorators).

// 作为一个试验中的特性, 也许会有变化或问题。
// 如果你选择从现在开始使用的话, 请注意和接受今后的不确定性。
// Decorator 提供了一些代码的语法糖让我们的代码变得稍稍不同。原来的这种写法:

/*
  class MyClass {}
  export default somedecorator(MyClass)
*/

// 你可以这么写:

/*
  @somedecorator
  export default class MyClass {}
*/

// 通过这种特性使用 redux connect, 我们可以把如下代码:

/*
 let mapStateToProps = (state) => { ... }
 @connect(mapStateToProps)
 export default class MyClass {}
 */

// 替换成:

/*
  let mapStateToProps = (state) => { ... }
  class MyClass {}
  export default connect(mapStateToProps)(MyClass)
*/

// 正如我们看到的, 高层组件的函数现在被作为隐函数使用 ( @connect(mapStateToProps) )
// 而不是直接调用它们自身  ( @connect(mapStateToProps)(Myclass) )。 有些人觉得这种写法更加优雅,
// 而另一些则因为这种写法隐藏了实际发生的事情会当人无法理解 decorator 是如何工作的。
// 知道了这些并了解到 decorator 现在仍在实验阶段的话, 你就可以决定你偏好使用哪一种 Connect 的形式,
// 也不会因为在其他文章, 教学和新手包中看到两种语法而感到惊讶了

// 去 ./12_final-words.js 可以看到我们最后的一些建议
