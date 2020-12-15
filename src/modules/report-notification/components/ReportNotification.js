import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import { Button, Col, ListGroup, Row } from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { NOTIFICATION_PAGE, USER_GET_NOTIFICATION } from 'src/constants';
import 'src/static/stylesheets/report.notification.css';
import {
  NotificationEmpty,
  NotificationItem,
  notiState,
  StateButton,
  MAXIMUM_NOTIFICATION_PER_PAGE,
} from 'src/modules/report-notification';
import { history } from 'src/common/history';
import Pagination from 'react-js-pagination';

class ReportNotification extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      errorAlert: false,
      successAlert: false,
      errorList: [],
      all: [],
      read: [],
      unread: [],
      notiState: notiState.All,
      showNoti: [],
      activePage: 1,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  getData = () => {
    axiosClient
      .get(USER_GET_NOTIFICATION)
      .then(async (response) => {
        if (response?.data?.status) {
          await this.splitReadAndUnread(response.data.result_data);

          if (!this.props.list || this.props.list === notiState.All) {
            this.setNotiState(notiState.All);
            this.setShowNoti(this.state.activePage, notiState.All);
          }

          if (this.props.list && this.props.list === notiState.Read) {
            this.setNotiState(notiState.Read);
            this.setShowNoti(this.state.activePage, notiState.Read);
          }

          if (this.props.list && this.props.list === notiState.Unread) {
            this.setNotiState(notiState.Unread);
            this.setShowNoti(this.state.activePage, notiState.Unread);
          }
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response?.data?.messages);
        }
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
      });
  };

  refreshNoti = () => {
    this.setLoading(true);
    this.setErrorAlert(false);
    this.getData();
  };

  splitReadAndUnread = async (data) => {
    await data.sort((noti1, noti2) => {
      const date1 = new Date(noti1.cdate).getTime();
      const date2 = new Date(noti2.cdate).getTime();

      return date2 - date1;
    });

    let read = [];
    let unread = [];
    await data.map((element) => {
      if (element.user_seen) {
        read.push(element);
      } else {
        unread.push(element);
      }

      return null;
    });

    this.setSplitNotification(unread, read, data);
  };

  setSplitNotification = (listUnread, listRead, list) => {
    this._isMounted &&
      this.setState({
        unread: listUnread,
        read: listRead,
        all: list,
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  setSuccessAlert = (status) => {
    this._isMounted &&
      this.setState({
        successAlert: status,
      });
  };

  setErrorAlert = (status) => {
    this._isMounted &&
      this.setState({
        errorAlert: status,
      });
  };

  setErrorList = (list) => {
    this._isMounted &&
      this.setState({
        errorList: list,
      });
  };

  setNotiState = (state) => {
    this._isMounted &&
      this.setState({
        notiState: state,
      });
  };

  switchList = (notiState) => {
    this.setNotiState(notiState);
    history.push(`${NOTIFICATION_PAGE}?list=${notiState}`);
    this.handlePageChange(1, notiState);
  };

  handlePageChange = (pageNumber, listNoti) => {
    this.setShowNoti(pageNumber, listNoti);
    this._isMounted && this.setState({ activePage: pageNumber });
  };

  setShowNoti = (pageNumber, listNoti) => {
    let showNoti = [];
    for (let i = 0; i < MAXIMUM_NOTIFICATION_PER_PAGE; i++) {
      this.state[listNoti][
        (pageNumber - 1) * MAXIMUM_NOTIFICATION_PER_PAGE + i
      ] &&
        showNoti.push(
          this.state[listNoti][
            (pageNumber - 1) * MAXIMUM_NOTIFICATION_PER_PAGE + i
          ]
        );
    }
    this._isMounted && this.setState({ showNoti: showNoti });
  };

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text="Loading" />
        <div
          id="cl-container"
          className="cl-container container"
          ref={this.conRef}
        >
          {this.state.successAlert && (
            <SuccessAlert
              successAlert={this.state.successAlert}
              text="Request is successfully"
              onDismiss={() => this.onDismiss('successAlert')}
            />
          )}
          {this.state.errorAlert && (
            <ErrorAlert
              errorAlert={this.state.errorAlert}
              errorList={this.state.errorList}
              onDismiss={() => this.onDismiss('errorAlert')}
            />
          )}
          <Row>
            <Col className="justify-content-center d-flex">
              <h5 className="mt-2 mb-2">Report Notification</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="button" color="success" onClick={this.refreshNoti}>
                <FontAwesomeIcon icon={faSync} color="white" />
              </Button>
            </Col>
          </Row>
          <Row className="m-2 mt-4 mb-4 border-bottom">
            <Col xs="5" className="p-0 pb-3">
              <StateButton
                notiState={this.state.notiState}
                switchList={this.switchList}
                read={this.state.read}
                all={this.state.all}
                unread={this.state.unread}
              />
            </Col>
          </Row>
          <Row className="mt-4 mb-4 ml-2 mr-2">
            <Col className="p-0 font-sm">
              <ListGroup>
                {this.state.notiState === notiState.All &&
                  (this.state.all.length > 0 ? (
                    <Fragment>
                      {this.state.showNoti.length > 0 &&
                        this.state.showNoti.map((noti, index) => {
                          return (
                            <NotificationItem
                              key={index + notiState.All}
                              noti={noti}
                            />
                          );
                        })}
                      <div className="mt-3 d-flex justify-content-center">
                        <Pagination
                          activePage={this.state.activePage}
                          totalItemsCount={this.state.all.length}
                          itemsCountPerPage={MAXIMUM_NOTIFICATION_PER_PAGE}
                          onChange={(pageNumber) =>
                            this.handlePageChange(pageNumber, notiState.All)
                          }
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <NotificationEmpty />
                  ))}
                {this.state.notiState === notiState.Read &&
                  (this.state.read.length > 0 ? (
                    <Fragment>
                      {this.state.showNoti.length > 0 &&
                        this.state.showNoti.map((noti, index) => {
                          return (
                            <NotificationItem
                              key={index + notiState.Read}
                              noti={noti}
                            />
                          );
                        })}
                      <div className="mt-3 d-flex justify-content-center">
                        <Pagination
                          activePage={this.state.activePage}
                          totalItemsCount={this.state.read.length}
                          itemsCountPerPage={MAXIMUM_NOTIFICATION_PER_PAGE}
                          onChange={(pageNumber) =>
                            this.handlePageChange(pageNumber, notiState.Read)
                          }
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <NotificationEmpty />
                  ))}
                {this.state.notiState === notiState.Unread &&
                  (this.state.unread.length > 0 ? (
                    <Fragment>
                      {this.state.showNoti.length > 0 &&
                        this.state.showNoti.map((noti, index) => {
                          return (
                            <NotificationItem
                              key={index + notiState.Unread}
                              noti={noti}
                            />
                          );
                        })}
                      <div className="mt-3 d-flex justify-content-center">
                        <Pagination
                          activePage={this.state.activePage}
                          totalItemsCount={this.state.unread.length}
                          itemsCountPerPage={MAXIMUM_NOTIFICATION_PER_PAGE}
                          onChange={(pageNumber) =>
                            this.handlePageChange(pageNumber, notiState.Unread)
                          }
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <NotificationEmpty />
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default ReportNotification;
