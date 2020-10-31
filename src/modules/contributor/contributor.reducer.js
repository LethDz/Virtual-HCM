import { LOGOUT } from "src/constants";
import {
  GET_ALL_SYNONYMS,
  GET_ALL_REFERENCE,
  ADD_REFERENCE,
} from "src/modules/contributor/index";

const initialState = {
  synonymsList: [],
  documentReferenceList: [],
  newDocumentReference: {},
};

export const contributorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SYNONYMS:
      const synonymsList = action.payload.synonymsList;
      return {
        ...state,
        synonymsList,
      };
    case GET_ALL_REFERENCE: {
      const documentReferenceList = action.payload.documentReferenceList;
      return {
        ...state,
        documentReferenceList,
      };
    }
    case ADD_REFERENCE: {
      const newDocumentReference = action.payload.newDocumentReference;
      return {
        ...state,
        newDocumentReference,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
