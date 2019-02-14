import React, { Component } from 'react'

import { Route, Switch, Link } from 'react-router-dom'

// import Index from '../pages/Index'
// import Home from '../pages/Home'
// import About from '../pages/About'
// import NotFound from '../pages/NotFound'

import loadable from '@loadable/component'

const Index = loadable(() => import("../pages/Index"))
const Home = loadable(() => import("../pages/Home"))
const About = loadable(() => import("../pages/About"))
const NotFound = loadable(() => import("../pages/NotFound"))

import routes from '../routes'

export default class Layout extends Component {

  render () {
    
    return (

      <div>

        {/* {renderRoutes(routes)} */}

        <ul className="nav">
          <Link to="/">Index</Link> 
          <Link to="/home">Home</Link> 
          <Link to="/about">About</Link>
        </ul>

        <hr/>

        <Switch>

          {

            routes.map((route, idx) => {
              return (
                <Route 
                  key={route.key || route.path}
                  exact={route.exact}
                  path={route.path}
                  render={props => <route.component {...props} />}
                />
                
              )
            })

          }

          {/* <Route path='/home' render={props => <Home {...props} />} />
          <Route path='/about' render={props => <About {...props} />} />
          <Route exact path='/' render={props => <Index {...props} />} />
          <Route path='*' render={props => <NotFound {...props} />} /> */}

        </Switch>

      </div>
    )
  }
}