import React, { Component, Fragment } from 'react';
import { GET_ALL_ACCEPTED_REPORT } from 'src/constants';
import {
  columnAcceptedReportFieldDef,
  ReportDetailModalAccepted,
  frameworkComponentsForReport,
} from 'src/modules/contributor';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import {
  getAllAcceptedReport,
  pullAllAcceptedReport,
} from 'src/modules/contributor';
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSync } from '@fortawesome/free-solid-svg-icons';

class ReportAcceptedList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      acceptedReportList: [],
      modalReportDetail: false,
      containerHeight: 0,
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
        this.gridApi.sizeColumnsToFit();
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
              <ReportDetailModalAccepted
                isOpen={this.state.modalReportDetail}
                id={this.state.selectedId}
                toggle={this.toggleReportDetail}
              />
            )}
          </Col>
          <Col>
            <Button type="button" color="success" onClick={this.setRowData}>
              <FontAwesomeIcon icon={faSync} color="white" />
            </Button>
          </Col>
        </Row>
        <LoadingSpinner
          loading={this.state.loading}
          text="Loading accepted reports"
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
            onSelectionChanged={this.onRowSelected.bind(this)}
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            pagination={true}
            paginationAutoPageSize={true}
            frameworkComponents={frameworkComponentsForReport}
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
