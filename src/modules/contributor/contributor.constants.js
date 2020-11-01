export const SET_INTENT = "SET_INTENT";
export const SET_INTENT_FULLNAME = "SET_INTENT_FULLNAME";

export const GET_ALL_SYNONYMS = "GET_ALL_SYNONYMS";
export const ADD_SYNONYM = "ADD_SYNONYM";

export const GET_ALL_REFERENCE = "GET_ALL_REFERENCE";

export const criticalType = ["PER", "LOC", "ORG", "MISC"];

export const POSTags = [
  "Np",
  "Nc",
  "Nu",
  "N",
  "Ny",
  "Nb",
  "V",
  "Vb",
  "A",
  "P",
  "R",
  "L",
  "M",
  "E",
  "C",
  "Cc",
  "I",
  "T",
  "Y",
  "Z",
  "X",
  "CH",
];

export const VERB = "VERB";
export const CRITICAL = "CRITICAL";

export const columnFieldDef = [
  {
    field: "user_id",
    headerName: "ID",
    sortable: true,
    filter: true,
  },
  {
    field: "username",
    headerName: "Question",
    sortable: true,
    filter: true,
  },
  {
    field: "fullname",
    headerName: "Answer",
    sortable: true,
    filter: true,
  },
  {
    field: "date_of_birth",
    headerName: "Created date",
    sortable: true,
    filter: true,
  },
  {
    field: "email",
    headerName: "Created by",
    sortable: true,
    filter: true,
  },
  {
    field: "active",
    headerName: "Status",
    sortable: true,
    filter: true,
  },
];

// Column Reference Field Definition
export const columnRefFieldDef = [
  {
    field: "reference_document_id",
    headerName: "ID",
    width: "60",
    sortable: true,
    filter: true,
  },
  {
    field: "reference_name",
    headerName: "Name",
    width: "230",
    sortable: true,
    filter: true,
  },
  {
    field: "link",
    headerName: "Link",
    width: "300",
    sortable: true,
    filter: true,
  },
  {
    field: "author",
    headerName: "Author",
    width: "350",
    sortable: true,
    filter: true,
  },
];
