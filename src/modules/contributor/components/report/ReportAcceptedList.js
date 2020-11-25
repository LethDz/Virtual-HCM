import React, { Component, Fragment } from 'react';
import { GET_ALL_ACCEPTED_REPORT } from 'src/constants';
import { columnAcceptedReportFieldDef } from 'src/modules/contributor';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import {
  getAllAcceptedReport,
  pullAllAcceptedReport,
} from 'src/modules/contributor';

class ReportAcceptedList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      acceptedReportList: [],
      modalReportDetail: false,
      containerHeight: 0,
      containerWidth: 0,
      loading: false,
      selectedId: '',
      errorAlert: false,
      successAlert: false,
      errorList: [],
    };

    this.conRef = React.createRef();
  }

  setRowData = async () => {
    this._isMounted && this.setState({ loading: true });
    axiosClient
      .get(GET_ALL_ACCEPTED_REPORT)
      .then((response) => {
        if (response.data.status) {
          const reports = response.data.result_data;
          this.props.pullAllAcceptedReport(reports);
          this.setState({ acceptedReportList: reports });
        } else {
          this.setErrorAlert(true);
        }
        this.setLoading(false);
      })
      .then(() => {
        this.setStyleForGrid();
      })
      .catch((error) => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.setStyleForGrid();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onGridReady = async (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    await this.setRowData();
    await this.gridApi.sizeColumnsToFit();
  };

  setStyleForGrid = () => {
    const containerHeight =
      this.props.conRef && this.props.conRef.current.clientHeight;
    this._isMounted &&
      this.setState({
        containerHeight,
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
  render() {
    return (
      <Fragment>
        {this.state.errorAlert && (
          <ErrorAlert
            errorAlert={this.state.errorAlert}
            errorList={this.state.errorList}
            onDismiss={() => this.onDismiss('errorAlert')}
          />
        )}
        <LoadingSpinner
          loading={this.state.loading}
          text="Loading"
        ></LoadingSpinner>
        <div
          className="ag-theme-alpine"
          style={{
            height: `${this.state.containerHeight - 200}px`,
            marginTop: '10px',
          }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            rowData={this.state.acceptedReportList}
            rowSelection="single"
            columnDefs={columnAcceptedReportFieldDef}
            pagination={true}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  acceptedReportList: getAllAcceptedReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullAllAcceptedReport: (acceptedReportList) =>
    dispatch(pullAllAcceptedReport(acceptedReportList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportAcceptedList);
