import { GET_ROADS, SHOW_DIALOG } from './types';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import store from '../store';

export const getRoads =
  (radius = '5000') =>
  async (dispatch) => {
    try {
      // by default it will searh for 10000 meter radius for roads
      const missing_point = `${store.getState().aircraftReducer.latitude},${
        store.getState().aircraftReducer.longitude
      }`;

      const roads_query = `http://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(way["highway"](around:${radius},${missing_point});relation["highway"](around:${radius},${missing_point}););out body;>;out skel qt;`;

      console.log(roads_query);
      const response = await axios.get(roads_query);
      let data = response.data;

      data = osmtogeojson(data);
      console.log(data);
      dispatch({
        type: GET_ROADS,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SHOW_DIALOG,
        payload: {
          buttontext: 'OK',
          title: 'roads data fetch failed.',
          description: 'oops! Error',
          visible: true,
        },
      });
    }
  };
