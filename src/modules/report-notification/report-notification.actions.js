import { PULL_UNSEEN_REPORT } from 'src/modules/report-notification';

export const pullUnseenReport = (numberOfUnseen) => ({
  type: PULL_UNSEEN_REPORT,
  payload: {
    numberOfUnseen,
  },
});
