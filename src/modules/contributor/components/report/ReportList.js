import React, { Component, Fragment } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {
  ReportDetailModal,
  getAllPendingReport,
  fetchAllPendingReport,
} from 'src/modules/contributor/index';
import { GET_ALL_PENDING_REPORT } from 'src/constants';
import { columnPendingReportFieldDef } from 'src/modules/contributor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { AgGridReact } from 'ag-grid-react';

class ReportList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      reportList: [],
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
      .get(GET_ALL_PENDING_REPORT)
      .then((response) => {
        if (response.data.status) {
          const reports = response.data.result_data;
          this.props.fetchAllPendingReport(reports);
          this.setState({ reportList: reports });
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

  setReportList = (list) => {
    this._isMounted &&
      this.setState({
        reportList: list,
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

  onRowSelected = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id = selectedRows.length === 1 ? selectedRows[0].report_id : '';
    this._isMounted &&
      this.setState({
        selectedId: id,
      });
  };

  onRowDoubleClicked = (row) => {
    let id = row.data.report_id;
    this.setState({
      selectedId: id,
      modalReportDetail: !this.state.modalReportDetail,
    });
  };

  toggleReportDetail = () => {
    this.setState({
      modalReportDetail: !this.state.modalReportDetail,
    });
  };

  updateReportList = () => {
    this.setState({
      reportList: this.props.reportList,
    });
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
        <Row className="d-flex flex-row-reverse">
          <Col xs="auto">
            <Button
              color="success"
              disabled={this.state.selectedId === ''}
              onClick={this.toggleReportDetail}
            >
              <FontAwesomeIcon icon={faEye} color="white" />
              &nbsp; View Report
            </Button>
            {this.state.modalReportDetail && (
              <ReportDetailModal
                isOpen={this.state.modalReportDetail}
                id={this.state.selectedId}
                toggle={this.toggleReportDetail}
                updateReportList={this.setReportList}
              />
            )}
          </Col>
        </Row>
        <LoadingSpinner
          loading={this.state.loading}
          text="Loading report"
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
            rowData={this.state.reportList}
            rowSelection="single"
            onSelectionChanged={this.onRowSelected.bind(this)}
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            columnDefs={columnPendingReportFieldDef}
            pagination={true}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  reportList: getAllPendingReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPendingReport: (reportList) =>
    dispatch(fetchAllPendingReport(reportList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
