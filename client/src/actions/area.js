import { GET_AREA, RESET_AREA, RESET_HELP_POINTS, RESET_ROADS } from './types';
import axios from 'axios';
import { showDialog } from './dialog';
import store from '../store';

export const getSearchArea = () => async (dispatch) => {
  const buffer_distance = store.getState().generalReducer.buffer_distance;
  //get current set aircraft id
  const current_aircraft_id = store.getState().aircraftReducer._id;
  try {
    const response = await axios.get(
      `api/searchArea/${current_aircraft_id}?side=${buffer_distance}`
    );
    const area_data = response.data;
    console.log(area_data);
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
