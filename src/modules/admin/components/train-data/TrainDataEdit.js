import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import { handleInputHook } from 'src/common/handleInputChange';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { ADMIN_CHANGE_DESCRIPTION_TRAIN_DATA } from 'src/constants';

const TrainDataEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [description, setDescription] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);

  const onCreate = () => {
    setLoading(true);
    setErrorAlert(false);
    setSuccessAlert(false);

    const data = {
      description: description,
    };

    axiosClient
      .post(ADMIN_CHANGE_DESCRIPTION_TRAIN_DATA, data)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result_data;
          props.addNewTrainData(data);
          resetForm();
          setSuccessAlert(true);
        } else {
          setErrorAlert(true);
          setErrorList(response.data.messages);
        }
        setLoading(false);
      })
      .catch(() => {
        setErrorAlert(true);
        setLoading(false);
      });
  };

  const toggle = () => {
    !loading && props.setOpenCreateModal(false);
  };

  const onInputChange = (event, setState) => {
    handleInputHook(event, setState);
  };

  const resetForm = () => {};

  return (
    <Modal
      isOpen={props.openCreateModal}
      toggle={toggle}
      unmountOnClose={true}
      size="lg"
    >
      <ModalHeader toggle={toggle}>Create Train Data File</ModalHeader>
      <LoadingSpinner loading={loading} text="Loading">
        <Form onSubmit={onCreate}>
          <ModalBody>
            {errorAlert && (
              <ErrorAlert
                errorAlert={errorAlert}
                errorList={errorList}
                onDismiss={() => setErrorAlert(false)}
              />
            )}
            {successAlert && (
              <SuccessAlert
                successAlert={successAlert}
                text="Add new train data successfully"
                onDismiss={() => setSuccessAlert(false)}
              />
            )}
            <FormGroup row>
              <Col>
                <Label for="filename">Filename:</Label>
                <Input
                  id="filename"
                  name="filename"
                  type="text"
                  placeholder="Enter filename"
                  required
                  value={props.trainDataDetail.filename}
                />
              </Col>
              <Col>
                <Label for="description">Description:</Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter description"
                  required
                  value={description}
                  onChange={(event) => onInputChange(event, setDescription)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label for="table">Knowledge Data:</Label>
              </Col>
            </FormGroup>
          </ModalBody>
        </Form>
      </LoadingSpinner>
      <ModalFooter>
        <Button
          color="info"
          type="submit"
          disabled={description === props.trainDataDetail.description}
        >
          <FontAwesomeIcon icon={faSave} />
          &nbsp; Save
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TrainDataEdit;
