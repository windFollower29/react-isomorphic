import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Detail from './Detail'

@withRouter
@connect(
  state => ({
    list: state.weather.cityList
  })
)
export default class Weather extends Component {

  render () {
    const { list } = this.props

    return (

      <div className="list">
        <ul>
          {
            list.map(({ location, cid }) => (
              <li key={cid}>
                <a href="javascript:">{location}</a>
              </li>
            ))
          }
        </ul>

        <Detail route={this.props.route} />
      </div>
    )

  }

  asyncDemo () {
    function delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(time)
        }, time);
      })
    }

    async function go () {
      let time = await delay(100)

      console.log(time)
    }

    go()
  }

  componentDidMount () {

    // this.asyncDemo()

    // Weather.asyncData()
  }

  static async asyncData (location = 'guangzhou') {

    const cityApi = `https://search.heweather.net/find?parameters&key=HE1902161002471051&location=${location}`

    let res = await fetch(cityApi)
      .then(res => res.json())
      .then(res => {
        const data = res.HeWeather6[0].basic
        console.log('cityApi', data)
        return data
      })
    
      return data
  }
}