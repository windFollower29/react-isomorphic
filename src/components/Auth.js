import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

export default (Child) => {

  return function Auth (props) {

    const { match: { url } } = props

    if (url.toLowerCase().includes('needauth')) {
      return <Redirect to="/login" />
    }
    
    return (
      <Child {...props} />
    )
    
  }

  return class Auth extends Component {

    render () {
      const { match: { url } } = this.props

      if (url.toLowerCase().includes('needauth')) {
        return <Redirect to="/login" />
      }
      
      return (
        <Child {...this.props} />
      )
    }
  }
}