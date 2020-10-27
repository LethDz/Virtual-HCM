import { LOGOUT } from 'src/constants';
import { EDIT_HOME_EXAMPLES } from 'src/modules/home/index';

const initialState = {
  text: 'Hello',
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_HOME_EXAMPLES:
      const textModified = action.payload.edit;
      return {
        ...state,
        text: textModified,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
