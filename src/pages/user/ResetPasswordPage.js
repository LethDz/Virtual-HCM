import React from 'react';
import { ResetPassword } from 'src/modules/user';

const ResetPasswordPage = (props) => {
  const query = new URLSearchParams(props.location?.search);
  return (
    <div className="login-body align-center">
      <ResetPassword uid={query.get('uid')} />
    </div>
  );
};

export default ResetPasswordPage;
