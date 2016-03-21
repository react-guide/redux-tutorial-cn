// 章节 11 - Provider-and-connect.js

// 这是讲述如何将 Redux 和 React 绑定在一起的最后一章节。

// 首先你需要在浏览器中运行此示例。

// 解释此示例的资源都在 ./11_src/src/ 目录下。

// 当你读到下面这段话的时间，请运行 11_src/src/server.js。

// 去构建我们的 React 应用程序，并使她在浏览器中运行，我们将会用到：
// - 用 node HTTP (https://nodejs.org/api/http.html)创建一个非常简单的服务器
// - 用 Webpack 去打包我们的应用，
// - 神奇的 Webpack Dev Server (http://webpack.github.io/docs/webpack-dev-server.html)
//   作为一个专门的 node 服务器，用它来监视 JS 文件
// - 超棒的 React Hot Loader http://gaearon.github.io/react-hot-loader/ (Dan Abramov
//   另一个很棒的项目 - 以防万一，他是 Redux 的作者) ，拥有非常棒的
//   DX (开发体验) ，当我们在编辑器中修改代码时，
//   在浏览器中可以热加载变化的组件。

// 对于正在准备使用 React 的开发者，一个重点是：
// 本应用是基于 React 0.14 构建的

// 我不想在这里详细地设置 Webpack Dev Server 和 React Hot Loader，
// 因为在 React Hot Loader 的文档中有足够好的说明了。
import webpackDevServer from './11_src/src/webpack-dev-server'
// 我们应用启动的主要服务器请求都是来自这个文件。
import server from './11_src/src/server'

// 如果 5050 端口号已经被占用了，那么就修改下面的端口号。
// 如果端口号是 X，那么我们可以用 X 作为服务器的端口号，用 X+1 作为 webpack-dev-server 的端口号
const port = 5050

// 开启我们的 webpack dev server...
webpackDevServer.listen(port)
// ... 还有我们的主要应用程序服务器。
server.listen(port)

console.log(`Server is listening on http://127.0.0.1:${port}`)

// 转到 11_src/src/server.js...

// 下一章节：12_final-words.js
