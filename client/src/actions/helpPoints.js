import {
  GET_HELP_POINTS,
  REMOVE_LOADER,
  RESET_HELP_POINTS,
  SHOW_DIALOG,
  SET_LOADER,
} from './types';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import store from '../store';

export const getHelpPoints = () => async (dispatch) => {
  try {
    // convert km to meters
    const radius = store.getState().generalReducer.buffer_radius * 1000;

    // by default it will searh for 10000 meter radius for help points
    const crash_point =
      store.getState().searchAreaReducer.geojson.features[0].center;

    const crash_point_string = `${crash_point[0]},${crash_point[1]}`;

    const hospital_query = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(node[amenity=hospital](around:${radius},${crash_point_string}););out body;`;
    const roads_query = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(node["highway"](around:${radius},${crash_point_string});way["highway"](around:${radius},${crash_point_string});relation["highway"](around:${radius},${crash_point_string}););out body;>;out skel qt;`;

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

export const resetHelpPoints = () => (dispatch) => {
  dispatch({
    type: RESET_HELP_POINTS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });
};
