import { GET_HELP_POINTS, SHOW_DIALOG } from './types';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';

export const getHelpPoints = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'http://overpass-api.de/api/interpreter?data=[out:json][timeout:100];(node[amenity=hospital](around:5000,25.2138,75.8648););out body;'
    );
    let data = response.data;

    data = osmtogeojson(data);

    dispatch({
      type: GET_HELP_POINTS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_DIALOG,
      payload: {
        buttontext: 'OK',
        title: 'help points data fetch failed.',
        description: 'oops! Error',
        visible: true,
      },
    });
  }
};

export const hideDialog = () => (dispatch) => {};
