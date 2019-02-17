import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

export default class Root extends Component {

  render () {
    return (
      <div>
        <h1>我是Root</h1>

        {renderRoutes(this.props.route.routes)}
      </div>

    )
  }
}