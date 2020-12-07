import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { columnGenSentenceDef } from 'src/modules/contributor';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

class GenSynonymSentenceModal extends Component {
  _isMounted = false;
  _loadQuestion = false;
  question = [];
  constructor() {
    super();
    this.state = {
      gridApi: '',
      gridColumnApi: '',
      selectedSentence: [],
      loading: false,
      rowData: [],
      rowDataList: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.setData();
  };

  setData = () => {
    this.setState({
      rowData: this.props.rowData,
      rowDataList: this.props.rowData,
    });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    this.question = [];
  };

  onGridReady = (params) => {
    params.api.forEachNode((node, index) => {
      const row = this.props.rowData[index];
      if (row.accept === 1) {
        node.setSelected(true);
      }
    });
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  setSelectedSentence = () => {
    let idx = 0;
    let result = [];
    this.state.rowData.forEach((row) => {
      if (this.question[idx] && this.question[idx].sentence === row.sentence) {
        result.push({
          accept: 1,
          sentence: row.sentence,
          question: row.question,
        });
        idx++;
      } else {
        result.push({
          accept: 0,
          sentence: row.sentence,
          question: row.question,
        });
      }
    });
    this.props.setSelectedSentence(result);
    this.props.toggle();
  };

  discard = () => {
    this.props.saveGeneratedSentences(false);
    this.props.toggle();
  };

  toggleThisModal = () => {
    !this.state.loading && this.props.toggle();
  };

  onFirstDataRendered = () => {
    this.sizeToFit();
    this._loadQuestion = true;
  };

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  onSelectionChanged = () => {};

  onRowSelected = () => {
    if (this._loadQuestion) {
      this.question = this.gridApi.getSelectedRows();
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggleThisModal} size="lg">
        <LoadingSpinner
          type="MODAL"
          loading={this.state.loading}
          text="Generating sentences"
        >
          <Form>
            <ModalHeader toggle={this.toggleThisModal}>
              Generate sentence
            </ModalHeader>
            <ModalBody>
              <div
                className="ag-theme-alpine"
                style={{ height: 700, width: '100%' }}
              >
                <AgGridReact
                  onRowSelected={this.onRowSelected}
                  onFirstDataRendered={this.onFirstDataRendered}
                  onGridReady={this.onGridReady}
                  rowData={this.state.rowDataList}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  columnDefs={columnGenSentenceDef}
                  pagination={true}
                  paginationAutoPageSize={true}
                />
              </div>
            </ModalBody>
            {!this.props.disable && (
              <ModalFooter>
                <Button color="danger" onClick={this.discard}>
                  <FontAwesomeIcon icon={faBan} /> Discard
                </Button>
                <Button color="success" onClick={this.setSelectedSentence}>
                  <FontAwesomeIcon icon={faSave} /> Save
                </Button>
              </ModalFooter>
            )}
          </Form>
        </LoadingSpinner>
      </Modal>
    );
  }
}

export default GenSynonymSentenceModal;
