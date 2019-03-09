import React, { Component } from 'react'

import { Route, Switch, Link } from 'react-router-dom'

import { renderRoutes } from 'react-router-config'
import routes from '../routes'

export default class Layout extends Component {

  render () {

    return (

      <div>

        <ul className="nav">
          <Link to="/">Index</Link> 
          <Link to="/home">Home</Link> 
          <Link to="/about">About</Link>
          <Link to="/weather">WeatherPage</Link>
          <Link to="/needAuth">needAuth</Link>
          <Link to="/login">login</Link>
        </ul>

        <hr/>

        <Switch>

          { renderRoutes(routes) }

          {/* <Route path='/home' render={props => <Home {...props} />} />
          <Route path='/about' render={props => <About {...props} />} />
          <Route exact path='/' render={props => <Index {...props} />} />
          <Route path='*' render={props => <NotFound {...props} />} /> */}

        </Switch>

      </div>
    )
  }
}