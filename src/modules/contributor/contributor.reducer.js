import { LOGOUT } from 'src/constants';
import {
  GET_ALL_SYNONYMS,
  GET_ALL_REFERENCE,
  EDIT_REFERENCE,
  ADD_REFERENCE_TO_LIST,
  GET_REFERENCE_DETAIL,
  DELETE_REFERENCE,
} from 'src/modules/contributor/index';

const initialState = {
  synonymsList: [],
  documentReferenceList: [],
  referenceDetail: null,
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
    case ADD_REFERENCE_TO_LIST:
      const reference = action.payload.reference;
      let newReferenceList = state.documentReferenceList;
      newReferenceList.push(reference);
      return {
        ...state,
        documentReferenceList: newReferenceList,
      };

    case EDIT_REFERENCE:
      const referenceDetail = action.payload.referenceDetail;
      let list = state.documentReferenceList.map((reference) => {
        if (
          reference.reference_document_id ===
          referenceDetail.reference_document_id
        ) {
          reference = referenceDetail;
        }

        return reference;
      });

      return {
        ...state,
        referenceDetail: referenceDetail,
        documentReferenceList: list,
      };

    case GET_REFERENCE_DETAIL:
      const detail = action.payload.reference;
      return {
        ...state,
        referenceDetail: detail,
      };

    case DELETE_REFERENCE:
      const deleteReference = action.payload.reference;
      let pos = -1;
      let listAferDelete = state.documentReferenceList.map((reference, index) => {
        if (
          reference.reference_document_id ===
          deleteReference.reference_document_id
        ) {
          reference = deleteReference;
          pos = index;
        }

        return reference;
      });
      listAferDelete.splice(pos, 1);
      return {
        ...state,
        documentReferenceList: listAferDelete,
      };
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
