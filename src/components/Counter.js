import React, { Component } from 'react'

// import { observer } from 'mobx-react'
import { connect } from 'react-redux'

import { COUNT_DECREASE, COUNT_INCREASE } from '../store/redux/actionTypes'

import {
  countDecrease
} from '../store/redux/actions'

@connect(
  state => ({
    count: state.count
  }),
  dispatch => ({
    decrease: () => dispatch(countDecrease()),
    increase: () => dispatch({ type: COUNT_INCREASE })
  })
)
export default class Counter extends Component {

  render () {
    
    return (

      <div>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
        current: {this.props.count}
      </div>

    )
  }

  decrease = () => {
    this.props.decrease()
  }
  
  increase = () => {
    this.props.increase()
  }
}