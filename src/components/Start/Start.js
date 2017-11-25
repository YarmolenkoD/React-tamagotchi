import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Start extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'Pikachu',
      name: '',
      badValidate: false,
      isSubmited: false
    }
    this.changeType = this.changeType.bind(this)
    this.changeName = this.changeName.bind(this)
    this.submit = this.submit.bind(this)
    this.toTamagotchi = this.toTamagotchi.bind(this)
    this.back = this.back.bind(this)
  }
  componentWillMount () {
    let data = {
      name: '',
      type: ''
    }
    this.props.changeStateProp('spinner', true, 'main')
    this.props.changeStateProp('pokemon', data, 'main')
    setTimeout(() => {
      this.props.changeStateProp('spinner', false, 'main')
    }, 3000)
  }
  submit () {
    if (this.state.name.length < 3) {
      this.setState({
        badValidate: true
      })
    } else {
      this.setState({
        isSubmited: true
      }, () => {
        this.toTamagotchi()
      })
    }
  }
  toTamagotchi () {
    let pokemon = {
      name: this.state.name,
      type: this.state.type
    }
    this.props.changeStateProp('pokemon', pokemon, 'main')
    this.props.changeStateProp('type', this.state.type, 'main')
    console.log(1111111)
  }
  changeType (e) {
    this.setState({
      type: e.target.value
    })
  }
  changeName (e) {
    if (this.state.badValidate) {
      this.setState({
        name: e.target.value,
        badValidate: false
      })
    } else {
      this.setState({
        name: e.target.value
      })
    }
  }
  back () {
    this.setState({
      isSubmited: false
    })
  }
  render () {
    return (
      <div className='start-form-container'>
        <div className='form-container'>
          <div className={!this.state.isSubmited ? 'mui-panel' : 'hidden'}>
            <form className='mui-form' onSubmit={this.submit}>
              <legend>Select type and name for your tamagotchi</legend>
              <select onChange={this.changeType}>
                <option>Pikachu</option>
                <option>Bulbasaur</option>
                <option>Charmander</option>
              </select>
              <div className='mui-textfield mui-textfield--float-label'>
                <input type='text' onChange={this.changeName} />
                <label>Name</label>
              </div>
              <div
                className={this.state.badValidate ? 'name-validate' : 'hidden'}>
                min 3 characters
              </div>
              <button type='submit' className='mui-btn mui-btn--primary'>Submit</button>
            </form>
            <div className='pokemon'>
              <img src={require(`../../../assets/images/${this.state.type}.png`)} />
            </div>
          </div>
          <div className={this.state.isSubmited ? 'mui-panel submited' : 'hidden'}>
            <button
              className='link-tamagotchi mui-btn mui-btn--primary'
              onClick={this.toTamagotchi}>
              <Link to='/tamagotchi'>
                Go to tamagotchi
              </Link>
            </button>
            <button className='back mui-btn mui-btn--primary' onClick={this.back}>back</button>
          </div>
        </div>
      </div>
    )
  }
}
