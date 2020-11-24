import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import {
  CreateSynonymModal,
  SynonymDetailModal,
  getAllSynonyms,
  fetchAllSynonyms,
  columnSynonymListRef,
} from 'src/modules/contributor';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { SYNONYM, ALL } from 'src/constants';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axiosClient from 'src/common/axiosClient';

class SynonymsModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      selectedSynonyms: [],
      selectedId: '',
      synonymsList: [],
      gridApi: '',
      gridColumnApi: '',
      index: '',
      loading: false,
      isOpenNewSynonymModal: false,
      isOpenSynonymDetailModal: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  onGridReady = async (params) => {
    await this.setData();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  setData = () => {
    if (this._isMounted) this.setState({ loading: true });
    axiosClient
      .get(SYNONYM + ALL)
      .then((response) => {
        if (response.data.status) {
          this.props.fetchAllSynonyms(
            response.data.result_data.synonym_dicts
          );
          this.setSynonymList(response.data.result_data.synonym_dicts);
          this.sizeToFit()
          this.setState({ loading: false });
        } else {
          this.props.setSuccessAlert(false);
          this.props.setErrorAlert(true);
          this.props.setErrorList(response.data.messages);
        }
      })
      .catch((err) => {
        if (this._isMounted)
          this.setState({
            loading: false,
          });
        this.props.setErrorAlert(true);
        this.props.setSuccessAlert(false);
      });
  };

  setSynonymList = (list) => {
    this._isMounted &&
      this.setState({
        synonymsList: list,
      });
  };

  onSelectionChanged = () => {
    let nodes = this.gridApi.getSelectedNodes();
    let selectedRow = [];
    nodes.forEach((node) => {
      if (typeof node !== 'undefined') {
        selectedRow.push(node.data);
      }
    });
    let currentState = this.state;
    currentState.selectedSynonyms = selectedRow;
    if (this._isMounted) this.setState(currentState);
  };

  onRowDoubleClicked = (selectedRow) => {
    let id = selectedRow.data.synonym_id;
    this._isMounted &&
      this.setState({
        selectedId: id,
        isOpenSynonymDetailModal: !this.state.isOpenSynonymDetailModal,
      });
  };

  addSynonyms = () => {
    this.props.addSynonym(this.state.selectedSynonyms, this.props.index);
    this.props.toggle(this.props.index);
  };

  toggleNewSynonymModal = () => {
    if (this._isMounted)
      this.setState({
        isOpenNewSynonymModal: !this.state.isOpenNewSynonymModal,
      });
  };

  toggleSynonymDetail = () => {
    this._isMounted &&
      this.setState({
        isOpenSynonymDetailModal: !this.state.isOpenSynonymDetailModal,
      });
  };

  toggleThisModal = () => {
    !this.state.loading && this.props.toggle();
  };

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  onFirstDataRendered = () => {
    this.sizeToFit();
  }

  render() {
    return (
      <div>
        {this.state.isOpenNewSynonymModal && (
          <CreateSynonymModal
            isOpen={this.state.isOpenNewSynonymModal}
            toggle={this.toggleNewSynonymModal}
            updateSynonymList={this.setSynonymList}
          />
        )}
        {this.state.isOpenSynonymDetailModal && (
          <SynonymDetailModal
            isOpen={this.state.isOpenSynonymDetailModal}
            id={this.state.selectedId}
            toggle={this.toggleSynonymDetail}
            updateSynonymList={this.setSynonymList}
          />
        )}
        <Modal
          isOpen={this.props.isOpenSynonymModal}
          toggle={this.toggleThisModal}
          size="lg"
        >
          <LoadingSpinner
            type="MODAL"
            loading={this.state.loading}
            text="Loading synonyms"
          >
            <ModalHeader toggle={this.toggleThisModal}>Synonyms</ModalHeader>
            <ModalBody>
              <div
                className="ag-theme-alpine"
                style={{ height: 700, width: "100%" }}
              >
                <AgGridReact
                  onFirstDataRendered={this.onFirstDataRendered}
                  onGridReady={this.onGridReady}
                  onRowDoubleClicked={this.onRowDoubleClicked}
                  rowData={this.state.synonymsList}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  columnDefs={columnSynonymListRef}
                  pagination={true}
                  paginationAutoPageSize={true}
                ></AgGridReact>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="warning"
                onClick={() => {
                  this.toggleNewSynonymModal();
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> New synonym
              </Button>
              <Button
                color="success"
                onClick={this.addSynonyms}
                disabled={this.state.selectedSynonyms.length === 0}
              >
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
            </ModalFooter>
          </LoadingSpinner>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(SynonymsModal);
