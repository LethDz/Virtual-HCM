import React from "react";
import "src/static/stylesheets/sideBar.css";
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import BarIcon from "src/static/icons/barIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faKey, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  return (
    <Navbar className="d-flex justify-content-between navbar" expand="md">
      <div
        className="icon-bar align-center"
        onClick={() => props.toggleSideBar(true)}
      >
        {BarIcon}
      </div>
      <div>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="navbar-font" nav caret>
                <FontAwesomeIcon icon={faCog} /> Setting
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="#pass">
                  <FontAwesomeIcon icon={faKey} /> Change password
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#signout">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Signout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
