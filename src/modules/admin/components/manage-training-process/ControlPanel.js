import {
  faFileCode,
  faPlayCircle,
  faPlug,
  faStopCircle,
  faSyncAlt,
  faTimes,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import {
  activations,
  SelectFileModal,
  classifierTypes,
} from 'src/modules/admin';

const ControlPanel = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const onConnect = (event) => {
    event.preventDefault();
    props.remoteAction('connect');
  };

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

  const onReloadModal = () => {};

  return (
    <Fragment>
      <Row>
        <Col className="d-flex">
          <h6 className="mt-2 mb-2 text-primary">Control Panel: </h6>
        </Col>
      </Row>
      {openModal && (
        <SelectFileModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectTrainableData={props.selectTrainableData}
        />
      )}
      <Form className="control-panel p-3" onSubmit={onConnect}>
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
            >
              <FontAwesomeIcon icon={faFileCode} />
              &nbsp; Select Data File
            </Button>
            <br />
            {props.state.data && (
              <Fragment>
                <Badge color="success" pill className="mt-2">
                  {props.state.data.filename}
                </Badge>
                <Button
                  className="link-unstyled"
                  color="link"
                  onClick={() => props.selectTrainableData(null)}
                >
                  <FontAwesomeIcon icon={faTimes} color="red" />
                </Button>
              </Fragment>
            )}
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
              Learing Rate:
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
            <Button size="sm" color="primary" type="submit">
              <FontAwesomeIcon icon={faPlug} />
              &nbsp; Connect
            </Button>
          </Col>
          <Col xs="auto" className="pr-0">
            <Button size="sm" color="success" onClick={onStart}>
              <FontAwesomeIcon icon={faPlayCircle} />
              &nbsp; Start
            </Button>
          </Col>
          <Col xs="auto" className="pr-0">
            <Button size="sm" color="danger" onClick={onStop}>
              <FontAwesomeIcon icon={faStopCircle} />
              &nbsp; Stop
            </Button>
          </Col>
          <Col xs="auto" className="pr-0">
            <Button size="sm" color="secondary" onClick={onDefault}>
              <FontAwesomeIcon icon={faUndoAlt} />
              &nbsp; Reset to default
            </Button>
          </Col>
          <Col xs="auto" className="ml-auto">
            <Button size="sm" color="warning" onClick={onReloadModal}>
              <FontAwesomeIcon icon={faSyncAlt} />
              &nbsp; Reload Model
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

export default ControlPanel;
