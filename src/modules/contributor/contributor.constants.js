export const SET_INTENT = "SET_INTENT";
export const SET_INTENT_FULLNAME = "SET_INTENT_FULLNAME";

export const GET_ALL_SYNONYMS = "GET_ALL_SYNONYMS";
export const ADD_SYNONYM = "ADD_SYNONYM";

export const GET_ALL_REFERENCE = "GET_ALL_REFERENCE";

export const criticalType = ["PER", "LOC", "ORG", "MISC"];

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
