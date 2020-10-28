export const getAdminReducer = (store) => store.adminReducer;
export const getContributorsList = (store) =>
  getAdminReducer(store).contributorsList;
export const getContributorDetail = (store) =>
  getAdminReducer(store).contributorDetail;
