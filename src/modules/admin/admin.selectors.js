export const getAdminReducer = (store) => store.adminReducer;
export const getContributorsList = (store) =>
  getAdminReducer(store).contributorsList;
export const getContributorDetail = (store) =>
  getAdminReducer(store).contributorDetail;
export const getTrainableData = (store) => getAdminReducer(store).trainableData;
export const getTrainSocket = (store) => getAdminReducer(store).trainSocket;
export const getCurrentState = (store) => getAdminReducer(store).currentState;
export const getTrainDataList = (store) => getAdminReducer(store).trainDataList;
export const getTrainDataDetail = (store) =>
  getAdminReducer(store).trainDataDetail;
export const getTrainDataDeleted = (store) =>
  getAdminReducer(store).trainDataDeleted;
