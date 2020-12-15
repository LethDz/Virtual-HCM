import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { NOTIFICATION_PAGE } from 'src/constants';
import { getUnseenReport } from 'src/modules/report-notification';

const ReportDashboard = (props) => {
  return (
    <Col className="p-3">
      <Link to={NOTIFICATION_PAGE} className="link-no-underline">
        <div className="info-box font-sm bg-aqua text-light">
          <span className="info-box-icon">
            <FontAwesomeIcon icon={faEyeSlash} className="icon" color="white" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Unread Report Notifications</span>
            <span className="info-box-number">
              {props.unseenReport}&nbsp;
              {props.unseenReport > 1 ? 'Reports' : 'Report'}
            </span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  unseenReport: getUnseenReport(state),
});

export default connect(mapStateToProps)(ReportDashboard);
