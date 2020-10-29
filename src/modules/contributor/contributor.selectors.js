export const getContributorReducer = (store) => store.contributorReducer;
export const getReferenceList = (store) =>
  getContributorReducer(store).referenceList;
export const getContributorDetail = (store) =>
  getContributorReducer(store).referenceDetail;
