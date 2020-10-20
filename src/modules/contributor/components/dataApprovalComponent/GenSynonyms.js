import React from "react";
import { Button, Row, Col } from "reactstrap";

const GenSynonyms = (props) => {
  const list = props.list.map((item, index) => {
    return (
      <div>
        <Row key={index}>
          <Col>
            <span>Word: {item.word}</span>
            <span>
              ; With meaning{" "}
              {item.list.map((meaning) => {
                return <span>{meaning}</span>;
              })}
            </span>
          </Col>
          <Col>
            <Button
              onClick={() => {
                props.removeSynonym(props.currentState, item.word);
              }}
            >
              remove
            </Button>
          </Col>
        </Row>
      </div>
    );
  });
  return <div>{list}</div>;
};

export default GenSynonyms;
