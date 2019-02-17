import React, { Component } from 'react'
import { Helmet } from "react-helmet";

export default class Home extends Component {

  constructor (props) {
    super(props)

    this.rootDom = null
  }

  render () {
    console.log(`-----isServer: ${SERVER}--`)
    return (
      <React.Fragment>

        <Helmet>
          <meta charSet="utf-8" description="Home" />
          <title>Home</title>
        </Helmet>

        <div ref={el => this.rootDom = el}>
          Home
          <button onClick={() => alert('1')}>弹窗</button>
        </div>
        
      </React.Fragment>
    )
  }

  componentDidMount () {
    let p = document.createElement('p')
    p.textContent = 'componentDidMount触发生成'
    this.rootDom.append(p)
    // 'window' in global && console.log(`--${JSON.stringify(window)}---`)
  }
}