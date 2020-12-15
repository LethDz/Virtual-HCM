import {
  faCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, ListGroupItem, Row } from 'reactstrap';
import { calculateTheDifferent } from 'src/common/getDate';
import { UserLink } from 'src/common/UserLink';
import { GET_KNOWLEDGE_DATA_BY_INTENT } from 'src/constants';

const NotificationItem = (props) => {
  return (
    <ListGroupItem
      className={`${
        !props.noti.user_seen ? 'list-group-default' : 'list-group-seen'
      } d-flex`}
    >
      <Row className="w-100">
        <Col xs="auto" className="p-1">
          <FontAwesomeIcon
            icon={faCircle}
            style={{
              color: '#0366D6',
              height: '10px',
              width: '10px',
              marginTop: '4px',
              visibility: props.noti.user_seen ? 'hidden' : 'visible',
            }}
          />
        </Col>
        <Col xs="auto">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            color="#FFC107"
            style={{
              width: '20px',
              height: '17.5px',
              marginTop: '4px',
            }}
          />
        </Col>
        <Col className="p-0 ml-2">
          <Row>
            <Col className="p-0">
              <p className="m-0">
                {
                  <em>
                    <UserLink
                      data={props.noti}
                      colDef={{ field: 'report_user' }}
                      value={props.noti.report_username}
                    />
                  </em>
                }
                's report:{' '}
                <span className="text-muted">
                  <em>"{props.noti.report_comment}"</em>
                </span>{' '}
                <span className="blockquote-footer font-sm">
                  to knowledge data:{' '}
                  <Link to={GET_KNOWLEDGE_DATA_BY_INTENT(props.noti.intent)}>
                    {props.noti.intent_fullname}
                  </Link>
                </span>
              </p>
            </Col>
            <Col className="p-0" xs="auto">
              <span className="float-right">
                Created {calculateTheDifferent(props.noti.cdate)}
                {calculateTheDifferent(props.noti.cdate) > 1
                  ? ' days ago'
                  : ' day ago'}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default NotificationItem;
