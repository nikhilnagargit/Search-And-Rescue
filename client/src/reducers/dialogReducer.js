import { SHOW_DIALOG } from '../actions/types';

const initialState = {
  title: '',
  description: '',
  buttontext: '',
  visible: false,
};

function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_DIALOG:
      return action.payload;
    default:
      return state;
  }
}

export default dialogReducer;
