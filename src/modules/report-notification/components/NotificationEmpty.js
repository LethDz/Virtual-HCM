import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ListGroupItem, Row } from 'reactstrap';
import emptyBox from 'src/static/images/empty-box.png';

const NotificationEmpty = () => {
  return (
    <ListGroupItem className="d-flex-column">
      <Row className="w-100 mt-5 justify-content-center">
        <img src={emptyBox} alt="empty-box"></img>
      </Row>
      <Row className="w-100 mt-2 justify-content-center">
        <h5>
          Empty! <FontAwesomeIcon icon={faGrinBeamSweat} />
        </h5>
      </Row>
      <Row className="w-100 mt-1 mb-5 justify-content-center">
        <p>Take a break, do what you do best.</p>
      </Row>
    </ListGroupItem>
  );
};

export default NotificationEmpty;
