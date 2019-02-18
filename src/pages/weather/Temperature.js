import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import queryString from 'query-string'

import { 
  fetchCityListAndTemperature
} from '../../store/redux/actions'

@withRouter
@connect(
  state => ({
    weather: state.weather.weather
  }),
  dispatch => ({
    fetchCityListAndTemperature: () => dispatch(fetchCityListAndTemperature())
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
            weather && weather.map((item, idx) => (
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
      fetchCityListAndTemperature,
      weather
    } = this.props

    const { location: city } = queryString.parse(search)

    !weather &&
    fetchCityListAndTemperature(city || undefined)

  }
}