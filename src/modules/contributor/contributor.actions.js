import { SET_INTENT, SET_INTENT_FULLNAME } from "src/modules/contributor/index";

export const setIntent = (intent) => ({
    type: SET_INTENT,
    payload: {
      intent: intent
    },
});

export const setIntentFullName = (intentFullName) => ({
    type: SET_INTENT_FULLNAME,
    payload: {
      intentFullName: intentFullName
    },
});
