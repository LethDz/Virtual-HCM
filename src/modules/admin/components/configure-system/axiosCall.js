import axiosClient from 'src/common/axiosClient';
import { ADMIN_CHANGE_SETTING, generalError } from 'src/constants';

export const axiosCall = (
  settingID,
  value,
  setErrorAlert,
  setErrorList,
  setLoading,
  callBack,
  addToast,
  scrollToRef
) => {
  setLoading(true);
  setErrorAlert(false);
  setErrorList([]);

  const data = {
    setting_id: settingID,
    value: value,
  };
  axiosClient
    .post(ADMIN_CHANGE_SETTING, data)
    .then((response) => {
      if (response.data.status) {
        addToast();
        callBack();
      } else {
        setErrorAlert(true);
        scrollToRef();
        if (response.data.messages[0] === generalError) {
          setErrorList(response.data.result_data.error_detail);
        } else {
          setErrorList(response.data.messages);
        }
      }
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      setErrorAlert(true);
    });
};
