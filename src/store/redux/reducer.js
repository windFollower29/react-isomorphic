import { combineReducers } from 'redux'

import * as ActionTypes from './actionTypes'

// const getInitState = () => ({
//   count: 0
// })

function reducer (initState, action) {

  switch (action.type) {
    
    case ActionTypes.COUNT_DECREASE:
      return { ...initState, count: --initState.count }
    
    case ActionTypes.COUNT_INCREASE:
      return { ...initState, count: ++initState.count }
    
    default:
      return initState
  }

}

// const reducer = combineReducers({
//   counter
// })

export default reducer