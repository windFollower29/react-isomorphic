

import {
  COUNT_DECREASE,
  COUNT_INCREASE,
  UPDATE_CITY_LIST,
  UPDATE_WEATHER,
  UPDATE_QUALITY
} from './actionTypes'

import ajax from '../../client/services/ajax'
const {
  fetchCityList,
  fetchTemperature,
  fetchQuality
} = ajax

export function countDecrease () {
  return { type: COUNT_DECREASE }
}

export function countIecrease () {
  return { type: COUNT_INCREASE }
}

// weather
export function updateCityList (list) {
  return { type: UPDATE_CITY_LIST, payload: list }
}

export function updateWeather (weather) {
  return { type: UPDATE_WEATHER, payload: weather }
}

export function updateQuality (quality) {
  return { type: UPDATE_QUALITY, payload: quality }
}

export function fetchCityListAndTemperature (city) {

  return (dispatch, getState) => {

    return fetchCityList(city)
      .then(data => {

        // dispatch(updateCityList(data))

        return fetchTemperature(data[0].location)
          .then(res => {
            // console.log(data, res)
            dispatch(updateWeather(res.daily_forecast))
            dispatch(updateCityList(data))
          })
      })
    
  }
}

export function fetchCityListAndQuality (city) {
  return (dispatch, getState) => {

    return fetchCityList(city)
      .then(data => {

        return fetchQuality(data[0].location)
          .then(res => {
            
            dispatch(updateCityList(data))
            dispatch(updateQuality(res))
          })
      })
    
  }
}


// export function getCityList (location = 'guangzhou') {

//   const cityApi = `https://search.heweather.net/find?parameters&key=HE1902161002471051&location=${location}`

//   return (dispatch, getState) => {

//     return fetch(cityApi)
//       .then(res => res.json())
//       .then(res => {
//         const data = res.HeWeather6[0].basic
//         // console.log('cityApi', data)
        
//         dispatch(updateCityList(data))
//       })
//   }

// }