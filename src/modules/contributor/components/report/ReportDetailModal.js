import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import {
  GET_PENDING_REPORT,
  CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM,
  REJECT_REPORT,
  GET_KNOWLEDGE_DATA_BY_INTENT,
} from 'src/constants';
import { handleInputChange } from 'src/common/handleInputChange';
import { connect } from 'react-redux';
import {
  pullReportDetail,
  getReportDetail,
  rejectReport,
  approveReport,
  getAllPendingReport,
} from 'src/modules/contributor';
import 'src/static/stylesheets/report.detail.css';

class ReportDetailModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      report: {},
      reporter_note: '',
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
      reject: false,
      knowledge_data_id: 0,
      selectedIntent: '',
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
      .get(GET_PENDING_REPORT(this.props.id))
      .then((response) => {
        if (response.data.status) {
          const report = response.data.result_data;
          this.props.pullReportDetail(report);
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

  handleInput = (event) => handleInputChange(event, this);

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

  rejectReport = () => {
    const reason = this.state.reporter_note.trim();
    const report_id = this.state.report.id;
    if (reason) {
      this.setLoading(true);
      axiosClient
        .post(REJECT_REPORT, {
          id: report_id,
          processor_note: reason,
        })
        .then((response) => {
          if (response.data.status) {
            const report = response.data.result_data;
            this.props.rejectReport(report);
            this.props.updateReportList([]);
            this.setSuccessAlert(true);
          } else {
            this.setErrorAlert(true);
            this.setErrorList(response.data.messages);
          }
          this.setLoading(false);
        })
        .then(() => {
          this.props.updateReportList(this.props.reportList);
        })
        .catch(() => {
          this.setLoading(false);
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
        });
    } else {
      this.setState({
        reject: true,
      });
    }
  };

  approveReport = () => {
    const approvalReport = this.state.report;
    const id = this.state.knowledge_data_id;
    const approvalDetail = {
      report: approvalReport,
      knowledge_data_id: id,
    };
    this.props.approveReport(approvalDetail);
  };

  onSelectedChange = (event) => {
    const index = event.nativeEvent.target.selectedIndex;
    const id = event.nativeEvent.target[index].getAttribute('id');
    const intent = event.target.value
    this.setState({
      knowledge_data_id: id,
      selectedIntent: intent,
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
        <Form>
          <ModalBody className="report-container">
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
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Report type: </Col>
              <Col className="col-9">
                {this.state.report.report_type === 1
                  ? 'Wrong answer'
                  : 'Contribute data'}
              </Col>
            </Row>
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Reporter:</Col>
              <Col className="col-9">{this.state.report.reporter}</Col>
            </Row>
            {this.state.report.reported_intent && (
              <Row className="custom-border">
                <Col className="col-3 font-weight-bold">Reported Intent:</Col>
                <Col className="col-9">
                  <span className="intent">
                    {this.state.report.reported_intent}
                  </span>
                </Col>
              </Row>
            )}
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Bot version date:</Col>
              <Col className="col-9">{this.state.report.bot_version_date}</Col>
            </Row>
            <Row className="custom-border">
              <Col className="col-3 font-weight-bold">Created date:</Col>
              <Col className="col-9">{this.state.report.cdate}</Col>
            </Row>
            <FormGroup className="mt-3">
              <Label className="font-weight-bold">Question: </Label>
              <div className="message">{this.state.report.question}</div>
            </FormGroup>
            <FormGroup>
              <Label className="font-weight-bold">Bot answer: </Label>
              <div className="message">{this.state.report.bot_answer}</div>
            </FormGroup>
            <FormGroup>
              <Label
                for="knowledge_data_availability"
                className="font-weight-bold"
              >
                Select knowledge data:
              </Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={this.onSelectedChange.bind(this)}
              >
                <option value={0} id={0}>Create new knowledge data</option>
                {this.state.report.available_knowledge_data &&
                  this.state.report.available_knowledge_data.map(
                    (knowledge_data) => (
                      <option
                        id={knowledge_data.id}
                        value={knowledge_data.intent}
                        key={knowledge_data.id}
                      >
                        {knowledge_data.intent_fullname}
                      </option>
                    )
                  )}
              </Input>
            </FormGroup>
            {this.state.reject && (
              <FormGroup>
                <Label className="font-weight-bold">Reporter note: </Label>
                <Input
                  name="reporter_note"
                  type="textarea"
                  value={this.state.reporter_note}
                  onChange={this.handleInput}
                  autoFocus
                  placeholder="Please input the reason why you want to reject..."
                />
              </FormGroup>
            )}
          </ModalBody>
          <ModalFooter>
            <Link
              to={
                this.state.knowledge_data_id === 0
                  ? CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM
                  : GET_KNOWLEDGE_DATA_BY_INTENT(this.state.selectedIntent)
              }
              className="link-no-underline"
            >
              <Button
                color="primary"
                type="submit"
                disabled={this.state.loading}
                onClick={this.approveReport}
              >
                <FontAwesomeIcon icon={faCheck} color="white" />
                &nbsp;To Knowledge Data Process
              </Button>
            </Link>
            <Button
              color="danger"
              disabled={this.state.loading}
              onClick={this.rejectReport}
            >
              <FontAwesomeIcon icon={faBan} color="white" />
              &nbsp;Reject
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  reportDetail: getReportDetail(state),
  reportList: getAllPendingReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  rejectReport: (reportDetail) => dispatch(rejectReport(reportDetail)),
  approveReport: (approvalReportDetail) =>
    dispatch(approveReport(approvalReportDetail)),
  pullReportDetail: (report) => dispatch(pullReportDetail(report)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailModal);
