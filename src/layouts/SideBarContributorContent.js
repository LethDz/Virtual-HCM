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
          link="data-approval"
        />
        <SideBarItem
          name="Chat Log"
          icon={<FontAwesomeIcon icon={faComments} />}
          link="chat-log"
        />
        <SideBarItem
          name="Knowledge Data"
          icon={<FontAwesomeIcon icon={faBook} />}
          link="knowledge-data"
        />
        <SideBarItem
          name="Document Reference"
          icon={<FontAwesomeIcon icon={faFileAlt} />}
          link="document-reference"
        />
        <SideBarItem
          name="Reports"
          icon={<FontAwesomeIcon icon={faNewspaper} />}
          link="reports"
        />
      </ListGroup>
  );
};

export default SideBarContributorContent;
