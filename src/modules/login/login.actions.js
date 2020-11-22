import {
  BOTH_USERNAME_AND_PASSWORD_REQUIRED,
  FORBIDDEN,
  USER_HAS_BEEN_BANNED,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from 'src/constants';

// Show the login error message
export const showLoginError = (data, component, addToast) => {
  if (data && !data.status) {
    const resultData = data.result_data;
    if (resultData.error_detail && resultData.status_code === FORBIDDEN) {
      resultData.error_detail === USER_NOT_FOUND &&
        component._isMounted &&
        component.setState({
          usernameInvalid: true,
        });

      resultData.error_detail === WRONG_PASSWORD &&
        component._isMounted &&
        component.setState({
          passwordInvalid: true,
        });

      resultData.error_detail === BOTH_USERNAME_AND_PASSWORD_REQUIRED &&
        component._isMounted &&
        component.setState({
          passwordInvalid: true,
          usernameInvalid: true,
        });

      resultData.error_detail === USER_HAS_BEEN_BANNED &&
        addToast(
          `${resultData.error_detail}.
          Please contact to Admin for support`,
          {
            appearance: 'error',
          }
        );
    } else {
      addToast(resultData.error_detail, {
        appearance: 'error',
      });
    }
  }
};
