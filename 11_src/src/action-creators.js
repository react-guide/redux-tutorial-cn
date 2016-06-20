// 教程 12 - Provider-and-connect.js

// 我们使用 Bluebird(https://github.com/petkaantonov/bluebird) 作为 promise 库，但其实你可以用任何你喜欢的。
import Promise from 'bluebird'

// 我们的 action creator 在一段延迟后获取当前时间，用于演示使用 promise 中间件。

// promise 中间件工作时会等待2种情况:
// 1) 一个如下格式的 action:
//    {
//      types: [REQUEST, SUCCESS, FAILURE], // action 的 types 需要按该顺序给出
//      promise: function() {
//        // 返回一个 promise
//      }
//    }
// 2) 其他任何可以传递给下一个中间件，或者 Redux (事实上，在这个 promise 中间件的实现中，"其他任何"传递到下一个中间件或Redux时，必须不包含 promise 属性)

// 当该 promise 中间件接收到这个 action，它会创建2个 action:
// 一个 action 给 action creator 的 REQUEST，后一个 action 给 action creator 的 SUCCESS 或 FAILURE

// 再者，这个 promise 中间件的代码并不复杂，值得去看一看 (./promise-middleware.js)

// 下面的 action 使用 "delay" 作为一个参数传递，用来延迟该 action creator。
// 尝试改变延迟的值，验证它是否正确影响了我们UI。
export function getTime(delay) {
  return {
    types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        // 通过 setTimeout 来模拟一个异步服务器请求
        setTimeout(() => {
          const d = new Date()
          const ms = ('000' + d.getMilliseconds()).slice(-3)
          resolve({
            time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
          })
        }, delay)
      })
    }
  }
}
