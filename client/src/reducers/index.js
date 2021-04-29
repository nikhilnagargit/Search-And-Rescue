import { combineReducers } from 'redux';
import dialogReducer from './dialogReducer';
import reportReducer from './reportReducer';

export default combineReducers({ dialogReducer, reportReducer });
