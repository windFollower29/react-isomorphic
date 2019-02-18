import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

// import Auth from '../components/Auth'

// @Auth
export default class Root extends Component {

  render () {
    return (
      <div>
        <h1>我是Root</h1>
        <a href="/e">跳转ejs</a>

        <hr/>

        {renderRoutes(this.props.route.routes)}
      </div>

    )
  }
}