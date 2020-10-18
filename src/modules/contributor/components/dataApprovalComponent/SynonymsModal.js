import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
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
          list: [300, 200]
        },
        {
          id: "002",
          meaning: "test1",
          list: [523, 123]
        },
        {
          id: "003",
          meaning: "test2",
          list: [653, 1234]
        },
      ],
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

  onSelectionChanged = (test) => {
    console.log(test)
    // let selectedRows = this.gridApi.getSelectedRows();
    // let selectedRowsString = '';
    // let maxToShow = 5;
    // selectedRows.forEach(function (selectedRow, index) {
    //   if (index >= maxToShow) {
    //     return;
    //   }
    //   if (index > 0) {
    //     selectedRowsString += ', ';
    //   }
    //   selectedRowsString += selectedRow.athlete;
    // });
    // if (selectedRows.length > maxToShow) {
    //   var othersCount = selectedRows.length - maxToShow;
    //   selectedRowsString +=
    //     ' and ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
    // }
    // console.log(selectedRowsString)
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.setModal}>
          <ModalHeader toggle={this.state.setModal}>Synonyms</ModalHeader>
          <ModalBody>
            <div>
              <Input
                type="text"
                name="synonyms"
                id="synonymsSearch"
                placeholder="Search"
              />
            </div>
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
                <AgGridColumn width={100} field="id"></AgGridColumn>
                <AgGridColumn width={170} field="meaning"></AgGridColumn>
                <AgGridColumn width={195} field="list"></AgGridColumn>
              </AgGridReact>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Add</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SynonymsModal;
