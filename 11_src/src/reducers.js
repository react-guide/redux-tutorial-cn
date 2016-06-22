// 章节 12 - Provider-and-connect.js

// 这个文件包含我们应用仅有的一个 reducer。 它的表现对于你来说没什么新鲜的，除了将一个 action(GET_TIME) 的3个方面，写成3个专用的 action...
// 这样做允许我们做很漂亮的实时UI更新，就像这样:
// 1) 当收到 GET_TIME_REQUEST action，我们修改 state 来告诉 UI 的一部分需要被冻结(因为有一个挂起的操作)
// 2) 当收到 GET_TIME_SUCCESS (或 GET_TIME_FAILURE)之后，我们修改 state 为不冻结应用程序，然后添加收到的新数据。

var initialTimeState = {}

// 下面的 reducer 命名用"_"开头，用于从 state 中读取的时候，避免 state.time.time (出现两个 time )。
// 这只是个人偏好你可以不必这样做，它取决于你如何对各个 reducer 命名，和在 Redux 的 store 中暴露哪些属性。
export function _time(state = initialTimeState, action) {
  console.log('_time reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_TIME_REQUEST':
      return {
        ...state,
        frozen: true
      }
    case 'GET_TIME_SUCCESS':
      return {
        ...state,
        time: action.result.time,
        frozen: false
      }
    case 'GET_TIME_FAILURE':
        // 这里我们可以添加一个错误消息，打印到我们应用程序的某个地方
      return {
        ...state,
        frozen: false
      }
    default:
      return state
  }
}
