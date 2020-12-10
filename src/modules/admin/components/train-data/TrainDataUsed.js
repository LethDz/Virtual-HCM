import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import { Button, Col, Row, Tooltip } from 'reactstrap';

const TrainDataUsed = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const onSelectTrainData = (id) => {
    props.context.componentParent.modalCreateOnClickToSee(id);
    toggle();
  };

  const trainDataList = props.value.map((element) => {
    return (
      <Button
        color="link"
        key={`${props?.data.id}-${element.filename}`}
        onClick={() => onSelectTrainData(element.id)}
      >
        {element.filename}
      </Button>
    );
  });

  return (
    <div className="h-100 w-100 text-center">
      {props.value.length === 0 ? (
        <p>None</p>
      ) : (
        <Fragment>
          <Button
            color="primary"
            className="train-data-used-hover"
            onClick={toggle}
            id={`train-data-${props?.data.id}`}
            outline
          >
            {`${props?.value?.length} used`}&nbsp;
            <FontAwesomeIcon icon={faEye} />
          </Button>
          {isOpen && (
            <Tooltip
              placement="top"
              isOpen={isOpen}
              autohide={true}
              target={`train-data-${props?.data.id}`}
            >
              <Row className="row postag-tool-tip">
                <Col xs="auto">{trainDataList}</Col>
              </Row>
            </Tooltip>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default TrainDataUsed;
