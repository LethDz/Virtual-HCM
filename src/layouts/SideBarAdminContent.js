import React from 'react';
import { ListGroup } from 'reactstrap';
import SideBarItem from 'src/layouts/SideBarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faServer,
  faCogs,
  faTachometerAlt,
  faFileCode,
  faClipboardList,
  faComments,
  faFileAlt,
  faBookOpen,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import {
  ADMIN_CONFIGURE_SYSTEM_PAGE,
  ADMIN_CONTRIBUTOR_LIST_PAGE,
  ADMIN_MANAGE_TRAINING_PROCESS_PAGE,
  ADMIN_PAGE,
  ADMIN_TRAIN_DATA_PAGE,
  CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA,
  REFERENCE_LIST_PAGE,
  SYNONYM_LIST_PAGE,
} from 'src/constants';

const SideBarAdminContent = () => {
  const location = window.location.pathname;
  return (
    <ListGroup flush>
      <SideBarItem
        name="Dashboard"
        icon={<FontAwesomeIcon icon={faTachometerAlt} />}
        link={ADMIN_PAGE}
        active={location === ADMIN_PAGE}
      />
      <SideBarItem
        name="Accounts"
        icon={<FontAwesomeIcon icon={faUserCircle} />}
        link={ADMIN_CONTRIBUTOR_LIST_PAGE}
        active={location.includes(ADMIN_CONTRIBUTOR_LIST_PAGE)}
      />
      <SideBarItem
        name="Train Data"
        icon={<FontAwesomeIcon icon={faFileCode} />}
        link={ADMIN_TRAIN_DATA_PAGE}
        active={location.includes(ADMIN_TRAIN_DATA_PAGE)}
      />
      <SideBarItem
        name="Manage Training Process"
        icon={<FontAwesomeIcon icon={faServer} />}
        link={ADMIN_MANAGE_TRAINING_PROCESS_PAGE}
        active={location.includes(ADMIN_MANAGE_TRAINING_PROCESS_PAGE)}
      />
      <SideBarItem
        name="Configure System"
        icon={<FontAwesomeIcon icon={faCogs} />}
        link={ADMIN_CONFIGURE_SYSTEM_PAGE}
        active={location.includes(ADMIN_CONFIGURE_SYSTEM_PAGE)}
      />
      <SideBarItem
        name="Knowledge Data"
        icon={<FontAwesomeIcon icon={faClipboardList} />}
        link={CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA}
        active={location.includes(CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA)}
      />
      <SideBarItem
        name="Chat Log"
        icon={<FontAwesomeIcon icon={faComments} />}
        link="chat-log"
      />
      <SideBarItem
        name="Document Reference"
        icon={<FontAwesomeIcon icon={faBookOpen} />}
        link={REFERENCE_LIST_PAGE}
        active={location.includes(REFERENCE_LIST_PAGE)}
      />
      <SideBarItem
        name="Synonym"
        icon={<FontAwesomeIcon icon={faFileAlt} />}
        link={SYNONYM_LIST_PAGE}
        active={location.includes(SYNONYM_LIST_PAGE)}
      />
      <SideBarItem
        name="Reports"
        icon={<FontAwesomeIcon icon={faNewspaper} />}
        link="reports"
      />
    </ListGroup>
  );
};

export default SideBarAdminContent;
