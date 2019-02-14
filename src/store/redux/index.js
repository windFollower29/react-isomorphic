
import { createStore, applyMiddleware } from 'redux'

import chunkMiddleware from 'redux-thunk'

import reducer from './reducer'

const defaultState = {
  count: 0
}

// 对应一个请求，服务端渲染每次都要返回一个新的store
export default function (initState) {

  return createStore(
    reducer,
    initState || defaultState
    // applyMiddleware(chunkMiddleware)
  )
} 
