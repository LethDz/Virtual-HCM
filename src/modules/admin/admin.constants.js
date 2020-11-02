import { BtnChangeStatus } from 'src/modules/admin';

// Action Types
export const GET_CONTRIBUTORS_LIST = 'GET_CONTRIBUTORS_LIST';
export const ADD_CONTRIBUTOR_TO_LIST = 'ADD_CONTRIBUTOR_TO_LIST';
export const EDIT_CONTRIBUTOR = 'EDIT_CONTRIBUTOR';
export const CHANGE_CONTRIBUTOR_STATUS = 'CHANGE_CONTRIBUTOR_STATUS';
export const PULL_CONTRIBUTOR_DETAIL = 'PULL_CONTRIBUTOR_DETAIL';

// AG-Grid Setting
// Column Field Definition
export const columnFieldDef = (width) => {
  const numberOfElement = fields(width).length;
  const columnWidth = width / numberOfElement;
  return fields(columnWidth);
};

const fields = (width) => [
  {
    headerName: 'ID',
    field: 'user_id',
    sortable: true,
    filter: true,
    resizable: true,
    width: width,
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
