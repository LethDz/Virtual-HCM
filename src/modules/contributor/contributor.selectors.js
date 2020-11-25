export const getAllSynonyms = (store) => store.contributorReducer.synonymsList;
export const getSynonymDetail = (store) =>
  store.contributorReducer.synonymDetail;
export const getAllDocumentReference = (store) =>
  store.contributorReducer.documentReferenceList;
export const getReferenceDetail = (store) =>
  store.contributorReducer.referenceDetail;
export const getAllDataApproval = (store) =>
  store.contributorReducer.dataApprovalList;
export const getDataApprovalDetail = (store) =>
  store.contributorReducer.dataApprovalDetail;
export const getAllPendingReport = (store) => store.contributorReducer.reportList;
export const getReportDetail = (store) => store.contributorReducer.reportDetail;
export const getAllAcceptedReport = (store) => store.contributorReducer.acceptedReportList;
export const getAllRejectedReport = (store) => store.contributorReducer.rejectedReportList;
export const getNewApprovalReport = (store) => store.contributorReducer.approvalDetail;