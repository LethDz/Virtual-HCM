import {
  ADD_SYNONYM,
  GET_ALL_SYNONYMS,
  GET_ALL_REFERENCE,
  EDIT_REFERENCE,
  ADD_REFERENCE_TO_LIST,
  GET_REFERENCE_DETAIL,
  DELETE_REFERENCE,
} from 'src/modules/contributor/index';

export const addSynonymToList = (synonym) => ({
  type: ADD_SYNONYM,
  payload: {
    synonym,
  },
});

export const fetchAllSynonyms = (synonymsList) => ({
  type: GET_ALL_SYNONYMS,
  payload: {
    synonymsList,
  },
});

export const fetchAllDocumentReference = (documentReferenceList) => ({
  type: GET_ALL_REFERENCE,
  payload: {
    documentReferenceList,
  },
});

export const getReferenceDetail = (reference) => ({
  type: GET_REFERENCE_DETAIL,
  payload: {
    reference,
  },
});

export const editReferenceDetail = (referenceDetail) => ({
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

export const deleteReference = (reference) => ({
  type: DELETE_REFERENCE,
  payload: {
    reference,
  },
});
