import React from "react";
import { ListGroup } from "reactstrap";
import SideBarItem from "src/layouts/SideBarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFileAlt,
  faNewspaper,
  faClipboardList,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const SideBarContributorContent = () => {
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
};

export default SideBarContributorContent;
