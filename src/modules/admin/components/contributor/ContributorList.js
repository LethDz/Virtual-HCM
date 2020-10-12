import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Button } from 'reactstrap';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const ContributorList = () => {
    const [rowData, setRowData] = useState([
        { id: "0000001", idNumber: "0123456789", username: "Tungds", phonenumber: "0123475412", dateOfBirth: "13/04/1999", address: "Doan xem t o dau", nationality: "test", status: "active" },
        { id: "0000002", idNumber: "0987654321", username: "Dungnm", phonenumber: "0998786534", dateOfBirth: "12/04/1999", address: "Doan xem t o dau", nationality: "test", status: "active" },
        { id: "0000003", idNumber: "0563412342", username: "Dunglt", phonenumber: "0941345145", dateOfBirth: "15/04/1999", address: "Doan xem t o dau", nationality: "test", status: "deactive" }
    ]);
    
    return (
        <div>
            <div className="d-flex justify-content-center">
                <h1>Contributors</h1>
            </div>
            <div className="d-flex justify-content-end mr-5">
                <Button>Create</Button>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <div className="ag-theme-alpine" style={{ height: "100vh", width: "90%" }}>
                    <AgGridReact
                        rowData={rowData}
                        rowSelection="single"
                        onSelectionChanged={(data) => {
                            console.log(data.api.getSelectedRows())
                            window.location.href = `accounts/${data.api.getSelectedRows()[0].id}`
                        }}
                    >
                        <AgGridColumn field="id" width="90%" sortable filter></AgGridColumn>
                        <AgGridColumn field="username" sortable filter></AgGridColumn>
                        <AgGridColumn field="dateOfBirth" sortable filter></AgGridColumn>
                        <AgGridColumn field="idNumber" sortable filter></AgGridColumn>
                        <AgGridColumn field="phonenumber" sortable filter></AgGridColumn>
                        <AgGridColumn field="address" sortable filter></AgGridColumn>
                        <AgGridColumn field="nationality" sortable filter></AgGridColumn>
                        <AgGridColumn field="status" sortable filter></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default ContributorList;
