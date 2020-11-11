import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import {
  NewSynonymModal,
  getAllSynonyms,
  fetchAllSynonyms,
  columnSynonymListRef,
} from 'src/modules/contributor/index';
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
      gridApi: '',
      gridColumnApi: '',
      index: '',
      loading: false,
      isOpenNewSynonymModal: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  onGridReady = (params) => {
    if (this.props.synonymsList.length === 0) {
      if (this._isMounted) this.setState({ loading: true });
      axiosClient
        .get(SYNONYM + ALL)
        .then((response) => {
          if (response.data.status) {
            this.props.fetchAllSynonyms(
              response.data.result_data.synonym_dicts
            );
            this.setState({ loading: false });
            this.props.setAlertMessage('Load synonym successful');
            this.props.setSuccessAlert(true);
          } else {
            this.props.scrollToTop();
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
          this.props.scrollToTop();
        });
    }
    if (this._isMounted)
      this.setState({ gridApi: params.api, gridColumnApi: params.columnApi });
  };

  onSelectionChanged = () => {
    let nodes = this.state.gridApi.getSelectedNodes();
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

  addSynonyms = () => {
    this.props.addSynonym(this.state.selectedSynonyms, this.props.index);
    this.props.toggleSynonymModal(this.props.index);
  };

  toggleNewSynonymModal = () => {
    if (this._isMounted)
      this.setState({
        isOpenNewSynonymModal: !this.state.isOpenNewSynonymModal,
      });
  };

  render() {
    return (
      <div>
        {this.state.isOpenNewSynonymModal && (
          <NewSynonymModal
            setAlertMessage={this.props.setAlertMessage}
            setSuccessAlert={this.props.setSuccessAlert}
            setErrorAlert={this.props.setErrorAlert}
            setErrorList={this.props.setErrorList}
            isOpen={this.state.isOpenNewSynonymModal}
            toggle={this.toggleNewSynonymModal}
          />
        )}
        <Modal
          isOpen={this.props.isOpenSynonymModal}
          toggle={this.props.toggleSynonymModal}
        >
          <LoadingSpinner loading={this.state.loading} text="Loading synonyms">
            <ModalHeader toggle={this.props.toggleSynonymModal}>
              Synonyms
            </ModalHeader>
            <ModalBody>
              <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 465 }}
              >
                <AgGridReact
                  onGridReady={this.onGridReady}
                  rowData={this.props.synonymsList}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  columnDefs={columnSynonymListRef}
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
              <Button color="success" onClick={this.addSynonyms}>
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
