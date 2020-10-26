import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import { ReferenceModal } from "src/modules/contributor/index"

class ReferenceList extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            rowData: [
                { id: "1", reference: "Ho Chi Minh Toan Tap 1", author: "Ho Chi Minh", link: "hochiminh.vn", createdBy: "Dam Tung", editBy: "Dung" },
                { id: "2", reference: "Ho Chi Minh Toan Tap 2", author: "Ho Chi Minh", link: "hochiminh.vn", createdBy: "Dam Tung", editBy: "Dung" },
                { id: "3", reference: "Ho Chi Minh Toan Tap 3", author: "Ho Chi Minh", link: "hochiminh.vn", createdBy: "Dam Tung", editBy: "Dung" },
            ],
            gridApi: "",
            selectedRow: {
                id: "",
                reference: "",
                author: "",
                link: "",
                createdBy: "",
                editBy: ""
            }
        };
    }

    onGridReady = (params) => {
        let currentState = this.state;
        currentState.gridApi = params.api;
        this.setState(currentState);
    };

    onRowDoubleClicked = () => {
        let currentState = this.state;
        let selectedNodes = currentState.gridApi.getSelectedNodes();
        let selectedRow = selectedNodes.map(node => node.data);
        currentState.selectedRow = selectedRow[0];
        currentState.modal = !currentState.modal;
        this.setState(currentState);
    }

    render() {
        return (
            <div>
                <div className="ag-theme-alpine" style={{ height: '60vh', width: '80%' }}>
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        rowData={this.state.rowData}
                        rowSelection="single"
                        onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
                    >
                        <AgGridColumn field="id" sortable filter></AgGridColumn>
                        <AgGridColumn field="reference" sortable filter></AgGridColumn>
                        <AgGridColumn field="author" sortable filter></AgGridColumn>
                        <AgGridColumn field="createdBy" sortable filter></AgGridColumn>
                        <AgGridColumn field="editBy" sortable filter></AgGridColumn>
                    </AgGridReact>

                    <ReferenceModal modal={this.state.modal} data={this.state.selectedRow} />
                </div>
            </div>
        );
    }
}

export default ReferenceList;