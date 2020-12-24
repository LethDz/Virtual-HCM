import { AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {
  CreateReferenceModal,
  getAllDocumentReference,
  fetchAllDocumentReference,
  DocumentReferenceModal,
} from 'src/modules/contributor/index';
import { REFERENCE, ALL } from 'src/constants';
import {
  columnRefFieldDef,
  frameworkComponentsForReference,
} from 'src/modules/contributor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSync } from '@fortawesome/free-solid-svg-icons';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import 'src/static/stylesheets/reference.css';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';

class ReferenceList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      referenceList: [],
      modalReferenceCreate: false,
      modalReferenceDetail: false,
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
      .get(REFERENCE + ALL)
      .then((response) => {
        if (response.data.status) {
          const references = response.data.result_data.references;
          this.props.fetchAllDocumentReference(references);
          this.setState({ referenceList: references });
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .then(() => {
        this.sizeToFit();
      })
      .catch((error) => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  setReferenceList = (list) => {
    this._isMounted &&
      this.setState({
        referenceList: list,
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
    let id =
      selectedRows.length === 1 ? selectedRows[0].reference_document_id : '';
    this._isMounted &&
      this.setState({
        selectedId: id,
      });
  };

  onRowDoubleClicked = (row) => {
    let id = row.data.reference_document_id;
    this.setState({
      selectedId: id,
      modalReferenceDetail: !this.state.modalReferenceDetail,
    });
  };

  toggleReferenceDetail = () => {
    this.setState({
      modalReferenceDetail: !this.state.modalReferenceDetail,
    });
  };

  onReferenceCreateClick = () => {
    this.setState({
      modalReferenceCreate: !this.state.modalReferenceCreate,
    });
  };

  toggleReferenceCreate = () => {
    this.setState({
      modalReferenceCreate: !this.state.modalReferenceCreate,
    });
  };

  updateReferenceList = () => {
    this.setState({
      referenceList: this.props.referenceList,
    });
  };

  setStyleForGrid = () => {
    const containerHeight =
      this.conRef.current && this.conRef.current.clientHeight;
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

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  onFirstDataRendered = () => {
    this.sizeToFit();
  };

  resetSelection = () => {
    this._isMounted && this.setState({ selectedId: '' });
  };

  render() {
    return (
      <div
        id='cl-container'
        className='container cl-container min-vh-100'
        ref={this.conRef}
      >
        <Row>
          <Col className='justify-content-center d-flex'>
            <h5 className='mt-2 mb-2'>Document Reference</h5>
          </Col>
        </Row>
        {this.state.successAlert && (
          <SuccessAlert
            successAlert={this.state.successAlert}
            text='Loading reference is successfully'
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
        <Row className='d-flex flex-row-reverse'>
          <Col xs='auto'>
            <Button onClick={this.onReferenceCreateClick} color='primary'>
              <FontAwesomeIcon icon={faPlus} color='white' />
              &nbsp; Create
            </Button>
            {this.state.modalReferenceCreate && (
              <CreateReferenceModal
                isOpen={this.state.modalReferenceCreate}
                toggle={this.toggleReferenceCreate}
                updateReferenceList={this.setReferenceList}
              />
            )}
          </Col>
          <Col xs='auto'>
            <Button
              color='success'
              disabled={this.state.selectedId === ''}
              onClick={this.toggleReferenceDetail}
            >
              <FontAwesomeIcon icon={faEdit} color='white' />
              &nbsp; Edit
            </Button>
            {this.state.modalReferenceDetail && (
              <DocumentReferenceModal
                resetSelection={this.resetSelection}
                isOpen={this.state.modalReferenceDetail}
                id={this.state.selectedId}
                toggle={this.toggleReferenceDetail}
                updateReferenceList={this.setReferenceList}
              />
            )}
          </Col>
          <Col>
            <Button type='button' color='success' onClick={this.setRowData}>
              <FontAwesomeIcon icon={faSync} color='white' />
            </Button>
          </Col>
        </Row>
        <LoadingSpinner
          loading={this.state.loading}
          text='Loading reference'
        ></LoadingSpinner>
        <div
          className='ag-theme-alpine'
          style={{
            height: `${this.state.containerHeight - 200}px`,
            marginTop: '10px',
          }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            rowData={this.state.referenceList}
            rowSelection='single'
            onSelectionChanged={this.onRowSelected.bind(this)}
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            columnDefs={columnRefFieldDef}
            pagination={true}
            paginationAutoPageSize={true}
            onFirstDataRendered={this.onFirstDataRendered}
            frameworkComponents={frameworkComponentsForReference}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  referenceList: getAllDocumentReference(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDocumentReference: (referenceList) =>
    dispatch(fetchAllDocumentReference(referenceList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceList);
