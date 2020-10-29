import React, { Component } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import {
  CreateReferenceModal,
  ReferenceList,
  ReferenceListNew
} from "src/modules/contributor/index";
import "src/static/stylesheets/reference.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";

class ViewReference extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
  }

  onGridReady = (params) => {
    let currentState = this.state;
    currentState.gridApi = params.api;
    this.setState(currentState);
  };

  onClick = () => {
    let currentState = this.state;
    currentState.modal = !currentState.modal;
    this.setState(currentState);
  };

  render() {
    return (
      <Container className="r-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h1>Document reference</h1>
          </Col>
        </Row>

        <Row className="d-flex flex-row-reverse">
          <Col xs="auto">
            <Button onClick={this.onClick.bind(this)} className="r-button">
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp; Add new
            </Button>
            {/* <CreateReferenceModal modal={this.state.modal} /> */}
          </Col>
        </Row>

        <Row>
          <Col className="justify-content-center d-flex">
            <ReferenceListNew />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ViewReference;
