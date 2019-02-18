import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import queryString from 'query-string'

import { 
  fetchCityListAndTemperature,
  setRefetchFlag
} from '../../store/redux/actions'

import Auth from '../../components/Auth'

@withRouter
// @Auth
@connect(
  state => ({
    refetchFlag: state.weather.refetchFlag,
    weather: state.weather.weather
  }),
  dispatch => ({
    fetchCityListAndTemperature: () => dispatch(fetchCityListAndTemperature()),
    setRefetchFlag : () => dispatch(setRefetchFlag(true))
  })
)
export default class Temperature extends Component {

  render () {

    const { weather } = this.props

    return (

      <div>
        <div>temperature</div>

        <ul>
          {
            // TODO: 是否都要做兜底处理
            weather && 
            weather.map((item, idx) => (
              <li key={idx}>{item.cond_txt_d}</li>
            ))
          }
        </ul>
      </div>
    )
  }

  componentDidMount () {
    const { 
      location: { search },
      refetchFlag,
      fetchCityListAndTemperature,
      setRefetchFlag
    } = this.props

    const { location: city } = queryString.parse(search)

    refetchFlag 
      ? fetchCityListAndTemperature(city || undefined)
      : setRefetchFlag()
    
  }
}