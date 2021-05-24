import {
  SET_BUFFER_RADIUS,
  SET_BUFFER_DISTANCE,
  SET_ADDITIONAL_POINTS_CHECKBOXES,
} from '../actions/types';

const initialState = {
  buffer_radius: 10,
  buffer_distance: 10,
  additional_points_checkboxes: {
    roads: false,
    hospitals: false,
    others: false,
  },
};

function generalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUFFER_RADIUS:
      return { ...state, buffer_radius: action.payload };
    case SET_BUFFER_DISTANCE:
      return { ...state, buffer_distance: action.payload };
    case SET_ADDITIONAL_POINTS_CHECKBOXES:
      return { ...state, additional_points_checkboxes: action.payload };
    default:
      return state;
  }
}

export default generalReducer;
