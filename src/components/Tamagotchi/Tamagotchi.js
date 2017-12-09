import React, { Component } from 'react'
import dance from '../../../assets/music/music.mp3'
import sleep from '../../../assets/music/sleep.mp3'
import bg from '../../../assets/music/bg.mp3'

// components
import Spinner from '../Spinner/Spinner'

export default class Tamagotchi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.pokemon.name,
      isSpinner: false,
      isSleep: false,
      isDance: false,
      isWalk: false,
      check: false,
      music: bg,
      pokemon: {
        img: this.props.pokemon.type,
        imgType: 'png',
        health: 10,
        energy: 7,
        sleep: 5,
        hunger: 2,
        water: 2,
        position: {
          top: 250,
          left: 300
        }
      }
    }
    this.generateColor = this.generateColor.bind(this)
    this.eat = this.eat.bind(this)
    this.walk = this.walk.bind(this)
    this.drink = this.drink.bind(this)
    this.sleep = this.sleep.bind(this)
    this.dance = this.dance.bind(this)
  }

  componentWillMount () {
    this.setState({
      isSpinner: true
    })
    setTimeout(() => {
      this.setState({
        isSpinner: false
      })
    }, 3000)
  }

  componentDidMount () {
    let self = this
    document.onkeyup = function (e) {
      if (e.keyCode === 38) {
        if (self.state.pokemon.position.top > 180) {
          let newState = self.state.pokemon
          newState.position.top = self.state.pokemon.position.top - 20
          self.setState({
            state: newState
          })
        }
      } else if (e.keyCode === 40) {
        if (self.state.pokemon.position.top < 500) {
          let newState = self.state.pokemon
          newState.position.top = self.state.pokemon.position.top + 20
          self.setState({
            state: newState
          })
        }
      } else if (e.keyCode === 37) {
        if (self.state.pokemon.position.left > 320) {
          let newState = self.state.pokemon
          newState.position.left = self.state.pokemon.position.left - 20
          self.setState({
            state: newState
          })
        }
      } else if (e.keyCode === 39) {
        if (self.state.pokemon.position.left < 720) {
          let newState = self.state.pokemon
          newState.position.left = self.state.pokemon.position.left + 20
          self.setState({
            state: newState
          })
        }
      }
    }
  }

  dance () {
    if (!this.state.check) {
      let noDance = this.state.pokemon.img
      let newImg = this.state.pokemon
      newImg.img = this.props.pokemon.type + '-dance'
      if (this.props.pokemon.type === 'Pikachu') {
        newImg.imgType = 'jpg'
      } else {
        newImg.imgType = 'gif'
      }
      this.setState({
        pokemon: newImg,
        isDance: true,
        check: true,
        music: dance
      }, () => {
        setTimeout(() => {
          let newState = this.state.pokemon
          newState.img = noDance
          newState.imgType = 'png'
          this.setState({
            pokemon: newState,
            isDance: false,
            check: false,
            music: bg
          })
        }, 15000)
      })
    }
  }

  sleep () {
    if (!this.state.check) {
      let noSleep = this.state.pokemon.img
      let newImg = this.state.pokemon
      newImg.img = this.props.pokemon.type + '-sleep'
      this.setState({
        pokemon: newImg,
        isSleep: true,
        check: true,
        music: sleep
      }, () => {
        setTimeout(() => {
          let newState = this.state.pokemon
          if (newState.sleep < 10) {
            newState.sleep = ++newState.sleep
          }
          if (newState.energy < 10) {
            newState.energy = ++newState.energy
          }
          newState.img = noSleep
          this.setState({
            pokemon: newState,
            isSleep: false,
            check: false,
            music: bg
          })
        }, 10000)
      })
    }
  }

  eat () {
    if (!this.state.check) {
      let newState = this.state.pokemon
      if (newState.hunger < 10) {
        let noEat = this.state.pokemon.img
        newState.hunger = ++newState.hunger
        newState.img = this.props.pokemon.type + '-eat'
        if (this.props.pokemon.type === 'Charmander' || this.props.pokemon.type === 'Pikachu') {
          newState.imgType = 'gif'
        }
        this.setState({
          pokemon: newState,
          check: true
        }, () => {
          setTimeout(() => {
            let newState = this.state.pokemon
            newState.img = noEat
            newState.imgType = 'png'
            this.setState({
              pokemon: newState,
              check: false
            })
          }, 6000)
        })
      }
    }
  }

  drink () {
    let newState = this.state.pokemon
    if (newState.water < 10) {
      newState.water = ++newState.water
      this.setState({
        pokemon: newState
      })
    }
  }

  walk () {
    if (this.state.pokemon.energy > 0) {
      let newState = this.state.pokemon
      newState.img = this.props.pokemon.type + '-go'
      newState.imgType = 'gif'
      this.setState((prevState) => {
        return {
          pokemon: newState,
          isWalk: !prevState.isWalk
        }
      }, () => {
        setTimeout(() => {
          let newState = this.state.pokemon
          newState.energy = --newState.energy
          newState.img = this.props.pokemon.type
          newState.imgType = 'png'
          this.setState({
            pokemon: newState,
            check: false
          })
        }, 6000)
      })
    }
  }

  generateColor (val) {
    if (val > 8) {
      return 'green'
    } else if (val > 6) {
      return 'yellow'
    } else if (val > 3) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  render () {
    return (
      <div className='tamagotchi-container' id='tamagotchi'>
        <div className='pokemon-state-bar'>
          <div className='pokemon-state-item health'>
            <span className='label'>Health: </span>
            <span className='state'>
              <span
                style={{
                  width: this.state.pokemon.health + '0%',
                  backgroundColor: this.generateColor(this.state.pokemon.health)
                }}
              >
                {this.state.pokemon.health}
              </span>
            </span>
          </div>
          <div className='pokemon-state-item energy'>
            <span className='label'>Energy: </span>
            <span className='state'>
              <span
                style={{
                  width: this.state.pokemon.energy + '0%',
                  backgroundColor: this.generateColor(this.state.pokemon.energy)
                }}
              >
                {this.state.pokemon.energy}
              </span>
            </span>
          </div>
          <div className='pokemon-state-item sleep'>
            <span className='label'>Sleep: </span>
            <span className='state'>
              <span
                style={{
                  width: this.state.pokemon.sleep + '0%',
                  backgroundColor: this.generateColor(this.state.pokemon.sleep)
                }}
              >
                {this.state.pokemon.sleep}
              </span>
            </span>
          </div>
          <div className='pokemon-state-item hunger'>
            <span className='label'>Hunger: </span>
            <span className='state'>
              <span
                style={{
                  width: this.state.pokemon.hunger + '0%',
                  backgroundColor: this.generateColor(this.state.pokemon.hunger)
                }}
              >
                {this.state.pokemon.hunger}
              </span>
            </span>
          </div>
          <div className='pokemon-state-item water'>
            <span className='label'>Water: </span>
            <span className='state'>
              <span
                style={{
                  width: this.state.pokemon.water + '0%',
                  backgroundColor: this.generateColor(this.state.pokemon.water)
                }}
              >
                {this.state.pokemon.water}
              </span>
            </span>
          </div>
        </div>
        <div className='sidebar'>
          <div className='name-field'>
            <span>Name: </span>
            <span>{this.props.pokemon.name}</span>
          </div>
          <div className='type-field'>
            <span>Type: </span>
            <span>{this.props.pokemon.type}</span>
          </div>
          <ul>
            <li onClick={this.eat}>Eat</li>
            <li onClick={this.walk}>Walk</li>
            <li onClick={this.drink}>Drink</li>
            <li onClick={this.sleep}>Sleep</li>
            <li onClick={this.dance}>Dance</li>
          </ul>
          <div className='instruction-box'>
            <p>You can control the Pokémon with these keys</p>
            <img src={require(`../../../assets/images/arrowKeys.png`)} alt='arrow keys' />
          </div>
        </div>
        <div
          className='pokemon'
          id='pokemon'
          style={{top: this.state.pokemon.position.top + 'px', left: this.state.pokemon.position.left + 'px'}}
        >
          <img src={
            require(`../../../assets/images/${this.state.pokemon.img}.${this.state.pokemon.imgType}`)
          }
          />
        </div>
        <embed src={this.state.music} autostart='true' loop='true' width='2' height='0' />
        <Spinner display={this.state.isSpinner} />
      </div>
    )
  }
}
