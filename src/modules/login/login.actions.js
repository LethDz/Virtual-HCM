import {
  BOTH_USERNAME_AND_PASSWORD_REQUIRED,
  FORBIDDEN,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from 'src/constants';

// Show the login error message
export const showLoginError = (data, component) => {
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
    }
  }
};