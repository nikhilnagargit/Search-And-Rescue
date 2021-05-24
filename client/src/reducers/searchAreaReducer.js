import { GET_AREA, RESET_AREA } from '../actions/types';

const initialState = {
  id: 'sdf',

  geojson: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          NA: 'Load the search area first',
        },
      },
    ],
  },
};
function searchAreaReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AREA:
      return action.payload;
    case RESET_AREA:
      return initialState;
    default:
      return state;
  }
}

export default searchAreaReducer;
