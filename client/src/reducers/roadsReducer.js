import { GET_ROADS, RESET_ROADS } from '../actions/types';

const initialState = {
  type: 'FeatureCollection',
  features: [],
};

function roadsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROADS:
      return action.payload;
    case RESET_ROADS:
      return action.payload;
    default:
      return state;
  }
}

export default roadsReducer;
