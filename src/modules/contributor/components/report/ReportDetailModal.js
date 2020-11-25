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
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import {
  GET_PENDING_REPORT,
  CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM,
  REJECT_REPORT,
  CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA,
} from 'src/constants';
import { handleInputChange } from 'src/common/handleInputChange';
import { connect } from 'react-redux';
import {
  pullReportDetail,
  getReportDetail,
  rejectReport,
  approveReport,
} from 'src/modules/contributor';
import { getNewApprovalReport } from '../../contributor.selectors';

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
    const report_id = this.state.report.report_id;
    if (reason) {
      this.setLoading(true);
      axiosClient
        .post(REJECT_REPORT, {
          report_id: report_id,
          reporter_note: reason,
        })
        .then((response) => {
          if (response.data.status) {
            const report = response.data.result_data;
            this.props.rejectReport(report);
            this.setState({
              ...report,
            });
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
    const knowledge_data_id = this.state.knowledge_data_id;
    const approvalDetail = {
      report: approvalReport,
      knowledge_data_id: knowledge_data_id,
    };
    this.props.approvalReport(approvalDetail);
  };

  onSelectedChange = (event) => {
    console.log(this.state.knowledge_data_id);
    this.setState({
      knowledge_data_id: event.target.value,
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
                <Input
                  name="report_type"
                  type="text"
                  value={
                    this.state.report.report_type === 1
                      ? 'Wrong answer'
                      : 'Contribute data'
                  }
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="col-3">Reporter:</Col>
              <Col className="col-9">
                <Input
                  name="status"
                  type="text"
                  value={this.state.report.reporter}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="col-3">Reported Intent:</Col>
              <Col className="col-9">
                <Input
                  name="reported_intent"
                  type="text"
                  value={this.state.report.reported_intent}
                />
              </Col>
            </Row>
            <FormGroup>
              <Label>Question: </Label>
              <Input
                name="question"
                type="textarea"
                readOnly
                value={this.state.report.question}
              />
            </FormGroup>
            <FormGroup>
              <Label>Bot answer: </Label>
              <Input
                name="answer"
                type="textarea"
                readOnly
                value={this.state.report.bot_answer}
              />
            </FormGroup>
            <FormGroup>
              <Label>Bot version date: </Label>
              <Input
                name="version"
                type="text"
                readOnly
                value={this.state.report.bot_version_date}
              />
            </FormGroup>
            <FormGroup>
              <Label>Created date: </Label>
              <Input
                name="c_date"
                type="text"
                readOnly
                value={this.state.report.cdate}
              />
            </FormGroup>
            <FormGroup>
              <Label for="knowledge_data_availability">Select</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={this.onSelectedChange.bind(this)}
              >
                <option value={0}>Create new knowledge data</option>
                {this.state.report.available_knowledge_data &&
                  this.state.report.available_knowledge_data.map(
                    (knowledge_data) => (
                      <option value={knowledge_data.id}>
                        {knowledge_data.intent_fullname}
                      </option>
                    )
                  )}
              </Input>
            </FormGroup>
            {this.state.reject && (
              <FormGroup>
                <Label>Reporter note: </Label>
                <Input
                  name="reporter_note"
                  type="textarea"
                  value={this.state.reporter_note}
                  onChange={this.handleInput}
                  autoFocus
                  placeholder="Please input the reason why you reject..."
                />
              </FormGroup>
            )}
          </ModalBody>
          <ModalFooter>
            <Link
              to={
                this.state.knowledge_data_id === 0
                  ? CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM
                  : CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA
              }
              className="link-no-underline"
            >
              <Button
                color="primary"
                type="submit"
                disabled={this.state.loading}
                onClick={this.approveReport}
              >
                <FontAwesomeIcon icon={faPlus} color="white" />
                &nbsp;To Knowledge Data Process
              </Button>
            </Link>
            <Button
              color="danger"
              disabled={this.state.loading}
              onClick={this.rejectReport}
            >
              <FontAwesomeIcon icon={faMinus} color="white" />
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
  newApprovalReport: getNewApprovalReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  rejectReport: (reportDetail) => dispatch(rejectReport(reportDetail)),
  approveReport: (approvalDetail) => dispatch(approveReport(approvalDetail)),
  pullReportDetail: (report) => dispatch(pullReportDetail(report)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailModal);
