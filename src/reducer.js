import { combineReducers } from 'redux';
import { homeReducer } from 'src/modules/home/index';
import { adminReducer } from 'src/modules/admin';
import { contributorReducer } from 'src/modules/contributor';

export const rootReducer = combineReducers({ homeReducer, adminReducer, contributorReducer});
