import React, { Component } from 'react'

import Auth from '../components/Auth'

@Auth
export default class NeedAuth extends Component {

  render () {

    return (
      <React.Fragment>

        你看不到这个页面的

      </React.Fragment>
    )
  }
}