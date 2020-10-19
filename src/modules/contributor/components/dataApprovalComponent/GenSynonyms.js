import React from "react";
import { Button } from "reactstrap";

const GenSynonyms = (props) => {
  const list = props.list.map((item, index) => {
    return (
      <div>
        <div key={index}>
          <h1>
            <span>Word: {item.word}</span>
            <span>
              ; With meaning{" "}
              {item.list.map((meaning) => {
                return <span>{meaning}</span>;
              })}
            </span>
          </h1>
          <Button
            onClick={() => {
              props.removeSynonym(props.currentState, item.word);
            }}
          >
            remove
          </Button>
        </div>
      </div>
    );
  });
  return <div>{list}</div>;
};

export default GenSynonyms;
