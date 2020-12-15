import { combineReducers } from 'redux';
import { homeReducer } from 'src/modules/home';
import { adminReducer } from 'src/modules/admin';
import { contributorReducer } from 'src/modules/contributor';
import { chatReducer } from 'src/modules/chat';
import { reportNotificationReducer } from 'src/modules/report-notification';
export const rootReducer = combineReducers({
  homeReducer,
  adminReducer,
  contributorReducer,
  chatReducer,
  reportNotificationReducer,
});
