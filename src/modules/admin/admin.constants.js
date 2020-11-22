import { dateComparator } from 'src/common/getDate';
import { BtnChangeStatus, TrainDataType, AccountRole } from 'src/modules/admin';

// Action Types
export const GET_CONTRIBUTORS_LIST = 'GET_CONTRIBUTORS_LIST';
export const ADD_CONTRIBUTOR_TO_LIST = 'ADD_CONTRIBUTOR_TO_LIST';
export const EDIT_CONTRIBUTOR = 'EDIT_CONTRIBUTOR';
export const CHANGE_CONTRIBUTOR_STATUS = 'CHANGE_CONTRIBUTOR_STATUS';
export const PULL_CONTRIBUTOR_DETAIL = 'PULL_CONTRIBUTOR_DETAIL';
export const PULL_TRAINABLE_DATA = 'PULL_TRAINABLE_DATA';
export const PULL_TRAIN_SOCKET = 'PULL_TRAIN_SOCKET';
export const PULL_CURRENT_STATE = 'PULL_CURRENT_STATE';
export const PULL_TRAIN_DATA = 'PULL_TRAIN_DATA';
export const ADD_NEW_TO_TRAIN_DATA = 'ADD_NEW_TO_TRAIN_DATA';
export const CHANGE_TRAIN_DATA_STATUS = 'CHANGE_TRAIN_DATA_STATUS';
export const PULL_TRAIN_DATA_DETAIL = 'PULL_TRAIN_DATA_DETAIL';
export const EDIT_TRAIN_DATA_DESCRIPTION = 'EDIT_TRAIN_DATA_DESCRIPTION';
export const DELETE_TRAIN_DATA = 'DELETE_TRAIN_DATA';
export const PULL_TRAIN_DATA_DELETED = 'PULL_TRAIN_DATA_DELETED';

// AG-Grid Setting
// Column Field Definition
export const columnFieldDef = (width) => {
  const numberOfElement = fields(width).length;
  const columnWidth = (width - 50) / numberOfElement;
  return fields(columnWidth);
};

const fields = (width) => [
  {
    headerName: 'ID',
    field: 'user_id',
    sortable: true,
    filter: true,
    width: 100,
  },
  {
    headerName: 'Username',
    field: 'username',
    sortable: true,
    filter: true,
    width: 120,
    resizable: true,
  },
  {
    headerName: 'Role',
    field: 'admin',
    sortable: true,
    filter: true,
    resizable: true,
    width: 120,
    cellRenderer: 'accountRole',
  },
  {
    headerName: 'Full Name',
    field: 'fullname',
    sortable: true,
    filter: true,
    resizable: true,
    width: width,
  },
  {
    headerName: 'Date Of Birth',
    field: 'date_of_birth',
    sortable: true,
    filter: true,
    resizable: true,
    width: width,
    comparator: dateComparator,
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    filter: true,
    resizable: true,
    width: width,
  },
  {
    headerName: 'Status',
    field: 'active',
    sortable: true,
    filter: true,
    resizable: true,
    width: width,
    cellRenderer: 'btnChangeStatus',
  },
];

// set Component to Ag-grid
export const frameworkComponents = {
  btnChangeStatus: BtnChangeStatus,
  accountRole: AccountRole,
};

// set context to Ag-grid
export const context = (component) => ({
  componentParent: component,
});

// Layer activation functions
export const activations = [
  'relu',
  'sigmoid',
  'softmax',
  'softplus',
  'softsign',
  'tanh',
  'selu',
  'elu',
];

// Trainable Data Column Definition
export const trainableDataCol = [
  {
    headerName: 'ID',
    field: 'id',
    sortable: true,
    filter: true,
    width: 70,
  },
  {
    headerName: 'File Name',
    field: 'filename',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Description',
    field: 'description',
    sortable: true,
    filter: true,
    resizable: true,
  },
];

// Trainable Data Column Definition
export const trainDataCol = [
  {
    headerName: 'ID',
    field: 'id',
    sortable: true,
    filter: true,
    width: 70,
  },
  {
    headerName: 'File Name',
    field: 'filename',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Type',
    field: 'type',
    sortable: true,
    filter: true,
    width: 100,
    cellRenderer: 'trainDataType',
  },
  {
    headerName: 'Description',
    field: 'description',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Created Date',
    field: 'cdate',
    sortable: true,
    filter: true,
    width: 120,
    resizable: true,
    comparator: dateComparator,
  },
  {
    headerName: 'Modified Date',
    field: 'mdate',
    sortable: true,
    filter: true,
    width: 120,
    resizable: true,
    comparator: dateComparator,
  },
];

// set Component to Ag-grid
export const frameworkComponentsData = {
  trainDataType: TrainDataType,
};

// Classifier Type
export const classifierTypes = {
  1: 'Intent',
  2: 'Question',
};

// Default Setting
export const defaultSetting = {
  sentence_length: 30,
  batch: 32,
  epoch: 5,
  learning_rate: '2e-5', // String or float ok
  epsilon: '1e-8', // String or float ok
  activation: 'softmax',
};

export const dataTypes = {
  1: {
    badge: 'success',
    value: 'Available',
  },
  2: {
    badge: 'secondary',
    value: 'Disabled',
  },
  3: {
    badge: 'danger',
    value: 'Deleted',
  },
};

export const trainableKnowledgeCol = [
  {
    headerName: 'Intent',
    field: 'intent',
    sortable: true,
    filter: true,
    resizable: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
  },
  {
    headerName: 'Intent Fullname',
    field: 'intent_fullname',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Edit User',
    field: 'edit_user',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Created Date',
    field: 'cdate',
    sortable: true,
    filter: true,
    width: 120,
    resizable: true,
    comparator: dateComparator,
  },
  {
    headerName: 'Modified Date',
    field: 'mdate',
    sortable: true,
    filter: true,
    width: 120,
    resizable: true,
    comparator: dateComparator,
  },
];

// Trainable Data Column Definition
export const trainDataDeleted = [
  {
    headerName: 'ID',
    field: 'id',
    sortable: true,
    filter: true,
    width: 70,
  },
  {
    headerName: 'File Name',
    field: 'filename',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Deleted Reason',
    field: 'delete_reason',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Description',
    field: 'description',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    headerName: 'Created Date',
    field: 'cdate',
    sortable: true,
    filter: true,
    width: 120,
    resizable: true,
    comparator: dateComparator,
  },
  {
    headerName: 'Modified Date',
    field: 'mdate',
    sortable: true,
    filter: true,
    width: 120,
    resizable: true,
    comparator: dateComparator,
  },
];
