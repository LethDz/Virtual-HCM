import React, { Fragment, useState } from 'react';
import 'src/static/stylesheets/sideBar.css';
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'src/common/authorizationChecking';
import { ChangePassword } from 'src/modules/user';
import { NotificationButton } from 'src/modules/report-notification';

const Header = () => {
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <Fragment>
      <Navbar className="d-flex justify-content-end navbar" expand="md">
        <Nav className="ml-auto" navbar>
          <NotificationButton />
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="navbar-font" nav caret>
              <FontAwesomeIcon icon={faCog} /> Setting
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => setOpenChangePassword(true)}>
                <FontAwesomeIcon icon={faKey} /> Change password
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={signOut}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      {openChangePassword && (
        <ChangePassword
          openChangePassword={openChangePassword}
          setOpenChangePassword={setOpenChangePassword}
        />
      )}
    </Fragment>
  );
};

export default Header;
