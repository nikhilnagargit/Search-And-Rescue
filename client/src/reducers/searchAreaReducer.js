import {
  ASSIGN_RESCUE_TEAM,
  GET_AREA,
  RESET_AREA,
  ADD_SEARCH_PATTERN,
} from '../actions/types';

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
      console.log(
        'from reducer',
        action.payload.tile_index,
        action.payload.rescue_team
      );
      let newstate = { ...state };
      newstate.filteredGrid.features[action.payload.tile_index].rescue_team =
        action.payload.rescue_team;
      return newstate;
    case ADD_SEARCH_PATTERN:
      return action.payload;
    default:
      return state;
  }
}

export default searchAreaReducer;
