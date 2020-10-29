import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { NewSynonymModal, getAllSynonyms, fetchAllSynonyms } from "src/modules/contributor/index";
import { SYNONYM, ALL } from "src/constants";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "src/common/axiosClient";

class SynonymsModal extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      selectedSynonyms: [],
      gridApi: "",
      gridColumnApi: "",
      index: "",
      isOpenNewSynonymModal: false,
    };
  }

  componentDidMount = () => {
    if (this.props.synonymsList.length === 0) {
      // axiosClient.get(SYNONYM + ALL).then((response) => {
      //   this.props.fetchAllSynonyms(response.data.result_data.synonym_dicts)
      // });
    }
    
  };

  onGridReady = (params) => {
    let currentState = this.state;
    currentState.gridApi = params.api;
    currentState.gridColumnApi = params.columnApi;
    this.setState(currentState);
  };

  onSelectionChanged = () => {
    let nodes = this.state.gridApi.getSelectedNodes();
    let selectedRow = [];
    nodes.forEach((node) => {
      if (typeof node !== "undefined") {
        selectedRow.push(node.data);
      }
    });
    let currentState = this.state;
    currentState.selectedSynonyms = selectedRow;
    this.setState(currentState);
  };

  addSynonyms = () => {
    this.props.addSynonym(this.state.selectedSynonyms, this.props.index);
    this.props.toggleSynonymModal(this.props.index);
  };

  toggleNewSynonymModal = () => {
    this.setState({ isOpenNewSynonymModal: !this.state.isOpenNewSynonymModal });
  };

  render() {
    return (
      <div>
        <NewSynonymModal
          isOpen={this.state.isOpenNewSynonymModal}
          toggle={this.toggleNewSynonymModal}
        />
        <Modal
          isOpen={this.props.isOpenSynonymModal}
          toggle={this.props.toggleSynonymModal}
        >
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
              >
                <AgGridColumn
                  width={100}
                  field="synonym_id"
                  headerName="Id"
                  sortable
                  filter
                ></AgGridColumn>
                <AgGridColumn
                  width={170}
                  field="meaning"
                  headerName="Meaning"
                  sortable
                  filter
                ></AgGridColumn>
                <AgGridColumn
                  width={195}
                  field="words"
                  headerName="Words"
                  sortable
                  filter
                ></AgGridColumn>
              </AgGridReact>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
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
