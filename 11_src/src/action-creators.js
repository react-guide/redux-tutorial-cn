// 教程 12 - Provider-and-connect.js

// 我们使用Bluebird (https://github.com/petkaantonov/bluebird) 作为promise库, 但其实你可以用任何你喜欢的。
import Promise from 'bluebird'

// 我们的action creator在一段延迟后获取当前时间, 用于演示使用promise中间件。

// promise中间件工作时会等待2种情况:
// 1) 一个如下格式的action:
//    {
//      types: [REQUEST, SUCCESS, FAILURE], // action的 types 需要按该顺序给出
//      promise: function() {
//        // 返回一个 promise
//      }
//    }
// 2) 其他任何可以传递给下一个中间件, 或者Redux(事实上, 在这个promise中间件的实现中, "其他任何"传递到下一个中间件或Redux时, 必须不包含promise属性)

// 当该promise中间件接收到这个action, 它会创建2个action:
// 一个action给action creator的REQUEST, 后一个action给action creator的SUCCESS 或 FAILURE

// 再者, 这个promise中间件的代码并不复杂, 值得去看一看 (./promise-middleware.js)

// 下面的action使用"delay"作为一个参数传递, 用来延迟该action creator。
// 尝试改变延迟的值, 验证它是否正确影响了我们UI。
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
