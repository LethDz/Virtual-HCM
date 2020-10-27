import { combineReducers } from 'redux';
import { homeReducer } from 'src/modules/home/index';
import { adminReducer } from 'src/modules/admin';

export const rootReducer = combineReducers({ homeReducer, adminReducer });
