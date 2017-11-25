import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

// components
import Spinner from '../components/Spinner/Spinner'
import Start from '../components/Start/StartContainer'
import Tamagotchi from '../components/Tamagotchi/TamagotchiContainer'
// router
import { Route, Switch } from 'react-router'
import { HashRouter, Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Route render={({staticContext}) => {
      if (staticContext) { staticContext.status = 404 }
      return (<div>
        <h1>Sorry, can’t find that.</h1>
      </div>)
    }} />
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSpinner: true
    }
  }
  componentDidMount () {
    this.setState({
      isSpinner: true
    })
    setTimeout(() => {
      this.setState({
        isSpinner: false
      })
    }, 5000)
  }
  render () {
    return (
      <HashRouter>
        <div className={'App ' + this.props.type}>
          <div style={{display: !this.state.isSpinner ? 'block' : 'none'}}>
            <Switch>
              <Route exact path='/'
                component={Start} />
              <Route path='/tamagotchi'
                component={Tamagotchi} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Spinner display={this.state.isSpinner} />
        </div>
      </HashRouter>
    )
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  changeStateProp: PropTypes.func.isRequired,
  myCustomPropsFunc: PropTypes.func
}

App.defaultProps = {
  value: 0,
  changeStateProp: () => {},
  myCustomPropsFunc: () => {}
}

export default App
