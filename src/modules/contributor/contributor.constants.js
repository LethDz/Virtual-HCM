export const SET_INTENT = 'SET_INTENT';
export const SET_INTENT_FULLNAME = 'SET_INTENT_FULLNAME';

export const GET_ALL_SYNONYMS = 'GET_ALL_SYNONYMS';
export const ADD_SYNONYM = 'ADD_SYNONYM';

export const GET_ALL_REFERENCE = 'GET_ALL_REFERENCE';

export const criticalType = ['PER', 'LOC', 'ORG', 'MISC'];

export const POSTags = [
  'Np',
  'Nc',
  'Nu',
  'N',
  'Ny',
  'Nb',
  'V',
  'Vb',
  'A',
  'P',
  'R',
  'L',
  'M',
  'E',
  'C',
  'Cc',
  'I',
  'T',
  'Y',
  'Z',
  'X',
  'CH',
];

export const VERB = 'VERB';
export const CRITICAL = 'CRITICAL';

export const columnFieldDef = [
  {
    field: 'user_id',
    headerName: 'ID',
    sortable: true,
    filter: true,
  },
  {
    field: 'username',
    headerName: 'Question',
    sortable: true,
    filter: true,
  },
  {
    field: 'fullname',
    headerName: 'Answer',
    sortable: true,
    filter: true,
  },
  {
    field: 'date_of_birth',
    headerName: 'Created date',
    sortable: true,
    filter: true,
  },
  {
    field: 'email',
    headerName: 'Created by',
    sortable: true,
    filter: true,
  },
  {
    field: 'active',
    headerName: 'Status',
    sortable: true,
    filter: true,
  },
];

export const columnGenSentenceDef = [
  {
    field: 'sentence',
    headerName: 'Sentence',
    width: 465,
    sortable: true,
    filter: 'agSetColumnFilter',
    filterParams: { applyMiniFilterWhileTyping: true },
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
];

export const columnReferenceListDef = [
  {
    width: 100,
    field: 'reference_document_id',
    headerName: 'Id',
    sortable: true,
    filter: true,
  },
  {
    width: 365,
    field: 'reference_name',
    headerName: 'Name',
    sortable: true,
    filter: true,
  },
];

export const columnSynonymListRef = [
  {
    width: 100,
    field: 'synonym_id',
    headerName: 'Id',
    sortable: true,
    filter: true,
  },
  {
    width: 170,
    field: 'meaning',
    headerName: 'Meaning',
    sortable: true,
    filter: true,
  },
  {
    width: 195,
    field: 'words',
    headerName: 'Words',
    sortable: true,
    filter: true,
  },
];
