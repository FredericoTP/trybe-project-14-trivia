import { combineReducers } from 'redux';
import login from './loginReducer';
import game from './gameReducer';

const rootReducer = combineReducers({ login, game });

export default rootReducer;
