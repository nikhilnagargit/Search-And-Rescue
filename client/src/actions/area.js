import {
  GET_AREA,
  RESET_AREA,
  RESET_HELP_POINTS,
  RESET_ROADS,
  ASSIGN_RESCUE_TEAM,
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
    const response = await axios.get(
      `api/searchArea/${current_aircraft_id}?side=${buffer_distance}&gridSide=${subarea_side}`
    );
    const area_data = response.data;

    dispatch({
      type: GET_AREA,
      payload: area_data,
    });
  } catch (err) {
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

export const assignRescueTeam =
  (tile_index, rescue_team) => async (dispatch) => {
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
