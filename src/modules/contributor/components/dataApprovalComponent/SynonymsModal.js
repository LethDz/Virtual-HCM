import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

class SynonymsModal extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      rowData: [
        {
          id: "001",
          meaning: "test",
          list: [300, 200],
        },
        {
          id: "002",
          meaning: "test1",
          list: [523, 123],
        },
        {
          id: "003",
          meaning: "test2",
          list: [653, 1234],
        },
      ],
      selectedSynonyms: [],
      gridApi: "",
      gridColumnApi: "",
    };
  }

  setModal = () => {
    let currentState = this.state;
    currentState.modal = !currentState.modal;
    this.setState(currentState);
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
    // let synonyms = this.state.selectedSynonyms;
    this.props.addSynonym(this.state.selectedSynonyms);
    this.setModal()
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.setModal}>
          <ModalHeader toggle={this.state.setModal}>Synonyms</ModalHeader>
          <ModalBody>
            <div
              className="ag-theme-alpine"
              style={{ height: 400, width: 465 }}
            >
              <AgGridReact
                onGridReady={this.onGridReady}
                rowData={this.state.rowData}
                rowSelection="multiple"
                rowMultiSelectWithClick
                onSelectionChanged={this.onSelectionChanged.bind(this)}
              >
                <AgGridColumn
                  width={100}
                  field="id"
                  sortable
                  filter
                ></AgGridColumn>
                <AgGridColumn
                  width={170}
                  field="meaning"
                  sortable
                  filter
                ></AgGridColumn>
                <AgGridColumn
                  width={195}
                  field="list"
                  sortable
                  filter
                ></AgGridColumn>
              </AgGridReact>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addSynonyms}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SynonymsModal;