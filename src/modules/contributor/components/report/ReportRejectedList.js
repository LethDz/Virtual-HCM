import React, { Component, Fragment } from 'react';
import { GET_ALL_REJECTED_REPORT } from 'src/constants';
import { columnRejectedReportFieldDef } from 'src/modules/contributor';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import {
  getAllRejectedReport,
  pullAllRejectedReport,
} from 'src/modules/contributor';

class ReportRejectedList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      rejectedReportList: [],
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
      .get(GET_ALL_REJECTED_REPORT)
      .then((response) => {
        if (response.data.status) {
          const reports = response.data.result_data;
          this.props.pullAllRejectedReport(reports);
          this.setState({ rejectedReportList: reports });
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
            rowData={this.state.rejectedReportList}
            rowSelection="single"
            columnDefs={columnRejectedReportFieldDef}
            pagination={true}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  rejectedReportList: getAllRejectedReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullAllRejectedReport: (rejectedReportList) =>
    dispatch(pullAllRejectedReport(rejectedReportList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportRejectedList);