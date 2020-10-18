import React from "react";

import { Button } from "reactstrap";
const GenList = (props) => {
  const list = props.list.map((item, index) => {
    return (
      <div>
        <div key={index}>
          <h1>
            <span>Type: {item.type}</span>
            <span>;{item.components}</span>
          </h1>
          <Button
            onClick={() => {
              props.removeComponent(props.currentState ,props.type, item.type);
            }}
          >
            remove
          </Button>
        </div>
      </div>
    );
  });
return (<div>{list}</div>)
};

export default GenList;
