import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeStateProp } from '../../actions'
import Start from './Start'

const mapStateToProps = (state, ownProps) => {
  return {
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

const StartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Start)

export default StartContainer
