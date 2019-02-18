import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import queryString from 'query-string'

import { 
  fetchCityListAndQuality,
  setRefetchFlag
} from '../../store/redux/actions'

@withRouter
@connect(
  state => ({
    refetchFlag: state.weather.refetchFlag,
    quality: state.weather.quality
  }),
  dispatch => ({
    fetchCityListAndQuality: () => dispatch(fetchCityListAndQuality()),
    setRefetchFlag : () => dispatch(setRefetchFlag(true))
  })
)
export default class Quality extends Component {

  render () {

    const { quality } = this.props

    return (

      <div>
        <div>quality</div>

        {
          quality &&
          ['pm25', 'qlty'].map(item => (
            <div key={item}>
              <label>{item}：</label>
              <span>{quality[item]}</span>
            </div>
          ))
        }
      </div>
    )
  }

  componentDidMount () {

    const {
      location: { search },
      refetchFlag,
      fetchCityListAndQuality,
      setRefetchFlag
    } = this.props

    const { location: city } = queryString.parse(search)

    refetchFlag 
      ? fetchCityListAndQuality(city || undefined)
      : setRefetchFlag()
  }
}