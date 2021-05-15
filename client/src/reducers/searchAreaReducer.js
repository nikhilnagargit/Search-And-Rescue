import { GET_AREA } from '../actions/types';

const initialState = {
  id: Math.random(),
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
    default:
      return state;
  }
}

export default searchAreaReducer;
