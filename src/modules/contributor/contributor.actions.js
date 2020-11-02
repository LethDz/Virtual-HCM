import {
  ADD_SYNONYM,
  GET_ALL_SYNONYMS,
  GET_ALL_REFERENCE,
} from "src/modules/contributor/index";

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
