import React, { Component } from 'react'

export default class Spinner extends Component {
  render () {
    return (
      <div className={this.props.display ? 'spinner-container' : 'hidden'}>
        <div className='spinner' />
      </div>
    )
  }
}
