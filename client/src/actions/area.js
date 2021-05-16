import { GET_AREA } from './types';
import axios from 'axios';
import { showDialog } from './dialog';
import store from '../store';

export const getSearchArea =
  (buffer_radius = 10) =>
  async (dispatch) => {
    //get current set aircraft id
    const current_aircraft_id = store.getState().aircraftReducer._id;
    console.log(buffer_radius);
    try {
      const response = await axios.get(`api/searchArea/${current_aircraft_id}`);
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
