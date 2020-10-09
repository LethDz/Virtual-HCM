import React from 'react';
import {
  Nav,
  Navbar
} from "reactstrap";

const Footer = () => {
  return (
      <Navbar className="navbar footer" expand="md">
        <div>
          <Nav className="mr-auto" navbar>
            FOOTER
          </Nav>
        </div>
      </Navbar>
  );
}

export default Footer;
