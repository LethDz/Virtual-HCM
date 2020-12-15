import { LOGOUT } from 'src/constants';
import { PULL_UNSEEN_REPORT } from 'src/modules/report-notification';

const initialState = {
  unseenReport: 0,
};

export const reportNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case PULL_UNSEEN_REPORT:
      return {
        ...state,
        unseenReport: action.payload.numberOfUnseen,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
