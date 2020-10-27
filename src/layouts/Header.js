import React from 'react';
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
import { connect } from 'react-redux';
import { LOGOUT } from 'src/constants';

const resetAllRedux = () => ({
  type: LOGOUT,
});

const Header = (props) => {
  return (
    <Navbar className="d-flex justify-content-end navbar" expand="md">
      <div>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="navbar-font" nav caret>
              <FontAwesomeIcon icon={faCog} /> Setting
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="#pass">
                <FontAwesomeIcon icon={faKey} /> Change password
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => signOut(props.resetAllRedux)}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Signout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetAllRedux: () => dispatch(resetAllRedux()),
});

export default connect(null, mapDispatchToProps)(Header);
