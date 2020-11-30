import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Badge } from 'reactstrap';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { ACCEPT, DECLINE, DRAFT } from 'src/modules/contributor/index';
import { UserLink } from 'src/common/UserLink';

export default class ViewDetailReviewModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: false,
      successAlert: false,
      errorAlert: false,
      alertMessage: '',
      data: null,
    };
  }

  setSuccessAlert = (status) => {
    this._isMounted &&
      this.setState({
        successAlert: status,
      });
  };

  setAlertMessage = (message) => {
    this._isMounted &&
      this.setState({
        alertMessage: message,
      });
  };

  setErrorAlert = (status) => {
    this._isMounted &&
      this.setState({
        errorAlert: status,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.setState({ data: this.props.data });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  setLoading = (status) => {
    this._isMounted && this.setState({ loading: status });
  };

  onGridReady = async (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  toggleThisModal = () => {
    this.props.toggle();
  };

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  onFirstDataRendered = () => {
    this.sizeToFit();
  };

  returnStatusBadge = () => {
    const className = '';
    switch (this.state.data.status) {
      case ACCEPT:
        return (
          <h5>
            <Badge className={className} color="success" pill>
              Accept
            </Badge>
          </h5>
        );
      case DECLINE:
        return (
          <h5>
            <Badge className={className} color="danger" pill>
              Decline
            </Badge>
          </h5>
        );
      case DRAFT:
        return (
          <h5>
            <Badge className={className} color="warning" pill>
              Draft
            </Badge>
          </h5>
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  render() {
    if (this.state.data) {
      return (
        <Modal
          size="lg"
          isOpen={this.props.isOpen}
          toggle={this.toggleThisModal}
        >
          <LoadingSpinner
            type="MODAL"
            text="Loading reviews"
            loading={this.state.loading}
          />
          <ModalHeader toggle={this.toggleThisModal}>Review detail</ModalHeader>
          <ModalBody className="min-height-400 report-container">
            {this.state.successAlert && (
              <SuccessAlert
                successAlert={this.state.successAlert}
                text={this.state.alertMessage}
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
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Review type:</Col>
              <Col className="col-9 text-break">{this.returnStatusBadge()}</Col>
            </Row>
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Reporter user:</Col>
              <Col className="col-9 text-break">
                <UserLink
                  data={{ ...this.state.data, user: this.state.data }}
                  value={this.state.data.username}
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-3 font-weight-bold">Review:</Col>
              <Col className="col-9">{this.state.data.review}</Col>
            </Row>
          </ModalBody>
        </Modal>
      );
    } else return '';
  }
}
