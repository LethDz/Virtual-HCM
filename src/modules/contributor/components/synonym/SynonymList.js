import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Col, Row } from 'reactstrap';
import { SYNONYM, ALL } from 'src/constants';
import { columnSynonymFieldDef } from 'src/modules/contributor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
      containerWidth: 0,
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
    if (this.props.synonymsList.length === 0) {
      this._isMounted && this.setLoading(true);
      axiosClient
        .get(SYNONYM + ALL)
        .then((response) => {
          const synonyms = response.data.result_data.synonym_dicts;
          this.props.fetchAllSynonyms(synonyms);
          this.setSynonymList(synonyms);
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
    } else {
      await this.setSynonymList(this.props.synonymsList);
      await this.setStyleForGrid();
    }
  };

  onRowDoubleClicked = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id = selectedRows.length === 1 ? selectedRows[0].synonym_id : '';
    this._isMounted &&
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

  toggleSynonymDetail = () => {
    this.setState({
      modalSynonymDetail: !this.state.modalSynonymDetail,
    });
  };

  updateSynonymList = () => {
    this.setState({
      synonymsList: this.props.synonymsList,
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
            <Button onClick={this.onReferenceCreateClick} color="success">
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp; Create
            </Button>
          </Col>
        </Row>
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
            rowData={this.state.synonymsList}
            rowSelection="single"
            columnDefs={columnSynonymFieldDef}
            onRowDoubleClicked={this.onRowDoubleClicked}
          ></AgGridReact>
          {this.state.modalSynonymDetail && (
            <SynonymDetailModal
              isOpen={this.state.modalSynonymDetail}
              id={this.state.selectedId}
              toggle={this.toggleSynonymDetail}
              updateSynonymList={this.setSynonymList}
            />
          )}
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
