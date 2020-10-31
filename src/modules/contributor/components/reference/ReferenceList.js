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
import { DOCUMENT_REFERENCE_LIST_PAGE } from "src/constants";
import { columnRefFieldDef } from "src/modules/contributor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "src/common/axiosClient";
import "src/static/stylesheets/reference.css";

class ReferenceList extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      referenceList: [],
      modalCreate: false,
      modalDetail: false,
      id: "",
      containerHeight: 0,
      selectedReference: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const containerHeight = document.getElementById("r-container").clientHeight;
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
    axiosClient
      .get(DOCUMENT_REFERENCE_LIST_PAGE)
      .then((response) => {
        const references = response.data.result_data.references;
        // sessionStorage.setItem("references", JSON.stringify(references));
        this.props.fetchAllDocumentReference(references);
        this.setState({
          referenceList: references,
        });
      })
      .catch((error) => {});
  };

  onRowDoubleClicked = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    let data = selectedRows.length === 1 ? selectedRows[0] : "";
    this.setState({
      selectedReference: data,
      modalDetail: !this.state.modalDetail,
    });
  };

  toggleReferenceDetail = () => {
    this.setState({
      modalDetail: !this.state.modalDetail,
    });
  };

  onCreateClick = () => {
    let currentState = this.state;
    currentState.modalCreate = !currentState.modalCreate;
    this.setState(currentState);
  };

  render() {
    return (
      <Container id="r-container" className="r-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h1>Document reference</h1>
          </Col>
        </Row>

        <Row className="d-flex flex-row-reverse">
          <Col xs="auto">
            <Button
              onClick={this.onCreateClick.bind(this)}
              className="r-button"
            >
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp; Add new
            </Button>
            <CreateReferenceModal modal={this.state.modalCreate} />
          </Col>
        </Row>

        <Row>
          <Col className="justify-content-center d-flex">
            <div
              className="ag-theme-alpine"
              style={{ height: "60vh", width: "95%" }}
            >
              <AgGridReact
                onGridReady={this.onGridReady}
                rowData={this.state.referenceList}
                rowSelection="single"
                onRowDoubleClicked={this.onRowDoubleClicked.bind(this)}
                columnDefs={columnRefFieldDef}
              ></AgGridReact>
              <ReferenceModal
                isOpen={this.state.modalDetail}
                data={this.state.selectedReference}
                toggle={this.toggleReferenceDetail}
              />
            </div>
          </Col>
        </Row>
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
