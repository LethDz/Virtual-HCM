import React, { Component } from 'react';
import {
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import { GET_ACCEPTED_REPORT } from 'src/constants';
import { ReportType } from 'src/modules/contributor';

class ReportDetailModalRejected extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      report: {},
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.initiateData();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  initiateData = () => {
    this.setLoading(true);
    axiosClient
      .get(GET_ACCEPTED_REPORT(this.props.id))
      .then((response) => {
        if (response.data.status) {
          const report = response.data.result_data;
          this.setState({
            report: report,
          });
        } else {
          this.setErrorAlert(true);
        }
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
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

  toggle = () => {
    !this.state.loading && this.props.toggle();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        unmountOnClose={true}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>
          Report ID: {this.state.report.id}
        </ModalHeader>
        <ModalBody>
          <LoadingSpinner loading={this.state.loading} text={'Loading'} />
          {this.state.successAlert && (
            <SuccessAlert
              successAlert={this.state.successAlert}
              text="Rejecting is successfully"
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
            <Col className="col-3">Report type: </Col>
            <Col className="col-9">
              <ReportType value={this.state.report.report_type} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Reporter:</Col>
            <Col className="col-9">{this.state.report.reporter}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Reporter Note:</Col>
            <Col className="col-9">{this.state.report.reporter_note}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Reported Intent:</Col>
            <Col className="col-9">{this.state.report.reported_intent}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Report Data:</Col>
            <Col className="col-9">{this.state.report.report_data}</Col>
          </Row>
          <Row className="mt-3">
            <Label>Question: </Label>
            <Input
              name="question"
              type="textarea"
              readOnly
              value={this.state.report.question}
            />
          </Row>
          <Row>
            <Label>Bot answer: </Label>
            <Input
              name="answer"
              type="textarea"
              readOnly
              value={this.state.report.bot_answer}
            />
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Bot version date:</Col>
            <Col className="col-9">{this.state.report.bot_version_date}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Processor:</Col>
            <Col className="col-9">{this.state.report.processor}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Processor Note:</Col>
            <Col className="col-9">{this.state.report.processor_note}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Forward Intent Name:</Col>
            <Col className="col-9">{this.state.report.forward_intent_name}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-3">Modified date:</Col>
            <Col className="col-9">{this.state.report.mdate}</Col>
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    );
  }
}

export default ReportDetailModalRejected;
