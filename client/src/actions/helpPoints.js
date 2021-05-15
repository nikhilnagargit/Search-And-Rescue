import { GET_HELP_POINTS, SHOW_DIALOG } from './types';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import store from '../store';

export const getHelpPoints =
  (radius = '20000') =>
  async (dispatch) => {
    try {
      // by default it will searh for 10000 meter radius for help points
      const missing_point = `${store.getState().aircraftReducer.latitude},${
        store.getState().aircraftReducer.longitude
      }`;

      const hospital_query = `http://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(node[amenity=hospital](around:${radius},${missing_point}););out body;`;
      const roads_query = `http://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(node["highway"](around:${radius},${missing_point});way["highway"](around:${radius},${missing_point});relation["highway"](around:${radius},${missing_point}););out body;>;out skel qt;`;

      console.log(roads_query);
      const response = await axios.get(hospital_query);
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
