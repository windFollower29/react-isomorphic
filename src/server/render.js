import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, Switch, Link } from 'react-router-dom'

// import { Provider } from 'mobx-react'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import { Helmet } from 'react-helmet'

import routes from '../routes'
import createStore from '../store/redux/index'
import Layout from '../common/Layout'

import { ChunkExtractor } from '@loadable/server'


export default async function render (ctx, context = {}, initStore = {}) {
  const store = createStore({ count: 29 })

  // store.subscribe(() => {
  //   let state = store.getState()
  //   // console.log('sotre: ', state)
  // })

  // 各组件获取初始化数据 TODO: 加上鉴权
  const [url, query] = ctx.req.url.split('?')

  console.log('url', url)
  const branch = matchRoutes(routes, url)

  const promises = branch.map(({ route, match, location, history }) => {

    return route.asyncData
      ? route.asyncData(store, query)
      : Promise.resolve(null)
  })

  let res = await Promise.all(promises)

  // 模板
  const App = () => {

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

}