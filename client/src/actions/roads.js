import { GET_ROADS, SHOW_DIALOG, RESET_ROADS } from './types';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import store from '../store';

export const getRoads =
  (buffer_radius = 10) =>
  async (dispatch) => {
    try {
      // first reset the data
      await dispatch({
        type: RESET_ROADS,
        payload: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      // by default it will searh for 10000 meter radius for roads
      const crash_point =
        store.getState().searchAreaReducer.geojson.features[0].properties
          .crashPoint;

      const crash_point_string = `${crash_point[0]},${crash_point[1]}`;
      // convert radius in meters
      const radius = buffer_radius * 1000;

      const roads_query = `http://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(way["highway"](around:${radius},${crash_point_string});relation["highway"](around:${radius},${crash_point_string}););out body;>;out skel qt;`;

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

export const resetRoads = () => (dispatch) => {
  dispatch({
    type: RESET_ROADS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });
};
