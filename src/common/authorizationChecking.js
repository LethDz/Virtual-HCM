import { history } from "src/common/history";
import { ADMIN_PAGE, ROLE_ADMIN, ROLE_CONTRIBUTOR } from "src/constants";

export const checkForSkipLogin = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  user && user.access_token && history.push(ADMIN_PAGE); 
}

export const checkRoleToRedirect = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  history.push(ADMIN_PAGE);
  return user && user.user.admin ? ROLE_ADMIN : ROLE_CONTRIBUTOR;
}