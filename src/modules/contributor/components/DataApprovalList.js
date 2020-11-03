import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM } from 'src/constants';
import { columnFieldDef } from 'src/modules/contributor/index';
import { AgGridReact } from 'ag-grid-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class DataApprovalList extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
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
    // axiosClient
    //   .get(ADMIN_GET_USER_ALL)
    //   .then((response) => {})
    //   .catch((error) => {});
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
            <Link
              to={CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM}
              className="link-no-underline"
            >
              <Button color="primary">
                <FontAwesomeIcon icon={faPlus} color="white" />
                &nbsp; Create
              </Button>
            </Link>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DataApprovalList);
