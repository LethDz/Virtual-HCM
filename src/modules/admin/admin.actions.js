import {
  ADD_CONTRIBUTOR_TO_LIST,
  GET_CONTRIBUTORS_LIST,
  EDIT_CONTRIBUTOR,
} from 'src/modules/admin';

export const getContributorsList = (contributorsList) => ({
  type: GET_CONTRIBUTORS_LIST,
  payload: {
    contributorsList,
  },
});

export const editContributor = (contributorDetail) => ({
  type: EDIT_CONTRIBUTOR,
  payload: {
    contributorDetail,
  },
});

export const addContributorToList = (contributor) => ({
  type: ADD_CONTRIBUTOR_TO_LIST,
  payload: {
    contributor,
  },
});
