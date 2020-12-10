import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Col, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSync } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import { ChatHistoryDetailModal } from 'src/modules/contributor/index';
import {
  columnChatHistoryFieldDef,
  frameworkComponentsForChatHistory,
} from 'src/modules/contributor';
import { CHAT_HISTORY, ALL } from 'src/constants';
import axiosClient from 'src/common/axiosClient';

class ChatHistoryList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      chatHistoryList: [],
      modalChatHistoryDetail: false,
      containerHeight: 0,
      loading: false,
      selectedId: '',
      errorAlert: false,
      successAlert: false,
      errorList: [],
    };

    this.conRef = React.createRef();
  }

  setRowData = async () => {
    this._isMounted && this.setState({ loading: true });
    axiosClient
      .get(CHAT_HISTORY + ALL)
      .then((response) => {
        if (response.data.status) {
          const chatLogs = response.data.result_data;
          this.setState({ chatHistoryList: chatLogs });
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .then(() => {
        this.sizeToFit();
      })
      .catch((error) => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

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
    await this.setRowData();
    await this.gridApi.sizeColumnsToFit();
  };

  setStyleForGrid = () => {
    const containerHeight =
      this.conRef.current && this.conRef.current.clientHeight;
    this._isMounted &&
      this.setState({
        containerHeight,
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

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  onFirstDataRendered = () => {
    this.sizeToFit();
  };

  toggleChatHistoryDetail = () => {
    this.setState({
      modalChatHistoryDetail: !this.state.modalChatHistoryDetail,
    });
  };

  onRowDoubleClicked = (row) => {
    let id = row.data.log_id;
    this._isMounted &&
      this.setState({
        selectedId: id,
        modalChatHistoryDetail: !this.state.modalChatHistoryDetail,
      });
  };

  onRowSelected = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id = selectedRows.length === 1 ? selectedRows[0].log_id : '';
    this._isMounted &&
      this.setState({
        selectedId: id,
      });
  };

  render() {
    return (
      <div
        id='cl-container'
        className='container cl-container min-vh-100'
        ref={this.conRef}
      >
        <Row>
          <Col className='justify-content-center d-flex'>
            <h5 className='mt-2 mb-2'>Chat History</h5>
          </Col>
        </Row>
        {this.state.successAlert && (
          <SuccessAlert
            successAlert={this.state.successAlert}
            text='Loading reference is successfully'
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
        <Row className='d-flex flex-row-reverse'>
          <Col xs='auto'>
            <Button
              color='success'
              disabled={this.state.selectedId === ''}
              onClick={this.toggleChatHistoryDetail}
            >
              <FontAwesomeIcon icon={faEye} color='white' />
              &nbsp; View chat log
            </Button>
            {this.state.modalChatHistoryDetail && (
              <ChatHistoryDetailModal
                isOpen={this.state.modalChatHistoryDetail}
                id={this.state.selectedId}
                toggle={this.toggleChatHistoryDetail}
              />
            )}
          </Col>
          <Col>
            <Button type='button' color='success' onClick={this.setRowData}>
              <FontAwesomeIcon icon={faSync} color='white' />
            </Button>
          </Col>
        </Row>
        <LoadingSpinner
          loading={this.state.loading}
          text='Loading chat history'
        ></LoadingSpinner>
        <div
          className='ag-theme-alpine'
          style={{
            height: `${this.state.containerHeight - 200}px`,
            marginTop: '10px',
          }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            rowData={this.state.chatHistoryList}
            rowSelection='single'
            onSelectionChanged={this.onRowSelected.bind(this)}
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            columnDefs={columnChatHistoryFieldDef}
            pagination={true}
            paginationAutoPageSize={true}
            onFirstDataRendered={this.onFirstDataRendered}
            frameworkComponents={frameworkComponentsForChatHistory}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

export default ChatHistoryList;
