import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { GET_UNSEEN_REPORT, NOTIFICATION_PAGE } from 'src/constants';
import {
  getUnseenReport,
  pullUnseenReport,
} from 'src/modules/report-notification';

class NotificationButton extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    axiosClient.get(GET_UNSEEN_REPORT).then((response) => {
      if (response?.data?.status) {
        this.props.pullUnseenReport(
          response?.data?.result_data?.unseen_report_count
        );
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <li className="nav-item mr-2">
        <Link to={NOTIFICATION_PAGE} className="h-100 d-flex notification">
          <Button className="button-notification" color="dark">
            <FontAwesomeIcon icon={faBell} />
          </Button>
          <span
            className={`number-of-unseen btn-${
              this.props.unseenReport === 0 ? 'success' : 'warning'
            }`}
          >
            {this.props.unseenReport}
          </span>
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  unseenReport: getUnseenReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullUnseenReport: (numberOfUnseen) =>
    dispatch(pullUnseenReport(numberOfUnseen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationButton);
