import { CREATE_REPORT, DELETE_REPORT, GET_REPORTS } from '../actions/types';

const initialState = [];

function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_REPORT:
      return action.payload;
    case DELETE_REPORT:
      return action.payload;
    case GET_REPORTS:
      // get all reports as array in payload
      return action.payload;
    default:
      return state;
  }
}

export default dialogReducer;
