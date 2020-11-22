import React, { Component, Fragment } from 'react';
import { Button, Col, Row } from 'reactstrap';
import 'src/static/stylesheets/contributor.list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWrench,
  faUserPlus,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import {
  columnFieldDef,
  context,
  frameworkComponents,
} from 'src/modules/admin';
import { Link } from 'react-router-dom';
import {
  ADMIN_CONTRIBUTOR_CREATE_PAGE,
  ADMIN_CONTRIBUTOR_EDIT_PAGE,
  ADMIN_GET_USER_ALL,
} from 'src/constants';
import axiosClient from 'src/common/axiosClient';
import { connect } from 'react-redux';
import { getContributorsList, pullContributorsList } from 'src/modules/admin';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';

class ContributorsList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      id: '',
      containerHeight: 0,
      containerWidth: 0,
      errorAlert: false,
      successAlert: false,
      contributorsList: [],
      errorList: [],
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
    if (this.props.contributors.length === 0) {
      axiosClient
        .get(ADMIN_GET_USER_ALL)
        .then((response) => {
          if (response.data.status) {
            const users = response.data.result_data.users;
            this.props.pullContributorsList(users);
            this.setContributorsList(users);
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
      this.setContributorsList(this.props.contributors);
    }
  };

  setContributorsList = (list) => {
    this._isMounted &&
      this.setState({
        contributorsList: list,
      });
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

  onFirstDataRendered = () => {
    this.gridApi.sizeColumnsToFit();
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

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text="Loading" />
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
              <h5 className="mt-2 mb-2">Account List</h5>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse">
            <Col xs="auto">
              <Link
                to={ADMIN_CONTRIBUTOR_CREATE_PAGE}
                className="link-no-underline"
              >
                <Button color="primary">
                  <FontAwesomeIcon icon={faUserPlus} color="white" />
                  &nbsp; Create
                </Button>
              </Link>
            </Col>
            <Col xs="auto">
              {this.state.id !== '' ? (
                <Link
                  to={ADMIN_CONTRIBUTOR_EDIT_PAGE(this.state.id)}
                  className="link-no-underline"
                >
                  <Button color="success">
                    <FontAwesomeIcon icon={faUserEdit} color="white" />
                    &nbsp; Edit
                  </Button>
                </Link>
              ) : (
                <Button color="success" disabled={this.state.id === ''}>
                  <FontAwesomeIcon icon={faUserEdit} color="white" />
                  &nbsp; Edit
                </Button>
              )}
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
              rowData={this.state.contributorsList}
              rowSelection="single"
              animateRows={true}
              onGridReady={this.onGridReady}
              onSelectionChanged={this.onRowSelected.bind(this)}
              columnDefs={columnFieldDef(this.state.containerWidth)}
              frameworkComponents={frameworkComponents}
              context={context(this)}
              pagination={true}
              paginationAutoPageSize={true}
            ></AgGridReact>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  contributors: getContributorsList(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullContributorsList: (contributorsList) =>
    dispatch(pullContributorsList(contributorsList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContributorsList);
