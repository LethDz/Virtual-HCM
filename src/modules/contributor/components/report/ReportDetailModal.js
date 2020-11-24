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
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import {
  REJECT_REPORT,
  CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM,
} from 'src/constants';
import { handleInputChange } from 'src/common/handleInputChange';
import { connect } from 'react-redux';
import {
  getAllReport,
  pullReportDetail,
  getReportDetail,
  changeReportStatus,
} from 'src/modules/contributor';

class ReportDetailModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      report_id: '',
      type: '',
      report_data: '',
      status: '',
      reject_reason: '',
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
      reject: false,
    };
  }

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
    const reason = this.state.reject_reason.trim();
    if (reason) {
      this.setLoading(true);
      axiosClient
        .post(REJECT_REPORT, {
          report_id: this.state.report_id,
          reject_reason: reason,
        })
        .then((response) => {
          if (response.data.status) {
            const report = response.data.result_data;
            this.props.changeReportStatus(report);
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

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        unmountOnClose={true}
      >
        <ModalHeader toggle={this.toggle}>Report</ModalHeader>
        <Form>
          <ModalBody>
            <LoadingSpinner loading={this.state.loading} text={'Loading'} />
            {this.state.successAlert && (
              <SuccessAlert
                successAlert={this.state.successAlert}
                text="Creating is successfully"
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
            <Label>
              <h5>ID: {this.state.report_id}</h5>
            </Label>
            <FormGroup>
              <Label>Report type: </Label>
              <Input
                name="reference_type"
                type="text"
                readOnly
                value={this.state.type}
              />
            </FormGroup>
            <FormGroup>
              <Label>Status: </Label>
              <Input
                name="status"
                type="text"
                readOnly
                value={this.state.status}
              />
            </FormGroup>
            <FormGroup>
              <Label>Detail: </Label>
              <Input
                name="report_data"
                type="textarea"
                readOnly
                value={this.state.report_data}
              />
            </FormGroup>
            {this.state.reject && (
              <FormGroup>
                <Label>Reason to reject: </Label>
                <Input
                  name="reject_reason"
                  type="textarea"
                  value={this.state.reject_reason}
                  onChange={this.handleInput}
                  autoFocus
                  placeholder="Please input the reason why you reject..."
                />
              </FormGroup>
            )}
          </ModalBody>
          <ModalFooter>
            <Link
              to={CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM}
              className="link-no-underline"
            >
              <Button
                color="primary"
                type="submit"
                disabled={this.state.loading}
              >
                <FontAwesomeIcon icon={faPlus} color="white" />
                &nbsp;Create data approval
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
  reportList: getAllReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeReportStatus: (reportDetail) =>
    dispatch(changeReportStatus(reportDetail)),
  pullReportDetail: (report) => dispatch(pullReportDetail(report)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailModal);
