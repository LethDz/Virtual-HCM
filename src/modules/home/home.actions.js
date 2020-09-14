import { EDIT_HOME_EXAMPLES } from 'src/modules/home/index';

export const editHomeExample = (text) => ({
    type: EDIT_HOME_EXAMPLES,
    payload: {
      edit: `Địt mẹ ${text}`,
    },
});
