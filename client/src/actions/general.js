import {
  SET_BUFFER_RADIUS,
  SET_BUFFER_DISTANCE,
  SET_ADDITIONAL_POINTS_CHECKBOXES,
  SET_SUBAREA_SIDE,
  SET_LOADER,
  REMOVE_LOADER,
} from './types';

export const setBufferRadius = (radius) => (dispatch) => {
  dispatch({
    type: SET_BUFFER_RADIUS,
    payload: radius,
  });
};
export const setSubareaSide = (side) => (dispatch) => {
  dispatch({
    type: SET_SUBAREA_SIDE,
    payload: side,
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

export const setLoader = () => (dispatch) => {
  dispatch({
    type: SET_LOADER,
    payload: true,
  });
};
export const removeLoader = () => (dispatch) => {
  dispatch({
    type: REMOVE_LOADER,
    payload: false,
  });
};
