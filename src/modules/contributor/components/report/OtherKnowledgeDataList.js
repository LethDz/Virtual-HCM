import React, { Component, Fragment } from 'react';
import { Button, Col, Row } from 'reactstrap';
import {
  otherKnowledgeDataDef,
  frameworkForOtherKnowledgeData,
  ReportConfirmModal,
} from 'src/modules/contributor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { AgGridReact } from 'ag-grid-react';

class OtherKnowledgeDataList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      containerHeight: 0,
      loading: false,
      selectedId: '',
      errorAlert: false,
      successAlert: false,
      errorList: [],
      openModal: false,
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
    let id = selectedRows.length === 1 ? selectedRows[0].id : '';
    this._isMounted &&
      this.setState({
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

  setOpenModal = (status) => {
    this._isMounted &&
      this.setState({
        openModal: status,
      });
  };

  toggleDetailModal = () => {
    this.props.toggleDetailModal();
  };

  setToast = () => {
    this.props.addToast();
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
        {this.state.openModal && (
          <ReportConfirmModal
            toggleDetail={this.toggleDetailModal}
            id={this.state.selectedId}
            reportId={this.props.report.id}
            openModal={this.state.openModal}
            setOpenModal={this.setOpenModal}
            toggleDetailModal={this.toggleDetailModal}
            setToast={this.setToast}
          />
        )}
        <Row className='d-flex flex-row-reverse'>
          <Col xs='auto'>
            <Button
              color='warning'
              disabled={this.state.selectedId === ''}
              onClick={() => this.setOpenModal(true)}
            >
              <FontAwesomeIcon icon={faBell} />
              &nbsp; Notify To
            </Button>
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
            columnDefs={otherKnowledgeDataDef}
            pagination={true}
            paginationAutoPageSize={true}
            frameworkComponents={frameworkForOtherKnowledgeData}
          ></AgGridReact>
        </div>
      </Fragment>
    );
  }
}

export default OtherKnowledgeDataList;
