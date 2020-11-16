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
    let rowData = []
    console.log(this.props.rowData)
    this.props.rowData.forEach(data => {
      rowData.push({ sentence: data.sentence })
    })
    this.setState({ rowData: rowData })
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  onGridReady = (params) => {
    params.api.forEachNode((node) => {
      this.props.rowData.forEach((sentence) => {
        console.log(sentence)
        console.log(node)
        if (
          node.data.sentence === sentence.sentence &&
          sentence.accept === 1
        ) {
          node.setSelected(true);
        }
      });
    });
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
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
        results.push({ sentence: sentence.sentence, accept: 1 });
      } else {
        results.push({ sentence: sentence.sentence, accept: 0 });
      }
    });
    this._isMounted && this.setState({ selectedSentence: results });
  };

  setSelectedSentence = () => {
    this.props.setSelectedSentence(this.state.selectedSentence);
    this.props.toggle();
  };

  toggleThisModal = () => {
    !this.state.loading && this.props.toggle();
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggleThisModal}>
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
                style={{ height: 400, width: 465 }}
              >
                <AgGridReact
                  onGridReady={this.onGridReady}
                  rowData={this.state.rowData}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  columnDefs={columnGenSentenceDef}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.setSelectedSentence}>
                Create
              </Button>
            </ModalFooter>
          </Form>
        </LoadingSpinner>
      </Modal>
    );
  }
}

export default GenSynonymSentenceModal;
