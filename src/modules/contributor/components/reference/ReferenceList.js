import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import { CreateReferenceForm } from 'src/modules/contributor/index';

const onRowClicked = () =>{
    console.log('Click happened');
}

const ReferenceList = () => {

    const [rowData, setRowData] = useState([
        { id: "1", reference: "Ho Chi Minh Toan Tap 1", author: "Ho Chi Minh", link: "hochiminh.vn", createdBy: "Dam Tung", editBy: "Dung" },
        { id: "2", reference: "Ho Chi Minh Toan Tap 2", author: "Ho Chi Minh", link: "hochiminh.vn", createdBy: "Dam Tung", editBy: "Dung" },
        { id: "3", reference: "Ho Chi Minh Toan Tap 3", author: "Ho Chi Minh", link: "hochiminh.vn", createdBy: "Dam Tung", editBy: "Dung" },
    ]);

    return (
        <div>
            <h1>Document reference</h1>
            <CreateReferenceForm />
            <div className="ag-theme-alpine" style={{ height: '80vh', width: '80%' }}>
                <AgGridReact
                    rowData={rowData}
                    rowSelection="single"
                    
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

export default ReferenceList;