import { UPDATE_STATUS_OF_CHAT_SOCKET } from 'src/modules/chat';

export const updateStatusOfChatSocket = (status) => ({
  type: UPDATE_STATUS_OF_CHAT_SOCKET,
  payload: {
    status,
  },
});
