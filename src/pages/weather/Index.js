import React, { Component } from 'react'

import Weather from './Weather'

export default class Index extends Component {

  render () {

    console.log(this.props)

    return (
      <React.Fragment>

        <div>weather页面</div>

        <Weather route={this.props.route} />

      </React.Fragment>
    )
  }
}