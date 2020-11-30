import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import axiosClient from 'src/common/axiosClient';
import { GET_REJECTED_REPORT } from 'src/constants';
import { DetailModalViewOnly } from 'src/modules/contributor';

class ReportDetailModalRejected extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      report: {},
      loading: false,
      errorAlert: false,
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
      .get(GET_REJECTED_REPORT(this.props.id))
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
        <Form>
          <ModalBody className="report-container">
            <LoadingSpinner loading={this.state.loading} text={'Loading'} type="MODAL" />
            {this.state.errorAlert && (
              <ErrorAlert
                errorAlert={this.state.errorAlert}
                errorList={this.state.errorList}
                onDismiss={() => this.onDismiss('errorAlert')}
              />
            )}
            <DetailModalViewOnly report={this.state.report} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default ReportDetailModalRejected;
