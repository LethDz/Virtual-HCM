import {
  faEdit,
  faPlus,
  faTrash,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
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
  pullTrainDataDetail,
  TrainDataEdit,
  TrainDataDelete,
} from 'src/modules/admin';

class TrainDataList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      id: '',
      containerHeight: 0,
      openCreateModal: false,
      openEditModal: false,
      openDeleteModal: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setStyleForGrid();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  refreshTable = () => {
    this.setLoading(true);
    axiosClient
      .get(ADMIN_GET_ALL_TRAIN_DATA)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result_data;
          this._isMounted && this.props.pullTrainDataList(data);
          this._isMounted && this.props.setErrorAlert(false);
        } else {
          this._isMounted && this.props.setErrorAlert(true);
          this._isMounted && this.props.setSuccessAlert(false);
        }
        this.setLoading(false);
        this.sizeToFit();
      })
      .catch(() => {
        this.setLoading(false);
        this._isMounted && this.props.setErrorAlert(true);
      });
  };

  onGridReady = async (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this._isMounted && this.props.setErrorAlert(false);
    this._isMounted && this.props.setSuccessAlert(false);
    await this.refreshTable();
  };

  setStyleForGrid = () => {
    const containerHeight =
      this.props.conRef && this.props.conRef.current.clientHeight;
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
    let id = selectedRows.length === 1 ? selectedRows[0].id : '';
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

  onRowDoubleClicked = () => {
    this.setOpenEditModal(true);
  };

  setOpenDeleteModal = (status) => {
    this._isMounted &&
      this.setState({
        openDeleteModal: status,
      });
  };

  resetSelection = () => {
    this._isMounted && this.setState({ id: '' });
    this.gridApi.deselectAll();
  };

  modalCreateOnClickToSee = (id) => {
    this.setState(
      {
        id,
      },
      () => this.setOpenEditModal(true)
    );
  };

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text="Loading" />
        {this.state.openCreateModal && (
          <TrainDataCreate
            openCreateModal={this.state.openCreateModal}
            setOpenCreateModal={this.setOpenCreateModal}
            modalCreateOnClickToSee={this.modalCreateOnClickToSee}
          />
        )}
        {this.state.openEditModal && (
          <TrainDataEdit
            id={this.state.id}
            openEditModal={this.state.openEditModal}
            setOpenEditModal={this.setOpenEditModal}
            resetSelection={this.resetSelection}
          />
        )}
        {this.state.openDeleteModal && (
          <TrainDataDelete
            id={this.state.id}
            openDeleteModal={this.state.openDeleteModal}
            setOpenDeleteModal={this.setOpenDeleteModal}
          />
        )}
        <Row>
          <Col>
            <Button type="button" color="success" onClick={this.refreshTable}>
              <FontAwesomeIcon icon={faSync} color="white" />
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              color="danger"
              onClick={() => this.setOpenDeleteModal(true)}
              disabled={this.state.id === ''}
            >
              <FontAwesomeIcon icon={faTrash} />
              &nbsp; Delete
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              color="success"
              disabled={this.state.id === ''}
              onClick={() => this.setOpenEditModal(true)}
            >
              <FontAwesomeIcon icon={faEdit} color="white" />
              &nbsp; Edit
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              color="primary"
              onClick={() => this.setOpenCreateModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp; Create
            </Button>
          </Col>
        </Row>
        <div
          className="ag-theme-alpine"
          style={{
            height: `${this.state.containerHeight - 250}px`,
            marginTop: '10px',
          }}
        >
          <AgGridReact
            onFirstDataRendered={this.onFirstDataRendered}
            rowData={this.props.trainDataList}
            rowSelection="single"
            animateRows={true}
            onGridReady={this.onGridReady}
            onSelectionChanged={this.onRowSelected.bind(this)}
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            columnDefs={trainDataCol}
            context={context(this)}
            frameworkComponents={frameworkComponentsData}
            pagination={true}
            paginationAutoPageSize={true}
          ></AgGridReact>
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
  pullTrainDataDetail: (dataDetail) =>
    dispatch(pullTrainDataDetail(dataDetail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainDataList);
