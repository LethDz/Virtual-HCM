import React from "react";
import { ListGroup } from "reactstrap";
import SideBarItem from "src/layouts/SideBarItem";
import { ROLE_ADMIN, ROLE_CONTRIBUTOR } from "src/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faServer,
  faCogs,
  faBook,
  faFileAlt,
  faNewspaper,
  faClipboardList,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const switchLayout = (user) => {
  if (user === ROLE_ADMIN) {
    return (
      <ListGroup flush>
        <SideBarItem
          name="Accounts"
          icon={<FontAwesomeIcon icon={faUserCircle} />}
          link="#"
        />
        <SideBarItem
          name="Manage Training Process"
          icon={<FontAwesomeIcon icon={faServer} />}
          link="#"
        />
        <SideBarItem
          name="Configure System"
          icon={<FontAwesomeIcon icon={faCogs} />}
          link="#"
        />
      </ListGroup>
    );
  } else if (user === ROLE_CONTRIBUTOR) {
    return (
      <ListGroup flush>
        <SideBarItem
          name="Data Approval"
          icon={<FontAwesomeIcon icon={faClipboardList} />}
          link="#"
        />
        <SideBarItem
          name="Chat Log"
          icon={<FontAwesomeIcon icon={faComments} />}
          link="#"
        />
        <SideBarItem
          name="Knowledge Data"
          icon={<FontAwesomeIcon icon={faBook} />}
          link="#"
        />
        <SideBarItem
          name="Document Reference"
          icon={<FontAwesomeIcon icon={faFileAlt} />}
          link="#"
        />
        <SideBarItem
          name="Reports"
          icon={<FontAwesomeIcon icon={faNewspaper} />}
          link="#"
        />
      </ListGroup>
    );
  }
};

const SideBarContent = () => {
  return (
    <div className="sidebar">
      <div className="align-center">
        <h2 className="sidebar-item">Profile</h2>
      </div>
      {switchLayout(ROLE_CONTRIBUTOR)}
    </div>
  );
};

export default SideBarContent;
