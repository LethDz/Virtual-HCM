import { LOGOUT } from 'src/constants';
import {
  ADD_CONTRIBUTOR_TO_LIST,
  EDIT_CONTRIBUTOR,
  GET_CONTRIBUTORS_LIST,
  CHANGE_CONTRIBUTOR_STATUS,
  PULL_CONTRIBUTOR_DETAIL,
  PULL_TRAINABLE_DATA,
  PULL_TRAIN_SOCKET,
  PULL_CURRENT_STATE,
  PULL_TRAIN_DATA,
  ADD_NEW_TO_TRAIN_DATA,
  CHANGE_TRAIN_DATA_STATUS,
  PULL_TRAIN_DATA_DETAIL,
  EDIT_TRAIN_DATA_DESCRIPTION,
  DELETE_TRAIN_DATA,
  PULL_TRAIN_DATA_DELETED,
} from 'src/modules/admin';

const initialState = {
  contributorsList: [],
  contributorDetail: null,
  trainableData: [],
  trainSocket: null,
  currentState: null,
  trainDataList: [],
  trainDataDetail: null,
  trainDataDeleted: [],
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

    case PULL_TRAINABLE_DATA:
      const data = action.payload.trainableData;
      return {
        ...state,
        trainableData: data,
      };

    case PULL_TRAIN_SOCKET:
      const socket = action.payload.trainSocket;
      return {
        ...state,
        trainSocket: socket,
      };

    case PULL_CURRENT_STATE:
      const current = action.payload.currentState;
      return {
        ...state,
        currentState: current,
      };

    case PULL_TRAIN_DATA:
      const tData = action.payload.trainDataList;
      return {
        ...state,
        trainDataList: tData,
      };

    case ADD_NEW_TO_TRAIN_DATA:
      const newData = action.payload.newData;
      const trainData = state.trainDataList;
      return {
        ...state,
        trainDataList: trainData.concat([newData]),
      };

    case CHANGE_TRAIN_DATA_STATUS:
      const idTrainData = action.payload.id;
      let dataDetail = state.trainDataDetail;
      let dataList = state.trainDataList.map((data) => {
        if (data.id === idTrainData) {
          data.type = data.type === 1 ? 2 : 1;
        }
        return data;
      });

      if (state.trainDataDetail && state.trainDataDetail.id === id) {
        dataDetail.type = dataDetail.type === 1 ? 2 : 1;
      }

      return {
        ...state,
        trainDataDetail: dataDetail,
        trainDataList: dataList,
      };

    case PULL_TRAIN_DATA_DETAIL:
      const dataTemp = action.payload.dataDetail;
      return {
        ...state,
        trainDataDetail: dataTemp,
      };

    case EDIT_TRAIN_DATA_DESCRIPTION:
      const dataNew = action.payload.data;
      const newList = state.trainDataList.map((element) => {
        if (element.id === dataNew.id) {
          return dataNew;
        }

        return element;
      });

      return {
        ...state,
        trainDataDetail: dataNew,
        trainDataList: newList,
      };

    case DELETE_TRAIN_DATA:
      const idDelete = action.payload.id;
      let index = -1;
      state.trainDataList.map((data, i) => {
        if (data.id === idDelete) {
          index = i;
        }

        return data;
      });

      if (index !== -1) {
        const upperArray = state.trainDataList.slice(0, index);
        const lowerArray = state.trainDataList.slice(
          index + 1,
          state.trainDataList.length
        );
        const newDeletedTDList = upperArray.concat(lowerArray);
        return {
          ...state,
          trainDataList: newDeletedTDList,
        };
      }

      return state;

    case PULL_TRAIN_DATA_DELETED:
      const tdData = action.payload.deletedList;
      return {
        ...state,
        trainDataDeleted: tdData,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
