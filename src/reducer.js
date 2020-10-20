import { combineReducers } from 'redux';
import { homeReducer } from 'src/modules/home/index';
import { contributorReducer } from 'src/modules/contributor/index'

export const rootReducer = combineReducers({homeReducer, contributorReducer});
