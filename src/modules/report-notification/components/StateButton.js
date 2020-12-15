import { faEye, faEyeSlash, faInbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Button, ButtonGroup } from 'reactstrap';
import { notiState } from 'src/modules/report-notification';

const StateButton = (props) => {
  const generateIcon = (status) => {
    switch (status) {
      case notiState.All:
        return faInbox;
      case notiState.Read:
        return faEye;
      case notiState.Unread:
        return faEyeSlash;
      default:
        break;
    }
  };

  return (
    <ButtonGroup className="w-100">
      {Object.keys(notiState).map((element, index) => {
        return (
          <Button
            key={element + index}
            color={props.notiState === notiState[element] ? 'primary' : 'light'}
            className={`text-left font-weight-light ${
              props.notiState === notiState[element] && 'button-border-git'
            }`}
            onClick={() => props.switchList(notiState[element])}
          >
            <FontAwesomeIcon icon={generateIcon(notiState[element])} />
            &nbsp; {element}
            <Badge className="float-right mt-1" color="light">
              {props[notiState[element]].length}
            </Badge>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default StateButton;
