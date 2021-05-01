import { combineReducers } from 'redux';
import dialogReducer from './dialogReducer';
import reportReducer from './reportReducer';
import aircraftReducer from './aircraftReducer';

export default combineReducers({
  dialogReducer,
  reportReducer,
  aircraftReducer,
});
