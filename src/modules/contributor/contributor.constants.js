import { dateComparator } from 'src/common/getDate';
import StatusBar from 'src/modules/contributor/components/knowLedgeListComponent/StatusBar';
import StatusBadge from 'src/modules/contributor/components/knowLedgeListComponent/StatusBadge';
import SelfReviewStatus from 'src/modules/contributor/components/knowLedgeListComponent/SelfReviewStatus';
import ReviewStatusBadge from 'src/modules/contributor/components/knowledgeDataComponent/tableComponents/ReviewStatusBadge';
import { progressBarComparator } from 'src/modules/contributor/components/knowLedgeListComponent/progressBarComparator';
import { ReportType } from 'src/modules/contributor';
import { UserLink } from 'src/common/UserLink';

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

export const GET_ALL_PENDING_REPORT = 'GET_ALL_PENDING_REPORT';
export const GET_ALL_ACCEPTED_REPORT = 'GET_ALL_PENDING_ACCEPTED_REPORT';
export const GET_ALL_REJECTED_REPORT = 'GET_ALL_PENDING_REJECTED_REPORT';
export const REJECT_REPORT = 'REJECT_REPORT';
export const APPROVE_REPORT = 'APPROVE_REPORT';

export const RESET_APPROVAL_DETAIL_REPORT = 'RESET_APPROVAL_DETAIL_REPORT';

export const PROCESSING = 'PROCESSING';
export const DONE = 'DONE';
export const AVAILABLE = 'AVAILABLE';
export const DISABLE = 'DISABLE';

export const DELETED = 'DELETED';
export const VIEWABLE = 'VIEWABLE';

export const NORMAL_COMMENT = 'NORMAL_COMMENT';
export const REPLY_COMMENT = 'REPLY_COMMENT';

export const MAXIMUM_COMMENT_PER_PAGE = 5;

export const ACCEPT = 1;
export const DECLINE = 2;
export const DRAFT = 3;

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
export const coresponseType = ['WHAT', 'WHEN', 'WHERE', 'WHO', 'WHY', 'HOW'];
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
  statusBadge: StatusBadge,
  reviewStatusBadge: ReviewStatusBadge,
  selfReviewStatus: SelfReviewStatus,
  userLink: UserLink,
};

export const columnFieldDef = [
  {
    field: 'id',
    headerName: 'ID',
    sortable: true,
    filter: true,
    width: '100px',
  },
  {
    field: 'intent',
    headerName: 'Intent',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'intent_fullname',
    headerName: 'Intent fullname',
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'create_user',
    headerName: 'Created by',
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'edit_user',
    headerName: 'Modified by',
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'mdate',
    headerName: 'Last modified date',
    sortable: true,
    filter: true,
    sort: 'desc',
    comparator: dateComparator,
    resizable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'statusBadge',
  },
  {
    field: 'reviews',
    headerName: 'Progress',
    resizable: true,
    cellRenderer: 'statusBar',
    sortable: true,
    comparator: progressBarComparator,
  },
  {
    field: 'user_review',
    headerName: 'Self action',
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'selfReviewStatus',
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

// Column Review List Field Definition
export const columnReviewListRef = [
  {
    width: 150,
    field: 'user_id',
    headerName: 'User Id',
    sortable: true,
    filter: true,
  },
  {
    field: 'username',
    headerName: 'Username',
    sortable: true,
    filter: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'review',
    headerName: 'Review',
    sortable: true,
    filter: true,
  },
  {
    field: 'mdate',
    headerName: 'Modified date',
    comparator: dateComparator,
    sortable: true,
    filter: true,
    sort: 'desc',
  },
  {
    width: 100,
    field: 'status',
    headerName: 'Status',
    sortable: true,
    filter: true,
    cellRenderer: 'reviewStatusBadge',
  },
];

//Column Pending Report Field Definition
export const columnPendingReportFieldDef = [
  {
    field: 'report_id',
    headerName: 'ID',
    width: 30,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'report_type',
    headerName: 'Type',
    width: 30,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'reportType',
  },
  {
    field: 'reporter',
    headerName: 'Reporter',
    width: 50,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'reported_intent',
    headerName: 'Reported Intent',
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'cdate',
    headerName: 'Created Date',
    width: 50,
    sortable: true,
    filter: true,
    resizable: true,
    comparator: dateComparator,
  },
  {
    field: 'bot_version',
    headerName: 'Bot Version',
    width: 50,
    sortable: true,
    filter: true,
    resizable: true,
  },
];

//Column Accepted Report Field Definition
export const columnAcceptedReportFieldDef = [
  {
    field: 'report_id',
    headerName: 'ID',
    width: 30,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'report_type',
    headerName: 'Type',
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'reportType',
  },
  {
    field: 'reporter',
    headerName: 'Reporter',
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'processor',
    headerName: 'Processor',
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'reported_intent',
    headerName: 'Reported Intent',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'forward_intent',
    headerName: 'Forward Intent',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'mdate',
    headerName: 'Modified Date',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
    comparator: dateComparator,
  },
];

//Column Rejected Report Field Definition
export const columnRejectedReportFieldDef = [
  {
    field: 'report_id',
    headerName: 'ID',
    width: 30,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'report_type',
    headerName: 'Type',
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'reportType',
  },
  {
    field: 'reporter',
    headerName: 'Reporter',
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'processor',
    headerName: 'Processor',
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
    cellRenderer: 'userLink',
  },
  {
    field: 'reported_intent',
    headerName: 'Reported Intent',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'bot_version',
    headerName: 'Bot Version',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'mdate',
    headerName: 'Modified Date',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
    comparator: dateComparator,
  },
];

//Column chat history field definition
export const columnChatHistoryFieldDef = [
  {
    field: 'log_id',
    headerName: 'ID',
    width: 50,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: 'session_start',
    headerName: 'Session Start',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
    comparator: dateComparator,
  },
  {
    field: 'session_end',
    headerName: 'Session End',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true,
    comparator: dateComparator,
  },
];

export const frameworkComponentsForReport = {
  reportType: ReportType,
  userLink: UserLink,
};

export const reportType = {
  1: 'Wrong answer',
  2: 'Contribute data',
};

export const chartData = (labels, data, name) => ({
  labels: labels,
  datasets: [
    {
      label: name,
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(210, 214, 222, 0.4)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(210, 214, 222, 1)',
      ],
      borderWidth: 1,
    },
  ],
});

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    display: true,
    position: 'bottom',
  },
};
