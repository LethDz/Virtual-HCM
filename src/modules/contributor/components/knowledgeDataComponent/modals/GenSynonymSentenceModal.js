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
  constructor(props) {
    super();
    this.state = {
      gridApi: '',
      gridColumnApi: '',
      selectedSentence: props.rowData,
      rowData: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    let rowData = [];
    this.props.rowData.forEach((data) => {
      rowData.push({ sentence: data.sentence, question: data.question });
    });
    this.setState({ rowData: rowData });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  onGridReady = (params) => {
    params.api.forEachNode((node) => {
      this.props.rowData.forEach((sentence) => {
        if (node.data.sentence === sentence.sentence && sentence.accept === 1) {
          node.setSelected(true);
        }
      });
    });
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onSelectionChanged = () => {
    let nodes = this.gridApi.getSelectedNodes();
    let selectedRow = [];
    nodes.forEach((node) => {
      if (typeof node !== 'undefined') {
        selectedRow.push(node.data);
      }
    });
    let results = [];
    this.state.rowData.forEach((sentence) => {
      let isSelected = false;
      selectedRow.forEach((row) => {
        if (sentence.sentence === row.sentence) {
          isSelected = true;
        }
      });

      if (isSelected) {
        results.push({
          question: sentence.question,
          sentence: sentence.sentence,
          accept: 1,
        });
      } else {
        results.push({
          question: sentence.question,
          sentence: sentence.sentence,
          accept: 0,
        });
      }
    });
    this._isMounted && this.setState({ selectedSentence: results });
  };

  setSelectedSentence = () => {
    this.props.setSelectedSentence(this.state.selectedSentence);
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
  };

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
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
                  onFirstDataRendered={this.onFirstDataRendered}
                  onGridReady={this.onGridReady}
                  rowData={this.state.rowData}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  onSelectionChanged={this.onSelectionChanged.bind(this)}
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
