import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import { ReferencePopup} from "src/modules/contributor/index"

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
        };
    }

    onGridReady = (params) => {
        let currentState = this.state;
        currentState.gridApi = params.api;
        this.setState(currentState);
      };

    onSelectionChanged = () => {
        let selectedNodes = this.state.gridApi.getSelectedNodes();
        let selectedRow = selectedNodes.map(node => node.data);
        console.log(selectedRow);
    }

    render() {
        return (
            <div>
                <div className="ag-theme-alpine" style={{ height: '80vh', width: '80%' }}>
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        rowData={this.state.rowData}
                        rowSelection="single"
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                    >
                        <AgGridColumn field="id" sortable filter></AgGridColumn>
                        <AgGridColumn field="reference" sortable filter></AgGridColumn>
                        <AgGridColumn field="author" sortable filter></AgGridColumn>
                        <AgGridColumn field="createdBy" sortable filter></AgGridColumn>
                        <AgGridColumn field="editBy" sortable filter></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

export default ReferenceList;