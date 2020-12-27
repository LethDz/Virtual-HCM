import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';

const SideBarItem = (props) => {
  return (
    <div className="sidebar-item">
      <Link to={props.link} className="link-no-underline">
        <ListGroupItem active={props.active} className="sidebar-link select">
          {props.icon} {props.name}
        </ListGroupItem>
      </Link>
    </div>
  );
};

export default SideBarItem;
