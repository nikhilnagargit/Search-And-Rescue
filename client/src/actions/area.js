import { GET_AREA } from './types';
import areadata from '../sample_data/area.json';

export const getSearchArea = () => (dispatch) => {
  dispatch({
    type: GET_AREA,
    payload: areadata,
  });
};
