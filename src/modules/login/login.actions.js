import { FORBIDDEN, USER_NOT_FOUND, WRONG_PASSWORD } from "src/constants";

// Show the login error message 
export const showLoginError = (data, component) => {
  if (data && !data.status) {
    const resultData = data.result_data;
    if (
      resultData.error_detail &&
      resultData.error_detail === USER_NOT_FOUND &&
      resultData.status_code === FORBIDDEN
    ) {
      component._isMounted &&
        component.setState({
          usernameInvalid: true,
        });
    }

    if (
      resultData.error_detail &&
      resultData.error_detail === WRONG_PASSWORD &&
      resultData.status_code === FORBIDDEN
    ) {
      component._isMounted &&
        component.setState({
          passwordInvalid: true,
        });
    }
  }
}