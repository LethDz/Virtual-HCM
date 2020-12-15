import React from 'react';
import { Link } from 'react-router-dom';
import { USER_DETAIL_PAGE } from 'src/constants';

export const ReferenceUserLink = (props) => {
  const data = props.data;
  const columnField = props.colDef?.field;
  const userField = columnField.replace('name','');
  const getUserId = () => {
      return data[`${userField}`];
  };

  return (
    <Link
      to={USER_DETAIL_PAGE(getUserId())}
      className={
        columnField
          ? 'link-no-underline-black'
          : 'link-no-underline'
      }
    >
      {props.value}
    </Link>
  );
};

export default ReferenceUserLink;