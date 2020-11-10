import { BtnChangeStatus } from 'src/modules/admin';

// Action Types
export const GET_CONTRIBUTORS_LIST = 'GET_CONTRIBUTORS_LIST';
export const ADD_CONTRIBUTOR_TO_LIST = 'ADD_CONTRIBUTOR_TO_LIST';
export const EDIT_CONTRIBUTOR = 'EDIT_CONTRIBUTOR';
export const CHANGE_CONTRIBUTOR_STATUS = 'CHANGE_CONTRIBUTOR_STATUS';
export const PULL_CONTRIBUTOR_DETAIL = 'PULL_CONTRIBUTOR_DETAIL';
export const PULL_TRAINABLE_DATA = 'PULL_TRAINABLE_DATA';
export const PULL_TRAIN_SOCKET = 'PULL_TRAIN_SOCKET';
export const PULL_CURRENT_STATE = 'PULL_CURRENT_STATE'; 

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
    resizable: true,
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
    headerName: 'Date of birth',
    field: 'date_of_birth',
    sortable: true,
    filter: true,
    resizable: true,
    width: width,
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
