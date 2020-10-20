import React from "react";
import { Button } from "reactstrap";

const GenList = (props) => {
  let list;
  switch (props.type) {
    case "component":
      list = props.list.map((item, index) => {
        return (
          <div className="m-2">
            <div key={index}>
              <span>
               {item.type}: {item.components}
              </span>
              <Button
                className="ml-3"
                onClick={() => {
                  props.removeComponent(
                    props.currentState,
                    props.type,
                    item.type
                  );
                }}
              >
                remove
              </Button>
            </div>
          </div>
        );
      });
      break;
    case "critical":
      list = props.list.map((item, index) => {
        return (
          <div className="m-2">
            <div key={index}>
              <span>
                {item.type}: {item.criticalData}
              </span>
              <Button
                onClick={() => {
                  props.removeComponent(
                    props.currentState,
                    props.type,
                    item.type
                  );
                }}
              >
                remove
              </Button>
            </div>
          </div>
        );
      });
      break;
    case "coresponse":
      list = props.list.map((item, index) => {
        return (
          <div className="m-2">
            <div key={index}>
              <span>
                {item.type}: {item.coresponse}
              </span>
              <Button
                onClick={() => {
                  props.removeComponent(
                    props.currentState,
                    props.type,
                    item.type
                  );
                }}
              >
                remove
              </Button>
            </div>
          </div>
        );
      });
      break;
    default:
  }

  return <div>{list}</div>;
};

export default GenList;
