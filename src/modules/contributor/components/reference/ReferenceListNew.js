import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import { ReferenceModal } from "src/modules/contributor/index";
import { DOCUMENT_REFERENCE_LIST_PAGE } from 'src/constants';
import { columnRefFieldDef } from 'src/modules/contributor';
import axiosClient from 'src/common/axiosClient';
import "src/static/stylesheets/reference.css";

class ReferenceList extends Component {
    _isMounted = false;
    constructor() {
      super();
      this.state = {
        referenceList: [],
        loading: false,
        id: '',
        containerHeight: 0,
      };
    }

    componentDidMount() {
        this._isMounted = true;
        const containerHeight = document.getElementById('r-container')
          .clientHeight;
        this.setState({
          containerHeight,
        });
      }
    
      componentWillUnmount() {
        this._isMounted = false;
      }
    
      onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        axiosClient.get(DOCUMENT_REFERENCE_LIST_PAGE).then((response) => {
    
        }).catch((error) => {
    
        });
        this.setState({
            referenceList: [],
        });
        this.gridApi.sizeColumnsToFit();
      };

    onRowDoubleClicked = () => {
        let selectedRows = this.gridApi.getSelectedRows();
        let id = selectedRows.length === 1 ? selectedRows[0].id : '';
        this.setState({
          id,
        });
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: '60vh', width: '80%'}} id="r-container" className='r-container'>
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        rowData={this.state.referenceList}
                        rowSelection="single"
                        onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
                        columnDefs={columnRefFieldDef}
                    >
                        <AgGridColumn field="id" sortable filter></AgGridColumn>
                        <AgGridColumn field="reference" sortable filter></AgGridColumn>
                        <AgGridColumn field="author" sortable filter></AgGridColumn>
                        <AgGridColumn field="createdBy" sortable filter></AgGridColumn>
                        <AgGridColumn field="editBy" sortable filter></AgGridColumn>
                    </AgGridReact>

                    {/* <ReferenceModal modal={this.state.modal} data={this.state.selectedRow} /> */}
            </div>
        );
    }
}

export default ReferenceList;