import { LOGOUT } from 'src/constants';
import {
  GET_ALL_SYNONYMS,
  GET_ALL_REFERENCE,
  EDIT_REFERENCE,
  ADD_REFERENCE_TO_LIST,
  GET_REFERENCE_DETAIL,
  DELETE_REFERENCE,
  GET_ALL_DATA_APPROVAL,
  GET_DATA_APPROVAL,
} from 'src/modules/contributor/index';

const initialState = {
  synonymsList: [],
  documentReferenceList: [],
  dataApprovalList: [],
  referenceDetail: null,
  dataApprovalDetail: null
};

export const contributorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DATA_APPROVAL:
      const dataApprovalList = action.payload.dataApprovalList;
      return {
        ...state,
        dataApprovalList,
      };

    case GET_DATA_APPROVAL:
      const dataApproval = action.payload.dataApproval;
      return {
        ...state,
        dataApprovalDetail: dataApproval
      }

    case GET_ALL_SYNONYMS:
      const synonymsList = action.payload.synonymsList;
      return {
        ...state,
        synonymsList,
      };

    case GET_ALL_REFERENCE: {
      const list = action.payload.documentReferenceList;
      return {
        ...state,
        documentReferenceList: list,
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
      const deleteID = action.payload.id;
      let pos = -1;
      let listAfterDelete = state.documentReferenceList.map(
        (reference, index) => {
          if (reference.reference_document_id === deleteID) {
            pos = index;
          }

          return reference;
        }
      );
      listAfterDelete.splice(pos, 1);
      return {
        ...state,
        documentReferenceList: listAfterDelete,
      };
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
