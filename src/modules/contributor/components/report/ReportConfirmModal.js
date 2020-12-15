import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
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
import axiosClient from 'src/common/axiosClient';
import { handleInputHook } from 'src/common/handleInputChange';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { REPORT_TO_CONTRIBUTOR } from 'src/constants';

const ReportConfirmModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [reason, setReason] = useState('');
  const mounted = useRef(false);

  const toggle = () => {
    !loading && props.setOpenModal(false);
  };

  const onInputChange = (event, setState) => {
    mounted.current && handleInputHook(event, setState);
  };

  const onReport = (event) => {
    event.preventDefault();
    mounted.current && setLoading(true);
    mounted.current && setErrorAlert(false);
    const data = {
      knowledge_data_id: props.id,
      report_processing: {
        id: props.reportId,
        processor_note: reason,
      },
    };
    axiosClient
      .post(REPORT_TO_CONTRIBUTOR, data)
      .then((response) => {
        if (response.data.status) {
        //   addToast('Notify Successfully', {
        //     appearance: 'success',
        //   });
          mounted.current && toggle();
          props.toggleDetailModal();
          props.setToast();
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
    <Modal isOpen={props.openModal} toggle={toggle} unmountOnClose={true}>
      <ModalHeader toggle={toggle}>Report to contributor</ModalHeader>
      <LoadingSpinner loading={loading} text='Loading' type='MODAL'>
        <Form onSubmit={onReport}>
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
                <Label for='reason' className='text-danger'>
                  Do you want to report to contributor ?
                </Label>
                <Input
                  id='reason'
                  name='reason'
                  type='text'
                  placeholder='Please enter note...'
                  required
                  onChange={(event) => onInputChange(event, setReason)}
                  value={reason}
                />
              </Col>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' type='submit'>
              <FontAwesomeIcon icon={faVoteYea} />
              &nbsp; Report
            </Button>{' '}
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </LoadingSpinner>
    </Modal>
  );
};

export default ReportConfirmModal;
