import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';

const SettingComponent = (props) => {
  return (
    <Fragment>
      <Row className="m-2">
        <Col className="mt-2 border-bottom p-0">
          <h6 className="text-primary">{props.setting_name}</h6>
        </Col>
      </Row>
      <Row className="ml-2 mr-2">
        <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
          <FontAwesomeIcon icon={faQuestionCircle} />
          &nbsp;
          {props.description}
        </Col>
      </Row>
      <Row
        className={`ml-2 mr-2 mt-3 ${
          props.hidden ? 'mb-5' : 'mb-3'
        } align-items-center`}
      >
        <Col xs="auto" className="p-0">
          {props.children}
        </Col>
      </Row>
      {!props.hidden && (
        <Row className="ml-2 mr-2 mb-5">
          <Col xs="auto" className="font-sm p-0">
            <span className="font-weight-bold">
              Current {props.valueName}:{' '}
            </span>
            <span className="text-info text-truncate" title={props.value}>
              {props.value && props.value !== ''
                ? props.value
                : props.default
                ? props.default
                : 'None'}
            </span>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default SettingComponent;
