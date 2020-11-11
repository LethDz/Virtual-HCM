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
import { columnGenSentenceDef } from 'src/modules/contributor/index';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { NLP, GENERATE_SIMILARIES } from 'src/constants';
import axiosClient from 'src/common/axiosClient';

class GenSynonymSentenceModal extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      gridApi: '',
      gridColumnApi: '',
      selectedSentence: [],
      rowData: props.similaries,
      loading: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  generate = () => {
    let data = { sentences: [] };
    data.sentences.push({
      sentence: this.props.createTokenizeSentence(),
      synonyms: this.props.createSynonymArray(),
    });
    axiosClient
      .post(NLP + GENERATE_SIMILARIES, data)
      .then((response) => {
        let data = [];
        response.data.result_data.similaries.forEach((sentences) => {
          sentences.forEach((sentence) => {
            data.push({ sentence: sentence });
          });
        });
        this._isMounted &&
          this.setState({
            rowData: data,
            loading: false,
          });
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
        this.props.setErrorAlert(true);
        this.props.setSuccessAlert(false);
      });
  };

  generateSentences = async () => {
    this.setState({ loading: true });
    await this.generate();
  };

  onGridReady = (params) => {
    if (this.props.currentRowData.length !== 0) {
      let data = [];
      this.props.currentRowData.forEach((question) => {
        data.push({ sentence: question.question });
      });
      this._isMounted && this.setState({ rowData: data });

      params.api.forEachNode((node) => {
        this.props.currentRowData.forEach((question) => {
          if (
            node.data.sentence === question.question &&
            question.accept === 1
          ) {
            node.setSelected(true);
          }
        });
      });
    } else {
      this.generateSentences();
    }
    this._isMounted &&
      this.setState({ gridApi: params.api, gridColumnApi: params.columnApi });
  };

  onSelectionChanged = () => {
    let nodes = this.state.gridApi.getSelectedNodes();
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
        results.push({ question: sentence.sentence, accept: 1 });
      } else {
        results.push({ question: sentence.sentence, accept: 0 });
      }
    });
    if (this._isMounted) this.setState({ selectedSentence: results });
  };

  setSelectedSentence = () => {
    this.props.setSelectedSentence(this.state.selectedSentence);
    this.props.toggle();
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <LoadingSpinner
          loading={this.state.loading}
          text="Generating sentences"
        >
          <Form>
            <ModalHeader toggle={this.props.toggle}>
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
