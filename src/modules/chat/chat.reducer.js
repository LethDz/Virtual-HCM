import { UPDATE_STATUS_OF_CHAT_SOCKET } from 'src/modules/chat';

const initialState = {
  connected: false,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS_OF_CHAT_SOCKET:
      const temp = action.payload.status;
      return {
        ...state,
        connected: temp,
      };

    default:
      return state;
  }
};
