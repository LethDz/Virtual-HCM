import React from 'react';
import { Link } from 'react-router-dom';
import { USER_DETAIL_PAGE } from 'src/constants';

export const UserLink = (props) => {
  const data = props.data;
  const columnField = props.colDef?.field;
  const getUserId = () => {
    if (columnField && columnField !== 'username') {
      return data[`${columnField}_id`];
    }

    return data.user_id || data.user;
  };

  return (
    <Link
      to={USER_DETAIL_PAGE(getUserId())}
      className={
        columnField || data.user
          ? 'link-no-underline-black'
          : 'link-no-underline'
      }
    >
      {props.value}
    </Link>
  );
};
