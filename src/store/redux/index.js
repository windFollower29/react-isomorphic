
import { createStore, applyMiddleware } from 'redux'

import chunkMiddleware from 'redux-thunk'

import reducers from './reducers'


// 对应一个请求，服务端渲染每次都要返回一个新的store
export default function (store) {

  return createStore(
    reducers,
    store,
    applyMiddleware(chunkMiddleware)
  )
} 
