import { LOGOUT } from 'src/constants';
import {
  ADD_REFERENCE_TO_LIST,
  EDIT_REFERENCE,
  GET_REFERENCE_LIST,
} from 'src/modules/contributor';

const initialState = {
  referenceList: [],
  referenceDetail: null,
};

export const contributorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REFERENCE_LIST:
      const referenceList = action.payload.referenceList;
      return {
        ...state,
        referenceList: referenceList,
      };

    case ADD_REFERENCE_TO_LIST:
      const reference = action.payload.reference;
      const newReferenceList = state.referenceList.push(reference);
      return {
        ...state,
        referenceList: newReferenceList,
      };

    case EDIT_REFERENCE:
      const referenceDetail = action.payload.referenceDetail;
      return {
        ...state,
        referenceDetail: referenceDetail,
      };
    
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
