import React, { Component } from 'react'
import { Helmet } from "react-helmet";

import Counter from '@components/Counter'

export default class Index extends Component {

  render () {
    // 'window' in global && console.log(`--${JSON.stringify(window)}---`)

    return (
      <React.Fragment>

        <Helmet>
          <meta charSet="utf-8" description="Index" />
          <title>Index</title>
        </Helmet>

        <div>
          Index

          <div>
            <Counter />
          </div>
        </div>

      </React.Fragment>
    )
  }
}