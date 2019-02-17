import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { renderRoutes } from 'react-router-config'

import queryString from 'query-string'

import Temperature from './Temperature'
import Quality from './Quality'

@withRouter
export default class Detail extends Component {

  state = {
    // showQuality: false
  }

  render () {

    const { match, location, history } = this.props
    const { params: { city }, url, path } = match
console.log('detail')
    const showQuality = url.includes('quality')

    return (


      <React.Fragment>

        <h2>城市weather详情</h2>

        <ul>
          {/* <li><a href="/weather/temperature">温度</a></li>
          <li><a href="/weather/quality">空气质量</a></li> */}
          <Link to={`/weather/quality`}>空气</Link>

          <button onClick={this.goto.bind(this, 'temperature')}>温度</button>
          <button onClick={this.goto.bind(this, 'quality')}>空气质量</button>
        </ul>

        <div>

          {/* {
            showQuality ? <Quality /> : <Temperature />
          } */}

        {renderRoutes(this.props.route.routes)}

        </div>

      </React.Fragment>

    )

  }

  goto = (str) => {
    const { location: { search } } = this.props
    const { location: city } = queryString.parse(search)

    // const route = `/weather/weather/${str}${!!city ? '?location=' + city : ''}`

    this.props.history.push({
      pathname: `/weather/${str}`,
      // search: `?location=${city || ''}`,
    })
  }

  componentDidMount() {

    
  }

}