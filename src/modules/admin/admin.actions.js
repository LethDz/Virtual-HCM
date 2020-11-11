import {
  ADD_CONTRIBUTOR_TO_LIST,
  GET_CONTRIBUTORS_LIST,
  EDIT_CONTRIBUTOR,
  CHANGE_CONTRIBUTOR_STATUS,
  PULL_CONTRIBUTOR_DETAIL,
  PULL_TRAINABLE_DATA,
  PULL_CURRENT_STATE, 
  PULL_TRAIN_SOCKET
} from 'src/modules/admin';

export const pullContributorsList = (contributorsList) => ({
  type: GET_CONTRIBUTORS_LIST,
  payload: {
    contributorsList,
  },
});

export const pullContributor = (contributor) => ({
  type: PULL_CONTRIBUTOR_DETAIL,
  payload: {
    contributor,
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

export const editStatusOfUser = (id) => ({
  type: CHANGE_CONTRIBUTOR_STATUS,
  payload: {
    id,
  },
});

export const pullTrainableData = (trainableData) => ({
  type: PULL_TRAINABLE_DATA,
  payload: {
    trainableData,
  },
});

export const eventEnterSimulator = new KeyboardEvent('keypress', {
  bubbles: true,
  cancelable: true,
  code: 'Enter',
  key: 'Enter',
  keyCode: 13,
});

export const pullTrainSocket = (trainSocket) => ({
  type: PULL_TRAIN_SOCKET,
  payload: {
    trainSocket,
  }
});

export const pullCurrentState = (currentState) => ({
  type: PULL_CURRENT_STATE,
  payload: {
    currentState,
  }
});
