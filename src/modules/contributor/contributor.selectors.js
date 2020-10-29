// const getForm = (store) => store.contributorReducer.form;
// export const getIntent = (store) => getForm(store).intent;
// export const getIntentFullName = (store) => getForm(store).getIntentFullName;
export const getAllSynonyms = (store) => store.contributorReducer.synonymsList;
export const getAllDocumentReference = (store) => store.contributorReducer.documentReferenceList;
