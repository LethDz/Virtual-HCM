import { faEdit, faPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { ADMIN_GET_ALL_TRAIN_DATA } from 'src/constants';
import {
  context,
  trainDataCol,
  pullTrainDataList,
  getTrainDataList,
  frameworkComponentsData,
  TrainDataCreate,
} from 'src/modules/admin';

class TrainDataList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      id: '',
      containerHeight: 0,
      errorAlert: false,
      successAlert: false,
      trainDataList: [],
      errorList: [],
      openCreateModal: false,
      openEditModal: false,
    };
    this.conRef = React.createRef('');
  }

  componentDidMount() {
    this._isMounted = true;
    this.setStyleForGrid();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.props.trainDataList.length === 0) {
      axiosClient
        .get(ADMIN_GET_ALL_TRAIN_DATA)
        .then((response) => {
          if (response.data.status) {
            const data = response.data.result_data;
            this.props.pullTrainDataList(data);
            this.setTrainDataList(data);
            this.setErrorAlert(false);
            this.setSuccessAlert(true);
          } else {
            this.setErrorAlert(true);
            this.setSuccessAlert(false);
          }
          this.setLoading(false);
        })
        .catch(() => {
          this.setLoading(false);
          this.setErrorAlert(true);
        });
    } else {
      this.setLoading(false);
      this.setErrorAlert(false);
      this.setSuccessAlert(false);
      this.setTrainDataList(this.props.trainDataList);
    }
  };

  setTrainDataList = (list) => {
    this._isMounted &&
      this.setState({
        trainDataList: list,
      });
  };

  setStyleForGrid = () => {
    const containerHeight =
      this.conRef.current && this.conRef.current.clientHeight;
    this._isMounted &&
      this.setState({
        containerHeight,
      });
  };

  onFirstDataRendered = () => {
    this.setStyleForGrid();
    this.sizeToFit();
  };

  onRowSelected = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id = selectedRows.length === 1 ? selectedRows[0].user_id : '';
    this.setState({
      id,
    });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
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

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  setOpenCreateModal = (status) => {
    this._isMounted &&
      this.setState({
        openCreateModal: status,
      });
  };

  setOpenEditModal = (status) => {
    this._isMounted &&
      this.setState({
        openEditModal: status,
      });
  };

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text="Loading" />
        {this.state.openCreateModal && (
          <TrainDataCreate
            openCreateModal={this.setOpenEditModal}
            setOpenCreateModal={this.setOpenCreateModal}
          />
        )}
        <div
          id="cl-container"
          className="cl-container container min-vh-100"
          ref={this.conRef}
        >
          {this.state.successAlert && (
            <SuccessAlert
              successAlert={this.state.successAlert}
              text="Request is successfully"
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
          <Row>
            <Col className="justify-content-center d-flex">
              <h5 className="mt-2 mb-2">Train Data List</h5>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse">
            <Col xs="auto">
              <Button
                color="primary"
                onClick={() => this.setOpenCreateModal(true)}
              >
                <FontAwesomeIcon icon={faPlus} color="white" />
                &nbsp; Create
              </Button>
            </Col>
            <Col xs="auto">
              <Button color="success" disabled={this.state.id === ''}>
                <FontAwesomeIcon icon={faEdit} color="white" />
                &nbsp; Edit
              </Button>
            </Col>
            <Col xs="auto" className="mr-auto">
              <Button color="info" onClick={this.sizeToFit}>
                <FontAwesomeIcon icon={faWrench} color="white" />
                &nbsp; Size column to Fit
              </Button>
            </Col>
          </Row>
          <div
            className="ag-theme-alpine"
            style={{
              height: `${this.state.containerHeight - 200}px`,
              marginTop: '10px',
            }}
          >
            <AgGridReact
              onFirstDataRendered={this.onFirstDataRendered}
              rowData={this.state.trainDataList}
              rowSelection="single"
              animateRows={true}
              onGridReady={this.onGridReady}
              onSelectionChanged={this.onRowSelected.bind(this)}
              columnDefs={trainDataCol}
              context={context(this)}
              frameworkComponents={frameworkComponentsData}
              pagination={true}
            ></AgGridReact>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  trainDataList: getTrainDataList(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullTrainDataList: (trainDataList) =>
    dispatch(pullTrainDataList(trainDataList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainDataList);
