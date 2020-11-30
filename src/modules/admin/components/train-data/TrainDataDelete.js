import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
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
import axiosClient from 'src/common/axiosClient';
import { handleInputHook } from 'src/common/handleInputChange';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { ADMIN_DELETE_TRAIN_DATA } from 'src/constants';
import { deleteTrainData } from 'src/modules/admin';

const TrainDataDelete = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [reason, setReason] = useState('');
  const { addToast } = useToasts();
  const mounted = useRef(false);

  const toggle = () => {
    !loading && props.setOpenDeleteModal(false);
  };

  const onInputChange = (event, setState) => {
    mounted.current && handleInputHook(event, setState);
  };

  const onDelete = (event) => {
    event.preventDefault();
    mounted.current && setLoading(true);
    mounted.current && setErrorAlert(false);
    const data = {
      id: props.id,
      delete_reason: reason,
    };
    axiosClient
      .post(ADMIN_DELETE_TRAIN_DATA, data)
      .then((response) => {
        if (response.data && response.data.status) {
          props.deleteTrainData(props.id);
          addToast('Deleted Training Data Successfully', {
            appearance: 'success',
          });
          mounted.current && toggle();
        } else {
          mounted.current && setErrorAlert(true);
          mounted.current && setErrorList(response.data.messages);
        }

        mounted.current && setLoading(false);
      })
      .catch(() => {
        mounted.current && setLoading(false);
        mounted.current && setErrorAlert(true);
      });
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Modal isOpen={props.openDeleteModal} toggle={toggle} unmountOnClose={true}>
      <ModalHeader toggle={toggle}>Delete Training Data</ModalHeader>
      <LoadingSpinner loading={loading} text="Loading" type="MODAL">
        <Form onSubmit={onDelete}>
          <ModalBody>
            {errorAlert && (
              <ErrorAlert
                errorAlert={errorAlert}
                errorList={errorList}
                onDismiss={() => setErrorAlert(false)}
              />
            )}
            <FormGroup row>
              <Col>
                <Label for="reason" className="text-danger">
                  Are you sure to delete this Training Data ? Enter reason please
                </Label>
                <Input
                  id="reason"
                  name="reason"
                  type="text"
                  placeholder="Enter Reason To Delete"
                  required
                  onChange={(event) => onInputChange(event, setReason)}
                  value={reason}
                />
              </Col>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" type="submit">
              <FontAwesomeIcon icon={faVoteYea} />
              &nbsp; Confirm
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

const mapDispatchToProps = (dispatch) => ({
  deleteTrainData: (id) => dispatch(deleteTrainData(id)),
});

export default connect(null, mapDispatchToProps)(TrainDataDelete);
