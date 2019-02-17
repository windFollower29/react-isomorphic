import React from 'react'
import ReactDom from 'react-dom'

import { BrowserRouter , Route, Switch, Link } from 'react-router-dom'
import{ renderRoutes } from 'react-router-config'

import { loadableReady } from '@loadable/component'

// import { Provider } from 'mobx-react'
import { Provider } from 'react-redux'

import Layout from '../common/Layout'

import createStore from '../store/redux/index'

import '../styles/common.scss'

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__ || undefined

console.log(preloadedState)

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__

// Create Redux store with initial state
// const store = createStore(preloadedState)
const store = createStore(preloadedState)

const App = () => {
  // console.log(`------${JSON.stringify(store)}---------`)
  return (
    <Provider store={store}>

      <BrowserRouter>

        <Layout />
        
      </BrowserRouter>

    </Provider>
  )
}

// hydrate复用服务端渲染api
loadableReady().then(() => {
console.log('------')
  ReactDom.hydrate(<App />, document.getElementById('app'))
  // ReactDom.render(<App />, document.getElementById('app'))
})

// console.log(`--${JSON.stringify(window)}---`)