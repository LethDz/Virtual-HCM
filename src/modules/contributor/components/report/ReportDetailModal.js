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
  Badge,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import { GET_PENDING_REPORT, REJECT_REPORT } from 'src/constants';
import { handleInputChange } from 'src/common/handleInputChange';
import { connect } from 'react-redux';
import {
  rejectReport,
  getAllPendingReport,
  SelectKnowledgeData,
} from 'src/modules/contributor';
import 'src/static/stylesheets/report.detail.css';
import { reportType } from 'src/modules/contributor';

class ReportDetailModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      report: {},
      processor_note: '',
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
      reject: false,
      knowledge_data_id: 0,
      selectedIntent: '',
      openModal: false,
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
    const reason = this.state.processor_note.trim();
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
            this.props.rejectReport(report_id);
            this.props.updateReportList && this.props.updateReportList([]);
            this.setSuccessAlert(true);
          } else {
            this.setErrorAlert(true);
            this.setErrorList(response.data.messages);
          }
          this.setLoading(false);
        })
        .then(() => {
          this.props.updateReportList &&
            this.props.updateReportList(this.props.reportList);
          this.toggle();
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

  onSelectedChange = (event) => {
    const index = event.nativeEvent.target.selectedIndex;
    const id = event.nativeEvent.target[index].getAttribute('id');
    const intent = event.target.value;
    this.setState({
      knowledge_data_id: id,
      selectedIntent: intent,
    });
  };

  toggle = () => {
    !this.state.loading && this.props.toggle();
  };

  setOpenModal = (status) => {
    this._isMounted &&
      this.setState({
        openModal: status,
      });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        unmountOnClose={true}
        size='lg'
      >
        <ModalHeader toggle={this.toggle}>
          Report ID: {this.state.report.id}
        </ModalHeader>
        <Form>
          <ModalBody className='report-container'>
            <LoadingSpinner
              loading={this.state.loading}
              text={'Loading'}
              type='MODAL'
            />
            {this.state.successAlert && (
              <SuccessAlert
                successAlert={this.state.successAlert}
                text='Rejected successfully'
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
            <Row className='custom-border'>
              <Col className='col-4 font-weight-bold'>Report type: </Col>
              <Col className='col-8'>
                <h5>
                  <Badge
                    color={`${
                      reportType[this.state.report.report_type] ===
                      reportType[1]
                        ? 'danger'
                        : 'primary'
                    }`}
                  >
                    {reportType[this.state.report.report_type]}
                  </Badge>
                </h5>
              </Col>
            </Row>
            <Row className='custom-border'>
              <Col className='col-4 font-weight-bold'>Reporter:</Col>
              <Col className='col-8'>{this.state.report.reporter}</Col>
            </Row>
            <Row className='custom-border'>
              <Col className='col-4 font-weight-bold'>Reporter note:</Col>
              <Col className='col-8'>{this.state.report.reporter_note}</Col>
            </Row>
            <Row className='custom-border'>
              <Col className='col-4 font-weight-bold'>Reported Intent:</Col>
              <Col className='col-8'>
                {this.state.report.reported_intent && (
                  <h5>
                    <Badge color='success'>
                      {this.state.report.reported_intent}
                    </Badge>
                  </h5>
                )}
              </Col>
            </Row>
            <Row className='custom-border'>
              <Col className='col-4 font-weight-bold'>Report Data:</Col>
              <Col className='col-8 text-break'>
                {this.state.report.report_data}
              </Col>
            </Row>
            <Row className='custom-border'>
              <Col className='col-4 font-weight-bold'>Bot version date:</Col>
              <Col className='col-8'>{this.state.report.bot_version_date}</Col>
            </Row>
            <Row className='custom-border'>
              <Col className='col-4 font-weight-bold'>Created date:</Col>
              <Col className='col-8'>{this.state.report.cdate}</Col>
            </Row>
            {this.state.report.report_type === 1 && (
              <div>
                <Row className='custom-border'>
                  <Col className='col-4 font-weight-bold'>Question: </Col>
                  <Col className='col-8 message'>
                    {this.state.report.question}
                  </Col>
                </Row>
                <Row className='custom-border'>
                  <Col className='col-4 font-weight-bold'>Bot answer: </Col>
                  <Col className='col-8 message'>
                    {this.state.report.bot_answer}
                  </Col>
                </Row>
              </div>
            )}
            {this.state.reject && (
              <Row className='custom-border'>
                <Col>
                  <FormGroup>
                    <Label className='font-weight-bold'>Processor note: </Label>
                    <Input
                      name='processor_note'
                      type='textarea'
                      value={this.state.processor_note}
                      onChange={this.handleInput}
                      autoFocus
                      placeholder='Please enter the reason why you want to reject...'
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            <Label className='font-weight-bold mb-3'>
              Available knowledge data:{' '}
            </Label>
            <SelectKnowledgeData
              toggleDetailModal={this.toggle}
              report={this.state.report}
              availableIntents={this.state.report.available_knowledge_data}
              otherIntents={this.state.report.other_knowledge_data}
              addToast={this.props.setToast}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              disabled={
                this.state.loading ||
                (this.state.reject && this.state.processor_note.trim() === '')
              }
              onClick={this.rejectReport}
            >
              <FontAwesomeIcon icon={faBan} color='white' />
              &nbsp;Reject
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  reportList: getAllPendingReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  rejectReport: (reportDetail) => dispatch(rejectReport(reportDetail)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailModal);
