import update from 'immutability-helper'
import { CHANGE_STATE_PROP } from '../actions'
import { DECREMENT, INCREMENT } from '../actions/main'

const REDUCER = 'MAIN'
const defaultState = {
  type: '',
  spinner: false,
  pokemon: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REDUCER + CHANGE_STATE_PROP:
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })
    default:
      return state
  }
}
