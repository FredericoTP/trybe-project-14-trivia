import { combineReducers } from 'redux';
import login from './loginReducer';
import player from './gameReducer';

const rootReducer = combineReducers({ login, player });

export default rootReducer;
