import { GET_AREA } from './types';
import axios from 'axios';
import { showDialog } from './dialog';
import store from '../store';

export const getSearchArea = () => async (dispatch) => {
  //get current set aircraft id
  const current_aircraft_id = store.getState().aircraftReducer._id;

  try {
    const response = await axios.get(`api/searchArea/${current_aircraft_id}`);
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
      })
    );
  }
};
