import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, Switch, Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

// import { Provider } from 'mobx-react'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import { Helmet } from 'react-helmet'

import Layout from '../common/Layout'

// import counterStore from '../store/index'
import createStore from '../store/redux/index'
// const createStore = require('../store/redux/index')
// const store = createStore()

import { ChunkExtractor } from '@loadable/server'

// import routes from '../routes'

export default async function render (routes, ctx, context = {}, initStore = {}) {
  const store = createStore({ count: 29 })

  store.subscribe(() => {
    let state = store.getState()
    // console.log('sotre: ', state)
  })

  // 各组件获取初始化数据 TODO: 加上鉴权
  // const branch = matchRoutes(routes, ctx.req.url)
  const [url, query] = ctx.req.url.split('?')
  const branch = matchRoutes(routes, url)

  const promises = branch.map(({ route, match, location, history }) => {
    // console.log(`--route: ${JSON.stringify(route)}------`)
    return route.asyncData
      ? route.asyncData(store, query)
      : Promise.resolve(null)
  })

  let res = await Promise.all(promises)
  console.log(`----${res}-----`)

  // 模板
  const App = () => {
  // debugger
    return (
      <Provider store={store}>

        <StaticRouter
          location={ctx.url}
          context={context}>
          
          <Layout />

        </StaticRouter>

      </Provider>
    )
  }


  const nodeStats = path.resolve(
    __dirname,
    '../build/loadable-stats.json',
  )
  
  const webStats = path.resolve(
    __dirname,
    '../public/loadable-stats.json',
  )

  // We create an extractor from the statsFile
  const nodeExtractor = new ChunkExtractor({ 
    entrypoints: ['server'],
    statsFile: nodeStats
  })
  // const { default: Root } = nodeExtractor.requireEntrypoint()

  const webExtractor = new ChunkExtractor({ 
    entrypoints: ['client'],
    statsFile: webStats
  })

  // Wrap your application using "collectChunks"
  const jsx = webExtractor.collectChunks(<App />)
  // const jsx = webExtractor.collectChunks(<Root />)
  // Render your application
  const html = renderToString(jsx)
  // const html = renderToString(<App />)
  // You can now collect your script tags
  const scriptTags = webExtractor.getScriptTags() // or extractor.getScriptElements();
  // You can also collect your "preload/prefetch" links
  const linkTags = webExtractor.getLinkTags() // or extractor.getLinkElements();
  // And you can even collect your style tags (if you use "mini-css-extract-plugin")
  const styleTags = webExtractor.getStyleTags() // or extractor.getStyleElements();

  const preloadedState = store.getState()

  const helmet = Helmet.renderStatic()

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <!-- ${linkTags} -->
        ${styleTags}
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.STORE = 'love';
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
        </script>
        ${scriptTags}
      </body>
    </html>
  `
  // return `
  //   <html>
  //     <head>
  //       ${helmet.title.toString()}
  //       ${helmet.meta.toString()}
  //     </head>
  //     <body>
  //       <div id="app">${content}</div>
  //       <script>
  //         window.STORE = 'love'
  //       </script>

  //       ${scriptTags}

  //       \<!-- TODO: 动态加载bundle \-->
  //       \<!-- <script src="/index.bundle.js"></script> \-->
  //     </body>
  //   </html>
  // `

}