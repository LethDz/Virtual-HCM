import React, { Component, Fragment } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { availableKnowledgeDataDef } from 'src/modules/contributor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import {
  CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM,
  GET_KNOWLEDGE_DATA_BY_INTENT,
} from 'src/constants';
import { connect } from 'react-redux';
import { approveReport } from 'src/modules/contributor';
import 'src/static/stylesheets/report.detail.css';
class AvailableKnowledgeDataList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      containerHeight: 0,
      loading: false,
      selectedIntent: '',
      selectedId: '',
      errorAlert: false,
      successAlert: false,
      errorList: [],
    };

    this.conRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setStyleForGrid();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  onRowSelected = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let intent = selectedRows.length === 1 ? selectedRows[0].intent : '';
    let id = selectedRows.length === 1 ? selectedRows[0].id : '';
    this._isMounted &&
      this.setState({
        selectedIntent: intent,
        selectedId: id,
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

  approveReport = () => {
    const approvalReport = this.props.report;
    const id = this.state.selectedId;
    const approvalDetail = {
      report: approvalReport,
      knowledge_data_id: id,
    };
    this.props.approveReport(approvalDetail);
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
        <Row className='d-flex flex-row-reverse'>
          <Col xs='auto'>
            <Link
              to={CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM}
              className='link-no-underline'
            >
              <Button color='primary' onClick={this.approveReport}>
                <FontAwesomeIcon icon={faPlus} color='white' />
                &nbsp; Create
              </Button>
            </Link>
          </Col>
          <Col xs='auto'>
            <Link
              to={GET_KNOWLEDGE_DATA_BY_INTENT(this.state.selectedIntent)}
              className='link-no-underline'
            >
              <Button
                color='success'
                disabled={this.state.selectedId === ''}
                onClick={this.approveReport}
              >
                <FontAwesomeIcon icon={faFile} color='white' />
                &nbsp; Edit
              </Button>
            </Link>
          </Col>
        </Row>
        <div
          className='ag-theme-alpine'
          style={{
            height: `${this.state.containerHeight - 100}px`,
            marginTop: '10px',
          }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            rowData={this.props.intents}
            rowSelection='single'
            onSelectionChanged={this.onRowSelected.bind(this)}
            columnDefs={availableKnowledgeDataDef}
            pagination={true}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  approveReport: (approvalReportDetail) =>
    dispatch(approveReport(approvalReportDetail)),
});
export default connect(null, mapDispatchToProps)(AvailableKnowledgeDataList);
