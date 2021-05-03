import { combineReducers } from 'redux';
import dialogReducer from './dialogReducer';
import reportReducer from './reportReducer';
import aircraftReducer from './aircraftReducer';
import searchAreaReducer from './searchAreaReducer';

export default combineReducers({
  dialogReducer,
  reportReducer,
  aircraftReducer,
  searchAreaReducer,
});
