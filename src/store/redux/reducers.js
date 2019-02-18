import { combineReducers } from 'redux'

import * as ActionTypes from './actionTypes'

const initState = {
  count: 0,

  weather: {
    refetchFlag: true,       // ssr获取数据后csr接管首次不重复请求数据的标识
    cityList: [],
    weather: null,
    quality: null
  }
}

function counter (count = initState.count, action) {

  switch (action.type) {
    
    case ActionTypes.COUNT_DECREASE:
      return count - 1
    
    case ActionTypes.COUNT_INCREASE:
      return count + 1
    
    default:
      return count
  }

}

function weather (weather = initState.weather, { type, payload }) {

  switch (type) {

    case ActionTypes.REFETCH:
      return { ...weather, refetchFlag: payload }

    case ActionTypes.UPDATE_CITY_LIST:
      let res = { ...weather, cityList: payload }
      return { ...weather, cityList: payload }

    case ActionTypes.UPDATE_WEATHER:
      return { ...weather, weather: payload }

    case ActionTypes.UPDATE_QUALITY:
      return { ...weather, quality: payload }

    default:
      return weather
    
  }
}

// export default reducers

const reducers = combineReducers({
  count: counter,
  weather
})

export default reducers