import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import 'src/static/stylesheets/contributor.list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { columnFieldDef } from 'src/modules/admin';
import { Link } from 'react-router-dom';
import { ADMIN_CONTRIBUTOR_CREATE_PAGE, ADMIN_CONTRIBUTOR_EDIT_PAGE, ADMIN_GET_USER_ALL } from 'src/constants';
import axiosClient from 'src/common/axiosClient';

class ContributorsList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      contributorsList: [],
      loading: false,
      id: '',
      containerHeight: 0,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const containerHeight = document.getElementById('cl-container')
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
    axiosClient.get(ADMIN_GET_USER_ALL).then((response) => {

    }).catch((error) => {

    });
    this.setState({
      contributorsList: [],
    });
    this.gridApi.sizeColumnsToFit();
  };

  onRowSelected = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let id = selectedRows.length === 1 ? selectedRows[0].id : '';
    this.setState({
      id,
    });
  };

  render() {
    return (
      <Container id="cl-container" className="cl-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Account List</h5>
          </Col>
        </Row>
        <Row className="d-flex flex-row-reverse">
          <Col xs="auto">
            <Button color="primary">
              <Link to={ADMIN_CONTRIBUTOR_CREATE_PAGE} className="link-no-underline">
                <FontAwesomeIcon icon={faPlus} color="white" />
                &nbsp; Create
              </Link>
            </Button>
          </Col>
          <Col xs="auto">
            <Button color="success" disabled={this.state.id === ''}>
              {this.state.id !== '' ? (
                <Link to={ADMIN_CONTRIBUTOR_EDIT_PAGE} className="link-no-underline">
                  <FontAwesomeIcon icon={faEdit} color="white" />
                  &nbsp; Edit
                </Link>
              ) : (
                <Fragment>
                  <FontAwesomeIcon icon={faEdit} color="white" />
                  &nbsp; Edit
                </Fragment>
              )}
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
            rowData={this.state.contributorsList}
            rowSelection="single"
            animateRows={true}
            onGridReady={this.onGridReady}
            onSelectionChanged={this.onRowSelected.bind(this)}
            columnDefs={columnFieldDef}
          ></AgGridReact>
        </div>
      </Container>
    );
  }
}

export default ContributorsList;
