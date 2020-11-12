import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import {
  getAllDocumentReference,
  fetchAllDocumentReference,
  columnReferenceListDef,
  CreateReferenceModal,
} from 'src/modules/contributor/index';
import { REFERENCE, ALL } from 'src/constants';
import { connect } from 'react-redux';

import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axiosClient from 'src/common/axiosClient';

import { handleInputChange } from 'src/common/handleInputChange';

class ReferenceModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      modal: false,
      selectedReference: '',
      gridApi: '',
      gridColumnApi: '',
      loading: false,
      page: 0,
      extraInfo: '',
      isOpenCreateReferenceModal: false,
      referenceList: [],
    };
  }

  handleInput = (event) => handleInputChange(event, this);

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  onGridReady = (params) => {
    this.setState({ loading: true });
    this.setData();
    if (this._isMounted)
      this.setState({ gridApi: params.api, gridColumnApi: params.columnApi });
  };

  setData = () => {
    if (this.props.documentReferenceList.length === 0) {
      axiosClient
        .get(REFERENCE + ALL)
        .then((response) => {
          this.props.fetchAllDocumentReference(
            response.data.result_data.references
          );
          this._isMounted &&
            this.setState({
              loading: false,
              referenceList: response.data.result_data.references,
            });
        })
        .catch((err) => {
          this._isMounted && this.setState({ loading: false });
          this.props.setErrorAlert(true);
          this.props.setSuccessAlert(false);
          this.props.scrollToTop();
        });
    } else {
      this._isMounted &&
        this.setState({
          loading: false,
          referenceList: this.props.documentReferenceList,
        });
    }
  };

  onSelectionChanged = () => {
    let nodes = this.state.gridApi.getSelectedNodes();
    let selectedRow = [];
    nodes.forEach((node) => {
      if (typeof node !== 'undefined') {
        selectedRow.push(node.data);
      }
    });
    let currentState = this.state;
    currentState.selectedReference = selectedRow[0];
    if (this._isMounted) this.setState(currentState);
  };

  addReference = () => {
    let selectedReference = this.state.selectedReference;
    let referenceObject = {
      id: selectedReference.reference_document_id,
      page: this.state.page,
      extra_info: this.state.extraInfo,
      reference_name: selectedReference.reference_name,
    };
    this.props.addReference(referenceObject);
    this.props.toggle();
  };

  toggleNewReferenceModal = () => {
    this._isMounted &&
      this.setState({
        isOpenCreateReferenceModal: !this.state.isOpenCreateReferenceModal,
      });
  };

  updateReferenceList = (referenceList) => {
    this._isMounted &&
      this.setState({
        referenceList: referenceList,
      });
  };

  toggleThisModal = () => {
    !this.state.loading && this.props.toggle();
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggleThisModal}>
        {this.state.isOpenCreateReferenceModal && (
          <CreateReferenceModal
            updateReferenceList={this.updateReferenceList}
            isOpen={this.state.isOpenCreateReferenceModal}
            toggle={this.toggleNewReferenceModal}
          />
        )}

        <ModalHeader toggle={this.toggleThisModal}>Reference</ModalHeader>
        <ModalBody>
          <LoadingSpinner type="MODAL" loading={this.state.loading} text="Loading reference">
            <div
              className="ag-theme-alpine"
              style={{ height: 400, width: 465 }}
            >
              <AgGridReact
                onGridReady={this.onGridReady}
                rowData={this.state.referenceList}
                rowSelection="single"
                rowMultiSelectWithClick
                onSelectionChanged={this.onSelectionChanged.bind(this)}
                columnDefs={columnReferenceListDef}
              ></AgGridReact>
            </div>
            <FormGroup>
              <Label>Page</Label>
              <Input
                type="number"
                name="page"
                min="0"
                value={this.state.page}
                onChange={this.handleInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Extra info</Label>
              <Input
                name="extraInfo"
                value={this.state.extraInfo}
                onChange={this.handleInput}
              />
            </FormGroup>
          </LoadingSpinner>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={this.toggleNewReferenceModal}>
            <FontAwesomeIcon icon={faPlus} />
            New reference
          </Button>
          <Button color="success" onClick={this.addReference}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  documentReferenceList: getAllDocumentReference(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDocumentReference: (documentReferenceList) =>
    dispatch(fetchAllDocumentReference(documentReferenceList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceModal);
