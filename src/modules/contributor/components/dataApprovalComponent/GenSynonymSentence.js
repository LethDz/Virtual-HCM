import React, { Component } from 'react';
import { Row, Col, Label, Button, ListGroup, ListGroupItem } from 'reactstrap';

import { GenSynonymSentenceModal } from 'src/modules/contributor/index';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NLP, GENERATE_SIMILARIES } from 'src/constants';
import axiosClient from 'src/common/axiosClient';

class GenSynonymSentence extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      isOpenGenerateModal: false,
      similaries: [],
      loading: false,
      selectedSentences: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleGenerateModal = () => {
    if (this._isMounted)
      this.setState({ isOpenGenerateModal: !this.state.isOpenGenerateModal });
    if (!this.state.isOpenGenerateModal) this.generateSentences();
  };

  distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  createTokenizeSentence = () => {
    let tokenizedWordArray = [];
    this.props.tokenizedWordArray.forEach((word) => {
      tokenizedWordArray.push(word);
    });
    return tokenizedWordArray.join(' ');
  };

  createSynonymArray = () => {
    let synonymsArray = [];
    this.props.synonymsArray.forEach((synonym) => {
      synonym.synonyms.forEach((id) => {
        synonymsArray.push(id);
      });
    });
    return synonymsArray.filter(this.distinct);
  };

  generateSentences = () => {
    this.setState({ loading: false });
    let data = { sentences: [] };
    data.sentences.push({
      sentence: this.createTokenizeSentence(),
      synonyms: this.createSynonymArray(),
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
        if (this._isMounted)
          this.setState({
            similaries: data,
            loading: true,
          });
      })
      .catch((err) => {
        if (this._isMounted)
          this.setState({
            loading: false,
          });
        this.props.setErrorAlert(true);
        this.props.setSuccessAlert(false);
        this.props.scrollToTop();
      });
  };

  setSelectedSentence = (selectedSentences) => {
    if (this._isMounted)
      this.setState({ selectedSentences: selectedSentences }, () => {
        this.props.setGeneratedSentences(
          this.state.selectedSentences,
          this.props.index
        );
      });
  };

  removeSelectedGenSentence = (index) => {
    let selectedSentence = this.state.selectedSentences;
    if (index > -1) {
      selectedSentence.splice(index, 1);
    }
    if (this._isMounted)
      this.setState({ selectedSentence: selectedSentence }, () => {
        this.props.setGeneratedSentences(
          this.state.selectedSentences,
          this.props.index
        );
      });
  };

  render() {
    return (
      <div className="p-3">
        {this.state.isOpenGenerateModal && (
          <GenSynonymSentenceModal
            toggle={this.toggleGenerateModal}
            similaries={this.state.similaries}
            loading={!this.state.loading}
            isOpen={this.state.isOpenGenerateModal}
            setSelectedSentence={this.setSelectedSentence}
          />
        )}
        <Row xs="1">
          <Col xs="auto">
            <Label>Gen synonym sentences:</Label>
          </Col>
          <Col xs="auto">
            <Button
              type="button"
              color="success"
              onClick={this.toggleGenerateModal}
            >
              <FontAwesomeIcon icon={faPlus} /> Generate
            </Button>
          </Col>
        </Row>
        <ListGroup className="mt-3">
          {this.state.selectedSentences.map((sentence, index) => {
            return (
              <ListGroupItem key={index}>
                <Row>
                  <Col>{sentence.sentence}</Col>
                  <Col xs="auto">
                    <Button
                      color="danger"
                      onClick={() => {
                        this.removeSelectedGenSentence(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GenSynonymSentence);
