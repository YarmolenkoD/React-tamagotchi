import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import Tamagotchi from './Tamagotchi'

const mapStateToProps = (state, ownProps) => {
  return {
    pokemon: state.main.pokemon,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // bind actions with dispatch
    ...bindActionCreators({changeStateProp}, dispatch),
    // example that we can add our custom funcs to props
    changeStateProp: function (prop, value, reducer) {
      // call of action in custom func
      changeStateProp(prop, value, reducer)(dispatch)
      return null
    }
  }
}

const TamagotchiContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tamagotchi)

export default TamagotchiContainer
