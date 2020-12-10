import { faDownload, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Badge,
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
  dataTypes,
  trainDataDetailKDCol,
} from 'src/modules/admin';
import {
  ADMIN_CHANGE_DESCRIPTION_TRAIN_DATA,
  ADMIN_DOWNLOAD_TRAIN_DATA,
  ADMIN_GET_TRAIN_DATA,
  API_PREFIX,
  API_URL,
} from 'src/constants';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'src/static/stylesheets/train.data.detail.css';

const TrainDataEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [gridApi, setGridApi] = useState(null);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [description, setDescription] = useState('');
  const mounted = useRef(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const propsRef = useRef(props);

  const onEdit = (event) => {
    event.preventDefault();
    mounted.current && setLoading(true);
    mounted.current && setErrorAlert(false);
    mounted.current && setSuccessAlert(false);

    const data = {
      id: props.id,
      description: description,
    };

    axiosClient
      .post(ADMIN_CHANGE_DESCRIPTION_TRAIN_DATA, data)
      .then((response) => {
        if (response.data.status) {
          const data = {
            ...props.trainDataDetail,
            description: description,
            id: props.id,
          };
          mounted.current && props.editTrainDataDescription(data);
          mounted.current && setSuccessAlert(true);
          toggle();
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
    props.resetSelection();
    !loading && props.setOpenEditModal(false);
  };

  const onInputChange = (event, setState) => {
    mounted.current && handleInputHook(event, setState);
  };

  const onFirstDataRendered = () => {
    gridApi.sizeColumnsToFit();
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    mounted.current = true;
    const propsReference = propsRef;

    return () => {
      propsReference.current.pullTrainDataDetail(null);
      mounted.current = false;
    };
  }, [props.openEditModal]);

  const onDownload = () => {
    return;
  };

  const onOpened = () => {
    axiosClient
      .get(`${ADMIN_GET_TRAIN_DATA}?id=${props.id}`)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.result_data;
          props.pullTrainDataDetail(data);
          setDescription(data.description);
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

  return (
    <Modal
      isOpen={props.openEditModal}
      toggle={toggle}
      unmountOnClose={true}
      size="lg"
      onOpened={onOpened}
    >
      <ModalHeader toggle={toggle}>Training Data Detail</ModalHeader>
      <LoadingSpinner loading={loading} text="Loading" type="MODAL">
        <Form onSubmit={onEdit}>
          <ModalBody className="train-data-edit-modal">
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
                text="Edit training data successfully."
                onDismiss={() => setSuccessAlert(false)}
              />
            )}
            {props.trainDataDetail && (
              <Fragment>
                <FormGroup row>
                  <Col>
                    <Label for="filename" className="font-weight-600">
                      Filename:
                    </Label>
                    <Input
                      id="filename"
                      name="filename"
                      type="text"
                      placeholder="Enter filename"
                      disabled
                      required
                      value={props.trainDataDetail?.filename}
                    />
                  </Col>
                  <Col>
                    <Label for="description" className="font-weight-600">
                      Description:
                    </Label>
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
                    <Label for="type" className="font-weight-600">
                      Type:
                    </Label>
                    <Badge
                      id="type"
                      color={dataTypes[props.trainDataDetail?.type].badge}
                      pill
                      style={{ fontSize: '1rem' }}
                      className="ml-5"
                    >
                      {dataTypes[props.trainDataDetail?.type].value}
                    </Badge>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Label for="table" className="font-weight-600">
                      Knowledge Data:
                    </Label>
                    <p className="text-muted font-sm">
                      * The information of the current knowledge data may be
                      changed, this information is at the time of training data
                      creation.
                    </p>
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
                        rowData={props.trainDataDetail?.knowledge_datas}
                        rowSelection="multiple"
                        animateRows={true}
                        onGridReady={onGridReady}
                        columnDefs={trainDataDetailKDCol}
                        pagination={true}
                        paginationAutoPageSize={true}
                      ></AgGridReact>
                    </div>
                    <br />
                    <a
                      href={`${API_URL}${API_PREFIX}${ADMIN_DOWNLOAD_TRAIN_DATA(
                        props.id
                      )}`}
                      download
                    >
                      <Button
                        color="primary"
                        id="btnDownload"
                        onClick={onDownload}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        &nbsp; Download Training Data File
                      </Button>
                    </a>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Label for="cdate" className="font-weight-600">
                      Created Date:
                    </Label>
                    <span id="cdate" className="d-flex">
                      {props.trainDataDetail?.cdate}
                    </span>
                  </Col>
                  <Col>
                    <Label for="mdate" className="font-weight-600">
                      Description Modified Date:
                    </Label>
                    <span id="mdate" className="d-flex">
                      {props.trainDataDetail?.cdate}
                    </span>
                  </Col>
                </FormGroup>
              </Fragment>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              type="submit"
              disabled={description === props.trainDataDetail?.description}
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
