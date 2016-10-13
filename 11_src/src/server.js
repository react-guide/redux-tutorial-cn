// 章节 12 - Provider-and-connect.js

// 终于到这里了! 准备好在 React 应用中使用 Redux 了吗?

// 你看到的这个应用程序例子已经精简的不能再精简了(对一个产品和设计来说的话)...
// 我们只关注了使用 react-redux 中2个主要的绑定 (https://github.com/gaearon/react-redux):
// 1) Provider 组件
// 2) connect 函数

// 但在开始下一步之前，先看看为了使应用程序能在浏览器中访问到，需要如何做一些基本设置。

// 该应用中我们没有用 Express (http://expressjs.com/)，因为在一个如此简单的 HTML 页面中，我们都不需要用到它。

// 这里我们使用 http 模块来创建一个 http 服务器
import http from 'http'
import React from 'react'

// 这里创建应用程序主服务器。 它会伺服所有的 URI 到同一个页面上,
// 所以这里并没有具体的路由逻辑，除了一个拒绝 favicon 请求的代码。
var server = http.createServer(function(req, res) {

  // 别管这个，它仅仅用来取消浏览器对 favicon 的自动请求,
  // 如果不这样做的话，该服务器会返回一个 HTML 页面。
  if (req.url.match('favicon.ico')) {
    return res.end()
  }

  // 当然还有，这里是我们应用程序返回给浏览器的 HTML。
  // 没什么特别的，除了将应用程序的 JS 包地址指定到
  // webpack dev server (located at http://localhost:5051)
  res.write(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <div id="app-wrapper"></div>
        <script type="text/javascript" src="http://localhost:5051/static/bundle.js"></script>
      </body>
    </html>`
  )

  res.end()
})

export default server

// 转到 ./index.jsx，那是我们应用程序初始化的地方。
// 为了让对 webpack 不熟悉的人更容易理解，其实 index.jsx 是被定义(在 12_src/webpack.config.js中) 为 JS 包的入口 (首个文件)
// 当 JS 包被载入到浏览器后，它将被自动运行。
