import {
  ADD_SYNONYM,
  GET_ALL_SYNONYMS,
  EDIT_SYNONYM,
  GET_SYNONYM_DETAIL,
  DELETE_SYNONYM,
  GET_ALL_REFERENCE,
  EDIT_REFERENCE,
  ADD_REFERENCE_TO_LIST,
  GET_REFERENCE_DETAIL,
  DELETE_REFERENCE,
  GET_ALL_DATA_APPROVAL,
  GET_DATA_APPROVAL
} from 'src/modules/contributor/index';

//Synonym
export const fetchAllDataApproval = (dataApprovalList) => ({
  type: GET_ALL_DATA_APPROVAL,
  payload: {
    dataApprovalList,
  },
});

export const pullDataApproval = (dataApproval) => ({
  type: GET_DATA_APPROVAL,
  payload: {
    dataApproval
  }
})


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

export const pullSynonymDetail = (synonym) => ({
  type: GET_SYNONYM_DETAIL,
  payload: {
    synonym,
  },
});

export const editSynonymDetail = (synonymDetail) => ({
  type: EDIT_SYNONYM,
  payload: {
    synonymDetail,
  },
});

export const deleteSynonym = (synonymId) => ({
  type: DELETE_SYNONYM,
  payload: {
    synonymId,
  },
});

//Document Reference
export const fetchAllDocumentReference = (documentReferenceList) => ({
  type: GET_ALL_REFERENCE,
  payload: {
    documentReferenceList,
  },
});

export const pullReferenceDetail = (reference) => ({
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

export const deleteReference = (id) => ({
  type: DELETE_REFERENCE,
  payload: {
    id,
  },
});
