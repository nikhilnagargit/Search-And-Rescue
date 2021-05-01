import { SET_CURRENT_AIRCRAFT } from '../actions/types';

const initialState = {};

function aircraftReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_AIRCRAFT:
      return action.payload;
    default:
      return state;
  }
}

export default aircraftReducer;
