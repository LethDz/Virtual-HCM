import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Col, Row } from 'reactstrap';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import {ChatHistoryDetailModal} from 'src/modules/contributor/index';

class ChatHistoryList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      chatHistoryList: [],
      modalChatHistoryDetail: false,
      containerHeight: 0,
      containerWidth: 0,
      loading: false,
      selectedId: '',
      errorAlert: false,
      successAlert: false,
      errorList: [],
      rowData: [
        {
          id: '1',
          contributor: 'Hoa',
          start: '9:00 14-11-2020',
          end: '12:00 14-11-2020',
        },
        {
          id: '2',
          contributor: 'Hoa',
          start: '14:00 14-11-2020',
          end: '20:00 14-11-2020',
        },
        {
          id: '3',
          contributor: 'Hoa',
          start: '14:00 14-11-2020',
          end: '20:00 14-11-2020',
        },
      ],
      columnDefs: [
        { headerName: 'Id', field: 'id', sortable: true, filter: true },
        {
          headerName: 'Contributor',
          field: 'contributor',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'Session Start',
          field: 'start',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'Session End',
          field: 'end',
          sortable: true,
          filter: true,
        },
      ],
    };

    this.conRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setStyleForGrid();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onGridReady = async (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    await this.gridApi.sizeColumnsToFit();
  };

  setStyleForGrid = () => {
    const containerHeight =
      this.conRef.current && this.conRef.current.clientHeight;
    const containerWidth =
      this.conRef.current && this.conRef.current.clientWidth;
    this._isMounted &&
      this.setState({
        containerHeight,
        containerWidth,
      });
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setSuccessAlert = (status) => {
    this._isMounted &&
      this.setState({
        successAlert: status,
      });
  };

  setErrorAlert = (status) => {
    this._isMounted &&
      this.setState({
        errorAlert: status,
      });
  };

  setErrorList = (list) => {
    this._isMounted &&
      this.setState({
        errorList: list,
      });
  };

  toggleChatHistoryDetail = () => {
    this.setState({
      modalChatHistoryDetail: !this.state.modalChatHistoryDetail,
    });
  };

  onRowDoubleClicked = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id = selectedRows.length === 1 ? selectedRows[0].id : '';
    this._isMounted &&
      this.setState({
        selectedId: id,
        modalChatHistoryDetail: !this.state.modalChatHistoryDetail,
      });
  };

  render() {
    return (
      <div
        id="cl-container"
        className="container cl-container min-vh-100"
        ref={this.conRef}
      >
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Chat History</h5>
          </Col>
        </Row>
        {this.state.successAlert && (
          <SuccessAlert
            successAlert={this.state.successAlert}
            text="Loading reference is successfully"
            onDismiss={() => this.onDismiss('successAlert')}
          />
        )}
        {this.state.errorAlert && (
          <ErrorAlert
            errorAlert={this.state.errorAlert}
            errorList={this.state.errorList}
            onDismiss={() => this.onDismiss('errorAlert')}
          />
        )}
        <LoadingSpinner
          loading={this.state.loading}
          text="Loading"
        ></LoadingSpinner>
        <div
          className="ag-theme-alpine"
          style={{
            height: `${this.state.containerHeight - 200}px`,
            marginTop: '10px',
          }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
            rowSelection="single"
            columnDefs={this.state.columnDefs}
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
          ></AgGridReact>
          <ChatHistoryDetailModal
            isOpen={this.state.modalChatHistoryDetail}
            id={this.state.selectedId}
            toggle={this.toggleChatHistoryDetail}
          />
        </div>
      </div>
    );
  }
}

export default ChatHistoryList;
