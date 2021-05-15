import { combineReducers } from 'redux';
import dialogReducer from './dialogReducer';
import reportReducer from './reportReducer';
import aircraftReducer from './aircraftReducer';
import searchAreaReducer from './searchAreaReducer';
import helpPointsReducer from './helpPointsReducer';
import roadsReducer from './roadsReducer';

export default combineReducers({
  dialogReducer,
  reportReducer,
  aircraftReducer,
  searchAreaReducer,
  helpPointsReducer,
  roadsReducer,
});
