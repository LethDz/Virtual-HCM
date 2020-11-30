import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
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
  ADMIN_ADD_TRAIN_DATA,
  KNOWLEDGE_DATA_ALL_TRAINABLE,
} from 'src/constants';
import { trainableKnowledgeCol, addNewTrainData } from 'src/modules/admin';

const TrainDataCreate = (props) => {
  const [loading, setLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState(false);
  const [knowledgeList, setKnowledgeList] = useState('');
  const [gridApi, setGridApi] = useState(null);
  const [errorList, setErrorList] = useState([]);
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [filename, setFilename] = useState('');
  const [description, setDescription] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const mounted = useRef(false);

  const onCreate = (event) => {
    event.preventDefault();
    mounted.current && setLoading(true);
    mounted.current && setErrorAlert(false);
    mounted.current && setSuccessAlert(false);

    const data = {
      filename: filename,
      description: description,
      include_data: knowledgeList,
    };

    axiosClient
      .post(ADMIN_ADD_TRAIN_DATA, data)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result_data;
          props.addNewTrainData(data);
          mounted.current && resetForm();
          mounted.current && toggle();
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
    !loading && props.setOpenCreateModal(false);
  };

  const onGridReady = async (params) => {
    await setGridApi(params.api);
    await axiosClient
      .get(KNOWLEDGE_DATA_ALL_TRAINABLE)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result_data.knowledges;
          setKnowledgeData(data);
          setErrorAlert(false);
        } else {
          setErrorAlert(true);
          setErrorList([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setErrorAlert(true);
        setLoading(false);
      });
  };

  const onRowSelected = () => {
    let selectedRows = gridApi.getSelectedRows();
    let knowledges =
      selectedRows.length > 0
        ? selectedRows.map((element) => {
            return element.id;
          })
        : '';
    mounted.current && setKnowledgeList(knowledges);
  };

  const onFirstDataRendered = () => {
    gridApi.sizeColumnsToFit();
  };

  const onInputChange = (event, setState) => {
    mounted.current && handleInputHook(event, setState);
  };

  const resetForm = () => {
    setDescription('');
    setFilename('');
    gridApi.deselectAll();
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Modal
      isOpen={props.openCreateModal}
      toggle={toggle}
      unmountOnClose={true}
      size="lg"
    >
      <ModalHeader toggle={toggle}>Create Training Data File</ModalHeader>
      <LoadingSpinner loading={loading} text="Loading" type="MODAL">
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
                text="Add new training data successfully"
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
                  value={filename}
                  onChange={(event) => onInputChange(event, setFilename)}
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
                <Label for="table">Select Knowledge Data:</Label>
                <div
                  id="table"
                  className="ag-theme-alpine"
                  style={{
                    height: 500,
                    width: '100%',
                  }}
                >
                  <AgGridReact
                    onFirstDataRendered={onFirstDataRendered}
                    rowData={knowledgeData}
                    rowSelection="multiple"
                    animateRows={true}
                    onGridReady={onGridReady}
                    onSelectionChanged={onRowSelected}
                    columnDefs={trainableKnowledgeCol}
                    pagination={true}
                    paginationAutoPageSize={true}
                  ></AgGridReact>
                </div>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info" type="submit" disabled={knowledgeList === ''}>
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; Create
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
  addNewTrainData: (newData) => dispatch(addNewTrainData(newData)),
});

export default connect(null, mapDispatchToProps)(TrainDataCreate);
