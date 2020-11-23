export const getChatReducer = (store) => store.chatReducer;
export const getStatusOfChatSocket = (store) => getChatReducer(store).connected;
