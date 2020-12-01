import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Col, Row } from 'reactstrap';
import { SYNONYM, ALL } from 'src/constants';
import {
  columnSynonymFieldDef,
  CreateSynonymModal,
} from 'src/modules/contributor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSync } from '@fortawesome/free-solid-svg-icons';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import { connect } from 'react-redux';
import { getAllSynonyms, fetchAllSynonyms } from 'src/modules/contributor';
import { SynonymDetailModal } from 'src/modules/contributor';

class SynonymList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      synonymsList: [],
      modalSynonymCreate: false,
      modalSynonymDetail: false,
      containerHeight: 0,
      loading: false,
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

  onGridReady = async (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    await this.setRowData();
    await this.gridApi.sizeColumnsToFit();
  };

  setRowData = async () => {
    this._isMounted && this.setLoading(true);
    axiosClient
      .get(SYNONYM + ALL)
      .then((response) => {
        if (response.data.status) {
          const synonyms = response.data.result_data.synonym_dicts;
          this.props.fetchAllSynonyms(synonyms);
          this.setSynonymList(synonyms);
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

  onRowSelected = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id = selectedRows.length === 1 ? selectedRows[0].synonym_id : '';
    this.setState({
      selectedId: id,
    });
  };

  onRowDoubleClicked = (row) => {
    let id = row.data.synonym_id;
    this.setState({
      selectedId: id,
      modalSynonymDetail: !this.state.modalSynonymDetail,
    });
  };

  setSynonymList = (list) => {
    this._isMounted &&
      this.setState({
        synonymsList: list,
      });
  };

  toggleSynonymCreate = () => {
    this._isMounted &&
      this.setState({
        modalSynonymCreate: !this.state.modalSynonymCreate,
      });
  };

  toggleSynonymDetail = () => {
    this._isMounted &&
      this.setState({
        modalSynonymDetail: !this.state.modalSynonymDetail,
      });
  };

  onSynonymCreateClick = () => {
    this._isMounted &&
      this.setState({
        modalSynonymCreate: !this.state.modalSynonymCreate,
      });
  };

  updateSynonymList = () => {
    this._isMounted &&
      this.setState({
        synonymsList: this.props.synonymsList,
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
    this._isMounted && this.setState({ selectedId: '' })
  }

  render() {
    return (
      <div
        id="cl-container"
        className="container cl-container min-vh-100"
        ref={this.conRef}
      >
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Synonyms</h5>
          </Col>
        </Row>
        {this.state.successAlert && (
          <SuccessAlert
            successAlert={this.state.successAlert}
            text="Loading synonym is successfully"
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
            <Button onClick={this.onSynonymCreateClick} color="primary">
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp; Create
            </Button>
            {this.state.modalSynonymCreate && (
              <CreateSynonymModal
                isOpen={this.state.modalSynonymCreate}
                toggle={this.toggleSynonymCreate}
                updateSynonymList={this.setSynonymList}
              />
            )}
          </Col>
          <Col xs="auto">
            <Button
              color="success"
              disabled={this.state.selectedId === ''}
              onClick={this.toggleSynonymDetail}
            >
              <FontAwesomeIcon icon={faEdit} color="white" />
              &nbsp; Edit
            </Button>
            {this.state.modalSynonymDetail && (
              <SynonymDetailModal
                resetSelection={this.resetSelection}
                isOpen={this.state.modalSynonymDetail}
                id={this.state.selectedId}
                toggle={this.toggleSynonymDetail}
                updateSynonymList={this.setSynonymList}
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
          text="Loading synonyms"
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
            rowData={this.state.synonymsList}
            rowSelection="single"
            columnDefs={columnSynonymFieldDef}
            onSelectionChanged={this.onRowSelected.bind(this)}
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            pagination={true}
            paginationAutoPageSize={true}
            onFirstDataRendered={this.onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  synonymsList: getAllSynonyms(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllSynonyms: (synonymsList) => dispatch(fetchAllSynonyms(synonymsList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SynonymList);
