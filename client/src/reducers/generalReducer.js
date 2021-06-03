import {
  SET_BUFFER_RADIUS,
  SET_BUFFER_DISTANCE,
  SET_ADDITIONAL_POINTS_CHECKBOXES,
  SET_SUBAREA_SIDE,
  SET_LOADER,
  REMOVE_LOADER,
} from '../actions/types';

const initialState = {
  loader: false,
  buffer_radius: 10,
  buffer_distance: 10,
  subarea_side: 7,
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
    case SET_SUBAREA_SIDE:
      return { ...state, subarea_side: action.payload };
    case SET_ADDITIONAL_POINTS_CHECKBOXES:
      return { ...state, additional_points_checkboxes: action.payload };
    case SET_LOADER:
      return { ...state, loader: action.payload };
    case REMOVE_LOADER:
      return { ...state, loader: action.payload };
    default:
      return state;
  }
}

export default generalReducer;
