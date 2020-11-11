import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import {
  pullTrainableData,
  getTrainableData,
  trainableDataCol,
} from 'src/modules/admin';
import axiosClient from 'src/common/axiosClient';
import { ADMIN_GET_ALL_TRAINABLE_DATA } from 'src/constants';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';

const SelectFileModal = (props) => {
  const [loading, setLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState(false);
  const [dataFile, setDataFile] = useState('');
  const [gridApi, setGridApi] = useState(null);

  const onSelect = () => {
    props.selectTrainableData(dataFile);
    toggle();
  };

  const toggle = () => {
    !loading && props.setOpenModal(false);
  };

  const onGridReady = async (params) => {
    await setGridApi(params.api);

    if (props.trainableData.length === 0) {
      await axiosClient
        .get(ADMIN_GET_ALL_TRAINABLE_DATA)
        .then((response) => {
          if (response.data.status) {
            const data = response.data.result_data;
            props.pullTrainableData(data);
            setErrorAlert(false);
          } else {
            setErrorAlert(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setErrorAlert(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const onRowSelected = () => {
    let selectedRows = gridApi.getSelectedRows();
    let file = selectedRows.length === 1 ? selectedRows[0] : '';
    setDataFile(file);
  };

  const onFirstDataRendered = () => {
    gridApi.sizeColumnsToFit();
  };

  return (
    <Modal isOpen={props.openModal} toggle={toggle} unmountOnClose={true}>
      <ModalHeader toggle={toggle}>Select Data Files</ModalHeader>
      <LoadingSpinner loading={loading} text="Loading">
        <ModalBody>
          {errorAlert && (
            <ErrorAlert
              errorAlert={errorAlert}
              errorList={[]}
              onDismiss={() => setErrorAlert(false)}
            />
          )}
          <div
            className="ag-theme-alpine"
            style={{
              height: 400,
              width: 465,
            }}
          >
            <AgGridReact
              onFirstDataRendered={onFirstDataRendered}
              rowData={props.trainableData}
              rowSelection="single"
              animateRows={true}
              onGridReady={onGridReady}
              onSelectionChanged={onRowSelected}
              columnDefs={trainableDataCol}
              pagination={true}
            ></AgGridReact>
          </div>
        </ModalBody>
      </LoadingSpinner>
      <ModalFooter>
        <Button color="info" onClick={onSelect} disabled={dataFile === ''}>
          Select
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  trainableData: getTrainableData(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullTrainableData: (trainableData) =>
    dispatch(pullTrainableData(trainableData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFileModal);
