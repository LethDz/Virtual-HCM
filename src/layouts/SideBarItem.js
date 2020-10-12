import React from "react";
import { ListGroupItem } from "reactstrap";

const SideBarItem = (props) => {
  return (
    <div className="sidebar-item">
      <ListGroupItem
        tag="a" 
        href={props.link}
      >
        {props.icon} {props.name}
      </ListGroupItem>
    </div>
  );
};

export default SideBarItem;
