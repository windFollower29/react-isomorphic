import React, { Component } from 'react'
import { connect } from 'react-redux';

@connect(
  state => ({
    count: state.count
  })
)
export default class About extends Component {

  render () {
    return (
      <div>
        About
        <div>
          来自Index的数据：{this.props.count}
        </div>
      </div>
    )
  }
}
