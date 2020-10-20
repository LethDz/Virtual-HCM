import { SET_INTENT } from "src/modules/contributor/index";

const initialState = {
  mode: "NORMAL",
  form: {
    intent: "",
    intentFullName: "",
    questions: [],
    componentOfQuestion: [],
    criticalData: [],
    coresponse: [],
    rawData: "",
    synonyms: [],
    baseResponse: "",
    documentReference: "",
    page: "",
  },
  currentSelected: {
    word: "",
    index: "",
  },
};

export const contributorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTENT:
      const textModified = action.payload.intent;
      return {
        ...state,
        form: {
          ...state.form,
          intent: textModified,
        },
      };

    default:
      return state;
  }
};
