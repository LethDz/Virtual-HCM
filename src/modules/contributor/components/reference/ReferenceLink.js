import React from 'react';

export const ReferenceLink = (props) => {
  const link = props.value;
  const columnField = props.colDef?.field;
  return (
    <a
      href={link}
      className={
        columnField
          ? 'link-no-underline-black'
          : 'link-no-underline'
      }
    >
      {props.value}
    </a>
  );
};

export default ReferenceLink;
