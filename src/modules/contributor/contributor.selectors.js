const getForm = (store) => store.contributorReducer.form;
export const getIntent = (store) => getForm(store).intent;
export const getIntentFullName = (store) => getForm(store).getIntentFullName;
