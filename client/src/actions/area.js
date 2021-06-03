import {
  GET_AREA,
  ASSIGN_RESCUE_TEAM,
  ADD_SEARCH_PATTERN,
  ASSIGN_PATTERN_TYPE,
  SET_LOADER,
  REMOVE_LOADER,
} from './types';
import axios from 'axios';
import { showDialog } from './dialog';
import store from '../store';

export const getSearchArea = () => async (dispatch) => {
  const buffer_distance = store.getState().generalReducer.buffer_distance;
  const subarea_side = store.getState().generalReducer.subarea_side;
  //get current set aircraft id
  const current_aircraft_id = store.getState().aircraftReducer._id;
  try {
    await dispatch({ type: SET_LOADER, payload: true });

    const response = await axios.get(
      `api/searchArea/${current_aircraft_id}?side=${buffer_distance}&gridSide=${subarea_side}`
    );

    await dispatch({ type: REMOVE_LOADER, payload: false });
    const area_data = response.data;

    dispatch({
      type: GET_AREA,
      payload: area_data,
    });
  } catch (err) {
    await dispatch({ type: REMOVE_LOADER, payload: false });
    console.log(err.message);

    dispatch(
      showDialog({
        title: 'Oops! Error from server while fetching search area.',
        description: err.message,
        buttontext: 'Ok! Let me check',
        visible: true,
      })
    );
  }
};

export const assignRescueTeam = (tile_index, rescue_team) => (dispatch) => {
  try {
    dispatch({
      type: ASSIGN_RESCUE_TEAM,
      payload: { tile_index: tile_index, rescue_team: rescue_team },
    });
  } catch (err) {
    console.log(err.message);
    dispatch(
      showDialog({
        title:
          'Oops! Error from server while emergency vehicle assignment request',
        description: err.message,
        buttontext: 'Ok! Let me check',
        visible: true,
      })
    );
  }
};
export const assignPatternType = (tile_index, pattern_type) => (dispatch) => {
  try {
    dispatch({
      type: ASSIGN_PATTERN_TYPE,
      payload: { tile_index: tile_index, pattern_type: pattern_type },
    });
  } catch (err) {
    console.log(err.message);
    dispatch(
      showDialog({
        title: 'Oops! Error from server while assignment of pattern ',
        description: err.message,
        buttontext: 'Ok! Let me check',
        visible: true,
      })
    );
  }
};

export const addSearchPattern = (data) => (dispatch) => {
  try {
    dispatch({
      type: ADD_SEARCH_PATTERN,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch(
      showDialog({
        title:
          'Oops! Error from server while adding search patterns in search area.',
        description: err.message,
        buttontext: 'Ok! Let me check',
        visible: true,
      })
    );
  }
};
