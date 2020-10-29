import {
    ADD_REFERENCE_TO_LIST,
    GET_REFERENCE_LIST,
    EDIT_REFERENCE,
  } from 'src/modules/contributor';
  
  export const getReferenceList = (referenceList) => ({
    type: GET_REFERENCE_LIST,
    payload: {
        referenceList,
    },
  });
  
  export const editReference = (referenceDetail) => ({
    type: EDIT_REFERENCE,
    payload: {
        referenceDetail,
    },
  });
  
  export const addReferenceToList = (reference) => ({
    type: ADD_REFERENCE_TO_LIST,
    payload: {
        reference,
    },
  });