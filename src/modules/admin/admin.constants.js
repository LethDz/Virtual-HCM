// Action Types
export const GET_CONTRIBUTORS_LIST = 'GET_CONTRIBUTORS_LIST';
export const ADD_CONTRIBUTOR_TO_LIST = 'ADD_CONTRIBUTOR_TO_LIST';
export const EDIT_CONTRIBUTOR = 'EDIT_CONTRIBUTOR';

// Column Field Definition

export const columnFieldDef = [
  {
    field: 'user_id',
    sortable: true,
    filter: true,
  },
  {
    field: 'username',
    sortable: true,
    filter: true,
  },
  {
    field: 'fullname',
    sortable: true,
    filter: true,
  },
  {
    field: 'date_of_birth',
    sortable: true,
    filter: true,
  },
  {
    field: 'email',
    sortable: true,
    filter: true,
  },
  {
    field: 'active',
    sortable: true,
    filter: true,
  },
];