import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, Switch, Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

// import { Provider } from 'mobx-react'
import { Provider } from 'react-redux'

import { Helmet } from 'react-helmet'

import Layout from '../common/Layout'

// import counterStore from '../store/index'
import createStore from '../store/redux/index'
// const createStore = require('../store/redux/index')
// const store = createStore()

import { ChunkExtractor } from '@loadable/server'


export default function render (routes, ctx, context = {}, initStore = {}) {
  const store = createStore({ count: 29 })
  // const store = createStore()
  // console.log(`---${ctx.url}----`)
  // console.log(`------${JSON.stringify(store)}---------`)

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

  // This is the stats file generated by webpack loadable plugin
  // console.log(`---${JSON.stringify(__dirname)}-------)`)
  // const statsFile = path.resolve(__dirname, 'loadable-stats.json')

  const nodeStats = path.resolve(
    __dirname,
    '../build/loadable-stats.json',
  )
  // console.log(nodeStats)
  
  const webStats = path.resolve(
    __dirname,
    '../public/loadable-stats.json',
  )
  // console.log(webStats)

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