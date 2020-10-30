import { LOGOUT } from 'src/constants';
import {
  ADD_CONTRIBUTOR_TO_LIST,
  EDIT_CONTRIBUTOR,
  GET_CONTRIBUTORS_LIST,
  CHANGE_CONTRIBUTOR_STATUS,
  PULL_CONTRIBUTOR_DETAIL,
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
      let newContributorsList = state.contributorsList;
      newContributorsList.push(contributor);
      return {
        ...state,
        contributorsList: newContributorsList,
      };

    case EDIT_CONTRIBUTOR:
      const contributorDetail = action.payload.contributorDetail;
      let list = state.contributorsList.map((contributor) => {
        if (contributor.user_id === contributorDetail.user_id) {
          contributor = contributorDetail;
        }

        return contributor;
      });

      return {
        ...state,
        contributorDetail: contributorDetail,
        contributorsList: list,
      };

    case PULL_CONTRIBUTOR_DETAIL:
      const detail = action.payload.contributor;
      return {
        ...state,
        contributorDetail: detail,
      };

    case CHANGE_CONTRIBUTOR_STATUS:
      const id = action.payload.id;
      let conDetail = state.contributorDetail;
      let conList = state.contributorsList.map((contributor) => {
        if (contributor.user_id === id) {
          contributor.active = !contributor.active;
        }
        return contributor;
      });

      if (state.contributorDetail && state.contributorDetail.user_id === id) {
        conDetail.active = !conDetail.active;
      }

      return {
        ...state,
        contributorDetail: conDetail,
        contributorsList: conList,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
