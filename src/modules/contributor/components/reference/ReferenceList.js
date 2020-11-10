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
import { columnRefFieldDef } from 'src/modules/contributor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
    if (this.props.referenceList.length === 0) {
      this._isMounted && this.setState({ loading: true });
      axiosClient
        .get(REFERENCE + ALL)
        .then((response) => {
          const references = response.data.result_data.references;
          this.props.fetchAllDocumentReference(references);
          this.setState({ loading: false, referenceList: references });
        })
        .then(() => {
          this.setStyleForGrid();
        })
        .catch((error) => {
          this.setLoading(false);
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
        });
    } else {
      await this.setReferenceList(this.props.referenceList);
      await this.setStyleForGrid();
    }
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

  onRowDoubleClicked = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id =
      selectedRows.length === 1 ? selectedRows[0].reference_document_id : '';
    this._isMounted &&
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
    const containerWidth =
      this.conRef.current && this.conRef.current.clientWidth;
    this._isMounted &&
      this.setState({
        containerHeight,
        containerWidth,
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
      <div
        id="cl-container"
        className="container cl-container min-vh-100"
        ref={this.conRef}
      >
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Document reference</h5>
          </Col>
        </Row>
        {this.state.successAlert && (
          <SuccessAlert
            successAlert={this.state.successAlert}
            text="Loading reference is successfully"
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
        <Row className="d-flex flex-row-reverse">
          <Col xs="auto">
            <Button onClick={this.onReferenceCreateClick} className="r-button">
              <FontAwesomeIcon icon={faPlus} color="white" />
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
        </Row>
        <LoadingSpinner
          loading={this.state.loading}
          text="Loading reference"
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
            rowData={this.state.referenceList}
            rowSelection="single"
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            columnDefs={columnRefFieldDef}
          ></AgGridReact>
          {this.state.modalReferenceDetail && (
            <DocumentReferenceModal
              isOpen={this.state.modalReferenceDetail}
              id={this.state.selectedId}
              toggle={this.toggleReferenceDetail}
              updateReferenceList={this.setReferenceList}
            />
          )}
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
