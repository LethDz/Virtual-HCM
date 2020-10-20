import React from "react";
import { Row, Col, Button } from "reactstrap";

const Synonym = (props) => {
  return (
    <Row className="mt-3" xs="1">
      <Col>
        <span>Synonyms: </span>
        <span ref={props.synonymFieldRef} id="synonym-field"></span>
        <Button className="ml-2" onClick={props.setSynonym}>
          Confirm
        </Button>
      </Col>
    </Row>
  );
};

export default Synonym;
