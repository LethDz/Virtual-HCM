import StatusBar from 'src/modules/contributor/components/knowLedgeListComponent/StatusBar';
import StatusBadge from 'src/modules/contributor/components/knowLedgeListComponent/StatusBadge';
import { dateComparator } from 'src/common/getDate'

export const RESET_DATA_APPROVAL_DETAIL = 'RESET_DATA_APPROVAL_DETAIL';

export const SET_INTENT = 'SET_INTENT';
export const SET_INTENT_FULLNAME = 'SET_INTENT_FULLNAME';

export const GET_ALL_SYNONYMS = 'GET_ALL_SYNONYMS';
export const ADD_SYNONYM = 'ADD_SYNONYM';
export const EDIT_SYNONYM = 'EDIT_SYNONYM';
export const GET_SYNONYM_DETAIL = 'GET_SYNONYM_DETAIL';
export const DELETE_SYNONYM = 'DELETE_SYNONYM';

export const GET_ALL_REFERENCE = 'GET_ALL_REFERENCE';
export const EDIT_REFERENCE = 'EDIT_REFERENCE';
export const ADD_REFERENCE_TO_LIST = 'ADD_REFERENCE_TO_LIST';
export const GET_REFERENCE_DETAIL = 'GET_REFERENCE_DETAIL';
export const DELETE_REFERENCE = 'DELETE_REFERENCE';
export const GET_KNOWLEDGE_DATA_SETTINGS = 'GET_KNOWLEDGE_DATA_SETTINGS';

export const PROCESSING = 'PROCESSING';
export const DONE = 'DONE';
export const AVAILABLE = 'AVAILABLE';
export const DISABLE = 'DISABLE';

export const DELETED = 'DELETED';
export const VIEWABLE = 'VIEWABLE';

export const NORMAL_COMMENT = 'NORMAL_COMMENT';
export const REPLY_COMMENT = 'REPLY_COMMENT';

export const MAXIMUM_COMMENT_PER_PAGE = 5;

export const ACCEPT = 1
export const DECLINE = 2
export const DRAFT = 3

export const criticalType = ['PER', 'LOC', 'ORG', 'MISC'];
export const questionType = [
  'WHAT',
  'WHEN',
  'WHERE',
  'WHO',
  'WHY',
  'HOW',
  'YES/NO',
];
export const coresponseType = [
  'WHAT',
  'WHEN',
  'WHERE',
  'WHO',
  'WHY',
  'HOW',
];
export const GET_ALL_DATA_APPROVAL = 'GET_ALL_DATA_APPROVAL';
export const GET_DATA_APPROVAL = 'GET_DATA_APPROVAL';
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

export const V = 'V';
export const N = 'N';

export const context = (component) => ({
  componentParent: component,
});

export const frameworkComponents = {
  statusBar: StatusBar,
  statusBadge: StatusBadge
};

export const columnFieldDef = [
  {
    field: 'id',
    headerName: 'ID',
    sortable: true,
    filter: true,
    width: 70
  },
  {
    field: 'intent',
    headerName: 'Intent',
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'intent_fullname',
    headerName: 'Intent fullname',
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'create_user',
    headerName: 'Created by',
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'edit_user',
    headerName: 'Modified by',
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'mdate',
    headerName: 'Last modified date',
    sortable: true,
    filter: true,
    sort: 'desc',
    comparator: dateComparator,
    resizable: true
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: "statusBadge"
  },
  {
    field: 'reviews',
    headerName: 'Progress',
    resizable: true,
    cellRenderer: "statusBar",
  },
];

export const columnGenSentenceDef = [
  {
    field: 'sentence',
    headerName: 'Sentence',
    width: 465,
    sortable: true,
    filter: true,
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
    sort: 'asc',
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
    sort: 'asc',
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

// Column Reference Field Definition
export const columnRefFieldDef = [
  {
    field: 'reference_document_id',
    headerName: 'ID',
    width: 60,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'reference_name',
    headerName: 'Name',
    width: 230,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'link',
    headerName: 'Link',
    width: 300,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 350,
    sortable: true,
    filter: true,
    resizable: true,
  },
];

// Column Synonym Field Definition
export const columnSynonymFieldDef = [
  {
    field: 'synonym_id',
    headerName: 'ID',
    width: 70,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'meaning',
    headerName: 'Meaning',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'words',
    headerName: 'Words',
    sortable: true,
    filter: true,
    resizable: true,
  },
];
