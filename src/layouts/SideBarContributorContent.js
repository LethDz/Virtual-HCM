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

import {CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL, REFERENCE_LIST_PAGE} from "src/constants";

const SideBarContributorContent = () => {
  const location = window.location.pathname;
  return (
    <ListGroup flush>
      <SideBarItem
        name="Data Approval"
        icon={<FontAwesomeIcon icon={faClipboardList} />}
        link={CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL}
        active={location.includes(CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL)}
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
        link={REFERENCE_LIST_PAGE}
        active={location.includes(REFERENCE_LIST_PAGE)}
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
