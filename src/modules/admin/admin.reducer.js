import { LOGOUT } from 'src/constants';
import {
  ADD_CONTRIBUTOR_TO_LIST,
  EDIT_CONTRIBUTOR,
  GET_CONTRIBUTORS_LIST,
} from 'src/modules/admin';

const initialState = {
  contributorsList: [],
  contributorDetail: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTRIBUTORS_LIST:
      const contributorsList = action.payload.contributorsList;
      return {
        ...state,
        contributorsList: contributorsList,
      };

    case ADD_CONTRIBUTOR_TO_LIST:
      const contributor = action.payload.contributor;
      const newContributorsList = state.contributorsList.push(contributor);
      return {
        ...state,
        contributorsList: newContributorsList,
      };

    case EDIT_CONTRIBUTOR:
      const contributorDetail = action.payload.contributorDetail;
      return {
        ...state,
        contributorDetail: contributorDetail,
      };
    
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
