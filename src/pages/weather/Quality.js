import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import queryString from 'query-string'

import { 
  fetchCityListAndQuality
} from '../../store/redux/actions'

@withRouter
@connect(
  state => ({
    quality: state.weather.quality
  }),
  dispatch => ({
    fetchCityListAndQuality: () => dispatch(fetchCityListAndQuality())
  })
)
export default class Quality extends Component {
  constructor (props) {
    super(props)
    console.log('constructor')
  }

  render () {

    console.log(`quality---`)

    const { quality } = this.props

    return (

      <div>
        <div>quality</div>

        {
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

    const { location: { search }, fetchCityListAndQuality } = this.props

    const { location: city } = queryString.parse(search)

    fetchCityListAndQuality(city || undefined)
  }
}