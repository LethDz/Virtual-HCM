import { SET_INTENT, GET_ALL_SYNONYMS } from "src/modules/contributor/index";

const initialState = {
  synonyms: []
};

export const contributorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SYNONYMS:
      const synonyms = action.payload.synonyms;
      return {
        
      };

    default:
      return state;
  }
};
