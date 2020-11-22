import { faDownload, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
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
import {
  getTrainDataDetail,
  editTrainDataDescription,
  pullTrainDataDetail,
} from 'src/modules/admin';
import {
  ADMIN_CHANGE_DESCRIPTION_TRAIN_DATA,
  ADMIN_DOWNLOAD_TRAIN_DATA,
  API_PREFIX,
  API_URL,
} from 'src/constants';
import { connect } from 'react-redux';

const TrainDataEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [description, setDescription] = useState(
    props.trainDataDetail.description
  );
  const mounted = useRef(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const propsRef = useRef(props);

  const onEdit = (event) => {
    event.preventDefault();
    mounted.current && setLoading(true);
    mounted.current && setErrorAlert(false);
    mounted.current && setSuccessAlert(false);

    const data = {
      id: props.trainDataDetail.id,
      description: description,
    };

    axiosClient
      .post(ADMIN_CHANGE_DESCRIPTION_TRAIN_DATA, data)
      .then((response) => {
        if (response.data.status) {
          const data = {
            id: props.trainDataDetail.id,
            filename: props.trainDataDetail.filename,
            type: props.trainDataDetail.type,
            description: description,
            cdate: props.trainDataDetail.cdate,
            mdate: props.trainDataDetail.mdate,
          };
          mounted.current && props.editTrainDataDescription(data);
          mounted.current && setSuccessAlert(true);
        } else {
          mounted.current && setErrorAlert(true);
          mounted.current && setErrorList(response.data.messages);
        }
        mounted.current && setLoading(false);
      })
      .catch(() => {
        mounted.current && setErrorAlert(true);
        mounted.current && setLoading(false);
      });
  };

  const toggle = () => {
    !loading && props.setOpenEditModal(false);
  };

  const onInputChange = (event, setState) => {
    mounted.current && handleInputHook(event, setState);
  };

  const url = `${API_URL}${API_PREFIX}${ADMIN_DOWNLOAD_TRAIN_DATA(
    props.trainDataDetail.id
  )}`;

  useEffect(
    (props) => {
      mounted.current = true;
      const propsReference = propsRef;

      return () => {
        propsReference.current.pullTrainDataDetail(null);
        mounted.current = false;
      };
    },
    [props.openEditModal]
  );

  const onDownload = () => {
    return;
  };

  return (
    <Modal isOpen={props.openEditModal} toggle={toggle} unmountOnClose={true}>
      <ModalHeader toggle={toggle}>Train Data Detail</ModalHeader>
      <LoadingSpinner loading={loading} text="Loading" type="MODAL">
        <Form onSubmit={onEdit}>
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
                text="Edit train data successfully."
                onDismiss={() => setSuccessAlert(false)}
              />
            )}
            <FormGroup row>
              <Col>
                <Label for="id">ID:</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="Enter id"
                  disabled
                  required
                  value={props.trainDataDetail.id}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label for="filename">Filename:</Label>
                <Input
                  id="filename"
                  name="filename"
                  type="text"
                  placeholder="Enter filename"
                  disabled
                  required
                  value={props.trainDataDetail.filename}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
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
                <Label for="btnDownload">Knowledge Data:</Label>
                <br />
                <a href={url} download>
                  <Button color="primary" id="btnDownload" onClick={onDownload}>
                    <FontAwesomeIcon icon={faDownload} />
                    &nbsp; Download Training Data File
                  </Button>
                </a>
              </Col>
            </FormGroup>
          </ModalBody>
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
        </Form>
      </LoadingSpinner>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  trainDataDetail: getTrainDataDetail(state),
});

const mapDispatchToProps = (dispatch) => ({
  editTrainDataDescription: (data) => dispatch(editTrainDataDescription(data)),
  pullTrainDataDetail: (dataDetail) =>
    dispatch(pullTrainDataDetail(dataDetail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainDataEdit);
