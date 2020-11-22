import { combineReducers } from 'redux';
import { homeReducer } from 'src/modules/home';
import { adminReducer } from 'src/modules/admin';
import { contributorReducer } from 'src/modules/contributor';
import { chatReducer } from 'src/modules/chat';
export const rootReducer = combineReducers({
  homeReducer,
  adminReducer,
  contributorReducer,
  chatReducer,
});
