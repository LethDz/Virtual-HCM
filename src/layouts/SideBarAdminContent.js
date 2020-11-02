import React from 'react';
import { ListGroup } from 'reactstrap';
import SideBarItem from 'src/layouts/SideBarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faServer,
  faCogs,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ADMIN_CONTRIBUTOR_LIST_PAGE, ADMIN_PAGE } from 'src/constants';

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
        name="Manage Training Process"
        icon={<FontAwesomeIcon icon={faServer} />}
        link="manage-training-process"
      />
      <SideBarItem
        name="Configure System"
        icon={<FontAwesomeIcon icon={faCogs} />}
        link="configure-system"
      />
    </ListGroup>
  );
};

export default SideBarAdminContent;
