import {
  SET_BUFFER_RADIUS,
  SET_BUFFER_DISTANCE,
  SET_ADDITIONAL_POINTS_CHECKBOXES,
} from './types';

export const setBufferRadius = (radius) => (dispatch) => {
  dispatch({
    type: SET_BUFFER_RADIUS,
    payload: radius,
  });
};

export const setBufferDistance = (radius) => (dispatch) => {
  dispatch({
    type: SET_BUFFER_DISTANCE,
    payload: radius,
  });
};

export const setAdditionalPointsCheckboxes = (payload) => (dispatch) => {
  dispatch({
    type: SET_ADDITIONAL_POINTS_CHECKBOXES,
    payload: payload,
  });
};
