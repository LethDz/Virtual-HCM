// Action Types
export const GET_REFERENCE_LIST = 'GET_REFERENCE_LIST';
export const ADD_REFERENCE_TO_LIST = 'ADD_REFERENCE_TO_LIST';
export const EDIT_REFERENCE = 'EDIT_REFERENCE';

// Column Reference Field Definition

export const columnRefFieldDef = [
    {
      field: 'reference_document_id',
      sortable: true,
      filter: true,
    },
    {
      field: 'reference_name',
      sortable: true,
      filter: true,
    },
    {
      field: 'link',
      sortable: true,
      filter: true,
    },
    {
      field: 'author',
      sortable: true,
      filter: true,
    },
    {
      field: 'cdate',
      sortable: true,
      filter: true,
    },
  ];