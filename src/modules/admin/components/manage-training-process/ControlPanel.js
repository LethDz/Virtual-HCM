import {
  faFileCode,
  faPlayCircle,
  faStopCircle,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import {
  activations,
  SelectFileModal,
  classifierTypes,
} from 'src/modules/admin';

const ControlPanel = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const onStart = (event) => {
    event.preventDefault();
    props.remoteAction('start');
  };

  const onStop = (event) => {
    event.preventDefault();
    props.remoteAction('stop');
  };

  const onDefault = () => {
    props.setSettingToDefault();
  };

  const onABC = () => {
    props.onABC();
  };

  return (
    <Fragment>
      {openModal && (
        <SelectFileModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectTrainableData={props.selectTrainableData}
        />
      )}
      <Form className="control-panel p-3" onSubmit={onStart}>
        <FormGroup row>
          <Col>
            <Label for="data" className="text-sm">
              Data File:
            </Label>
            <br />
            <Button
              id="data"
              color="info"
              size="sm"
              onClick={() => setOpenModal(true)}
              className="mr-2"
              block
            >
              {props.state.data ? (
                props.state.data.filename
              ) : (
                <Fragment>
                  <FontAwesomeIcon icon={faFileCode} />
                  &nbsp;Select Data File
                </Fragment>
              )}
            </Button>
          </Col>
          <Col>
            <Label for="type" className="text-sm">
              Type:
            </Label>
            <Input
              bsSize="sm"
              type="select"
              name="type"
              id="type"
              value={props.state.type}
              onChange={props.inputChange}
              required
            >
              <option disabled>Select type</option>
              {Object.keys(classifierTypes).map((type, index) => (
                <option value={type} key={index}>
                  {classifierTypes[type]}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label for="sentence_length" className="text-sm">
              Sentence Length:
            </Label>
            <Input
              bsSize="sm"
              type="number"
              name="sentence_length"
              id="sentence_length"
              placeholder="Enter sentence length"
              value={props.state.sentence_length}
              onChange={props.inputChange}
              required
            />
          </Col>
          <Col>
            <Label for="batch" className="text-sm">
              Batch:
            </Label>
            <Input
              bsSize="sm"
              type="number"
              name="batch"
              id="batch"
              placeholder="Enter number of batch"
              value={props.state.batch}
              onChange={props.inputChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label for="epoch" className="text-sm">
              Epoch:
            </Label>
            <Input
              bsSize="sm"
              type="number"
              name="epoch"
              id="epoch"
              placeholder="Enter number of epoch"
              value={props.state.epoch}
              onChange={props.inputChange}
              required
            />
          </Col>
          <Col>
            <Label for="learning_rate" className="text-sm">
              Learning Rate:
            </Label>
            <Input
              bsSize="sm"
              type="number"
              name="learning_rate"
              id="learning_rate"
              placeholder="Enter learning rate"
              value={props.state.learning_rate}
              onChange={props.inputChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label for="epsilon" className="text-sm">
              Epsilon:
            </Label>
            <Input
              bsSize="sm"
              type="number"
              name="epsilon"
              id="epsilon"
              placeholder="Enter epsilon"
              value={props.state.epsilon}
              onChange={props.inputChange}
              required
            />
          </Col>
          <Col>
            <Label for="activation" className="text-sm">
              Activation:
            </Label>
            <Input
              bsSize="sm"
              type="select"
              name="activation"
              id="activation"
              placeholder="Select activation function"
              value={props.state.activation}
              onChange={props.inputChange}
              required
            >
              <option disabled>Select activation function</option>
              {activations.map((activation, index) => (
                <option key={index}>{activation}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="auto" className="pr-0">
            <ButtonGroup>
              <Button size="sm" color="success" type="submit">
                <FontAwesomeIcon icon={faPlayCircle} />
                &nbsp; Start
              </Button>
              <Button size="sm" color="danger" onClick={onStop}>
                <FontAwesomeIcon icon={faStopCircle} />
                &nbsp; Stop
              </Button>
            </ButtonGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="auto" className="pr-0">
            <ButtonGroup>
              <Button size="sm" color="primary" onClick={onABC}>
                <FontAwesomeIcon icon={faUndoAlt} />
                &nbsp; ABC button
              </Button>
              <Button size="sm" color="secondary" onClick={onDefault}>
                <FontAwesomeIcon icon={faUndoAlt} />
                &nbsp; Reset to default
              </Button>
            </ButtonGroup>
          </Col>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

export default ControlPanel;
