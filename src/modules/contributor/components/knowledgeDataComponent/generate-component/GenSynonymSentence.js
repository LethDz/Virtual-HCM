import React, { Component, Fragment } from 'react';
import { Row, Col, Button } from 'reactstrap';

import { GenSynonymSentenceModal } from 'src/modules/contributor/index';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faEye } from '@fortawesome/free-solid-svg-icons';

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
    if (this.props.questionValue) {
      let questionList = [];
      this.props.questionValue.generated_questions.forEach((question) => {
        questionList.push({ question: question.question });
      });
      this.setState({
        selectedSentences: questionList,
        similaries: this.props.currentRowData,
      });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleGenerateModal = () => {
    if (this._isMounted)
      this.setState({ isOpenGenerateModal: !this.state.isOpenGenerateModal });
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
    this.props.synonymsArray &&
      this.props.synonymsArray.forEach((synonym) => {
        synonym.synonyms.forEach((id) => {
          synonymsArray.push(id);
        });
      });
    return synonymsArray.filter(this.distinct);
  };

  setSelectedSentence = (selectedSentences) => {
    if (this._isMounted)
      this.setState(
        { selectedSentences: selectedSentences, similaries: selectedSentences },
        () => {
          this.props.setGeneratedSentences(
            this.state.selectedSentences,
            this.props.index
          );
        }
      );
  };

  toggleGenerateQuestionMode = () => {
    if (
      this.props.questionValue &&
      this.props.questionValue.generated_questions.length !== 0
    ) {
      return (
        <Fragment>
          <FontAwesomeIcon icon={faEye} /> View questions
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <FontAwesomeIcon icon={faCogs} /> Generate
        </Fragment>
      );
    }
  };

  render() {
    return (
      <div>
        {this.state.isOpenGenerateModal && (
          <GenSynonymSentenceModal
            createTokenizeSentence={this.createTokenizeSentence}
            createSynonymArray={this.createSynonymArray}
            currentRowData={this.props.currentRowData}
            toggle={this.toggleGenerateModal}
            similaries={this.state.similaries}
            loading={this.state.loading}
            isOpen={this.state.isOpenGenerateModal}
            setSelectedSentence={this.setSelectedSentence}
            setErrorAlert={this.props.setErrorAlert}
            setSuccessAlert={this.props.setSuccessAlert}
          />
        )}
        <Row xs="1">
          <Col xs="auto">
            <Button
              type="button"
              color="success"
              onClick={this.toggleGenerateModal}
            >
              {this.toggleGenerateQuestionMode()}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GenSynonymSentence);
