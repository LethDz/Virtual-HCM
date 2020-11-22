import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { ADMIN_GET_ALL_DELETED_TRAIN_DATA } from 'src/constants';
import {
  context,
  trainDataDeleted,
  getTrainDataDeleted,
  pullTrainDataDeleted,
} from 'src/modules/admin';

class TrainDataList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      containerHeight: 0,
    };
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
    this._isMounted && this.props.setErrorAlert(false);
    this._isMounted && this.props.setSuccessAlert(false);
    axiosClient
      .get(ADMIN_GET_ALL_DELETED_TRAIN_DATA)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result_data;
          this._isMounted && this.props.pullTrainDataDeleted(data);
          this._isMounted && this.props.setErrorAlert(false);
          this._isMounted && this.props.setSuccessAlert(true);
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

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text="Loading" />
        <div
          className="ag-theme-alpine"
          style={{
            height: `${this.state.containerHeight - 250}px`,
            marginTop: '10px',
          }}
        >
          <AgGridReact
            onFirstDataRendered={this.onFirstDataRendered}
            rowData={this.props.trainDataDeleted}
            rowSelection="single"
            animateRows={true}
            onGridReady={this.onGridReady}
            columnDefs={trainDataDeleted}
            context={context(this)}
            pagination={true}
          ></AgGridReact>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  trainDataDeleted: getTrainDataDeleted(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullTrainDataDeleted: (trainDataList) =>
    dispatch(pullTrainDataDeleted(trainDataList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainDataList);
