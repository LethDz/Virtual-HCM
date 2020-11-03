import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const BackButton = (props) => {
  return (
    <Link to={props.link}>
      <Button color="success">
        <FontAwesomeIcon icon={faDoorOpen} color="white"/>
        &nbsp;
        {props.text}
      </Button>
    </Link>
  );
};

export default BackButton;
