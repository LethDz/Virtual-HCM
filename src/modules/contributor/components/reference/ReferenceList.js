import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import {
  ReferenceModal,
  CreateReferenceModal,
  getAllDocumentReference,
  fetchAllDocumentReference,
} from "src/modules/contributor/index";
import { REFERENCE, ALL, ADD, EDIT, DELETE } from "src/constants";
import { columnRefFieldDef } from "src/modules/contributor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "src/common/axiosClient";
import LoadingSpinner from "src/common/loadingSpinner/LoadingSpinner";
import "src/static/stylesheets/reference.css";

class ReferenceList extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      referenceList: [],
      modalReferenceCreate: false,
      modalReferenceDetail: false,
      containerHeight: 0,
      selectedReference: {},
      loading: false,
    };
  }

  setRowData = () => {
    axiosClient
      .get(REFERENCE + ALL)
      .then((response) => {
        const references = response.data.result_data.references;
        this.props.fetchAllDocumentReference(references);
        this.setState({ loading: false });
      })
      .catch((error) => {});
  };

  componentDidMount() {
    this._isMounted = true;
    const containerHeight = document.getElementById("cl-container")
      .clientHeight;
    this.setState({ loading: true, containerHeight });
    this.setRowData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  onRowDoubleClicked = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let data = selectedRows.length === 1 ? selectedRows[0] : "";
    this.setState({
      selectedReference: data,
      modalReferenceDetail: !this.state.modalReferenceDetail,
    });
  };

  toggleReferenceDetail = () => {
    this.setState({
      modalReferenceDetail: !this.state.modalReferenceDetail,
    });
  };

  onReferenceCreateClick = () => {
    this.setState({
      modalReferenceCreate: !this.state.modalReferenceCreate,
    });
  };

  toggleReferenceCreate = () => {
    this.setState({
      modalReferenceCreate: !this.state.modalReferenceCreate,
    });
  };

  addReference = (newReference) => {
    this.setState({ loading: true });
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axiosClient.post(REFERENCE + ADD, newReference, config).then((response) => {
      this.setRowData();
      this.gridApi.setRowData(this.props.referenceList);
    });
  };

  editReference = (newReference) => {
    this.setState({ loading: true });
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axiosClient
      .post(REFERENCE + EDIT, newReference, config)
      .then((response) => {
        this.setRowData();
        this.gridApi.setRowData(this.props.referenceList);
      });
  };

  deleteReference = (id) => {
    this.setState({ loading: true });
    axiosClient.post(REFERENCE + DELETE, id).then((response) => {
      this.setRowData();
      this.gridApi.setRowData(this.props.referenceList);
    });
  };
  render() {
    return (
      <Container id="cl-container" className="cl-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h5>Document reference</h5>
          </Col>
        </Row>

        <Row className="d-flex flex-row-reverse">
          <Col xs="auto">
            <Button
              onClick={this.onReferenceCreateClick.bind(this)}
              className="r-button"
            >
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp; Create
            </Button>
            <CreateReferenceModal
              isOpen={this.state.modalReferenceCreate}
              toggle={this.toggleReferenceCreate}
              addReference={this.addReference}
            />
          </Col>
        </Row>
        <LoadingSpinner
          loading={this.state.loading}
          text="Loading reference"
        ></LoadingSpinner>
        <div
          className="ag-theme-alpine"
          style={{
            height: `${this.state.containerHeight - 200}px`,
            marginTop: "10px",
          }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            rowData={this.props.referenceList}
            rowSelection="single"
            onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
            columnDefs={columnRefFieldDef}
          ></AgGridReact>
          <ReferenceModal
            isOpen={this.state.modalReferenceDetail}
            data={this.state.selectedReference}
            toggle={this.toggleReferenceDetail}
            editReference={this.editReference}
            deleteReference={this.deleteReference}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  referenceList: getAllDocumentReference(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDocumentReference: (referenceList) =>
    dispatch(fetchAllDocumentReference(referenceList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceList);
