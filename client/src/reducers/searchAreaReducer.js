import {
  ASSIGN_RESCUE_TEAM,
  ASSIGN_PATTERN_TYPE,
  GET_AREA,
  RESET_AREA,
  ADD_SEARCH_PATTERN,
} from '../actions/types';

const initialState = {
  id: 'abc',

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
  filteredGrid: {
    type: 'featurecollection',
    features: [],
  },
};

function searchAreaReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AREA:
      return action.payload;
    case RESET_AREA:
      return initialState;
    case ASSIGN_RESCUE_TEAM:
      let newstate1 = { ...state };
      newstate1.filteredGrid.features[action.payload.tile_index].rescue_team =
        action.payload.rescue_team;
      return newstate1;
    case ASSIGN_PATTERN_TYPE:
      let newstate2 = { ...state };
      newstate2.filteredGrid.features[action.payload.tile_index].pattern_type =
        action.payload.pattern_type;
      return newstate2;
    case ADD_SEARCH_PATTERN:
      return action.payload;
    default:
      return state;
  }
}

export default searchAreaReducer;
