import { combineReducers } from 'redux';
import { homeReducer } from 'src/modules/home/index';

export const rootReducer = combineReducers({homeReducer});
