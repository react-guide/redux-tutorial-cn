// 章节 12 - Provider-and-connect.js

// 我们使用 Bluebird(https://github.com/petkaantonov/bluebird) 作为 promise 库，但其实你可以用任何你喜欢的。
import Promise from 'bluebird'

// 我们的 action 创建函数在一段延迟后获取当前时间，用于演示 promise 中间件的用法。

// promise 中间件接收2种情况的 action:
// 1) 一个如下格式的 action:
//    {
//      types: [REQUEST, SUCCESS, FAILURE], // action 的 types 需要按该顺序给出
//      promise: function() {
//        // 返回一个 promise
//      }
//    }
// 2) 其他任何可以传递给下一个中间件或 Redux 的 action， (准确的说，在这个 promise 中间件的实现中，这里的"其他任何 action" 传递到下一个中间件或 Redux 时，必须不包含 promise 属性)

// 当该 promise 中间件接收到 action 之后，它会生成2个 action:
// 一个 action 用于 action 创建函数的 REQUEST 情况，
// 后一个 action 用于 action 创建函数的 SUCCESS 或 FAILURE 情况

// 再者，这个 promise 中间件的代码并不复杂，值得去看一看 (./promise-middleware.js)

// 下面的 action 使用 "delay" 作为一个参数传递，用来延迟该 action 创建函数。
// 尝试改变延迟的值，验证它是否正确影响了我们 UI。
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
