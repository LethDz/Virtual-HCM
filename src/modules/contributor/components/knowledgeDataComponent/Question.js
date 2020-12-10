import React, { Component, Fragment } from 'react';
import {
  Input,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  CustomInput,
  Tooltip,
  Badge,
  Label,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import {
  questionType,
  GenSynonymSentenceModal,
} from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrashAlt,
  faTasks,
  faListAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { NLP, TOKENIZE, GENERATE_SIMILARIES } from 'src/constants';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';

export default class Question extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      question: '',
      questionType: [],
      questions: [],
      tokenizeData: [],
      ner: [],
      loading: false,
      loadingMessage: '',
      generateLoading: false,
      type: [
        { id: 1, value: 1, isChecked: false },
        { id: 2, value: 2, isChecked: false },
        { id: 3, value: 3, isChecked: false },
        { id: 4, value: 4, isChecked: false },
        { id: 5, value: 5, isChecked: false },
        { id: 6, value: 6, isChecked: false },
        { id: 7, value: 7, isChecked: false },
      ],
      tooltipOpen: false,
      tooltipTypeOpen: false,
      isOpenGenerateModal: false,
      generated_sentences: [],
      saveGeneratedSentences: false,
    };
  }

  saveGeneratedSentences = (status) => {
    status === false &&
      this._isMounted &&
      this.setState({ generated_sentences: [] });
    this._isMounted && this.setState({ saveGeneratedSentences: status });
  };

  handleCheck = (event) => {
    let types = this.state.type;
    types.forEach((type) => {
      if (type.id.toString() === event.target.id.toString())
        type.isChecked = event.target.checked;
    });
    this.setState({ type: types });
  };

  componentDidMount = () => {
    this._isMounted = true;
    if (this.props.questionValue && this.props.questionValue.length) {
      let questionList = [];
      let generatedList = [];
      this.props.questionValue.forEach((question) => {
        questionList.push({
          question: question.question,
          type: question.type,
          generated_questions: question.generated_questions,
        });
        question.generated_questions.forEach((generated_questions) => {
          generatedList.push({
            sentence: generated_questions.question,
            accept: generated_questions.accept,
            question: question.question,
          });
        });
      });
      this.setState({
        questions: questionList,
        generated_sentences: generatedList,
        saveGeneratedSentences: true,
      });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  addQuestion = (question) => {
    this._isMounted && this.setState({ tooltipOpen: false });
    let hasType = false;
    this.state.type.forEach((type) => {
      if (type.isChecked === true) hasType = true;
    });
    if (!hasType) {
      this.openTypeToolTip();
      return;
    }

    if (this._isMounted) this.setState({ loading: true, loadingMessage: 'Adding questions' });
    const paragraph = {
      paragraph: question,
    };

    axiosClient
      .post(NLP + TOKENIZE, paragraph)
      .then((response) => {
        if (response.data.status) {
          let fullArray = [];
          response.data.result_data.pos.forEach((array) => {
            fullArray.push(...array);
          });
          let modifiedNer = [];
          let ner = response.data.result_data.ner;
          for (let sentenceIndex in ner) {
            for (let idx in ner[sentenceIndex]) {
              let type = ner[sentenceIndex][idx].type;
              let word = ner[sentenceIndex][idx].word;
              let index = ner[sentenceIndex][idx].start_idx;
              if (sentenceIndex === 0) {
                modifiedNer.push({
                  type: type,
                  word: word,
                  index: index,
                });
              } else {
                let index = ner[sentenceIndex][idx].start_idx;
                for (let i = 0; i < sentenceIndex; i++) {
                  index += response.data.result_data.pos[i].length;
                }
                modifiedNer.push({
                  type: type,
                  word: word,
                  index: index,
                });
              }
            }
          }
          let questionType = [];
          this.state.type.forEach((type) => {
            if (type.isChecked) questionType.push(type.value);
          });

          let questionsTemp = this.state.questions;
          let questionTemp = '';
          fullArray.forEach((word) => {
            questionTemp += word.value + ' ';
          });
          questionsTemp.push({
            question: questionTemp,
            type: questionType,
            generated_questions: [],
          });

          let typeState = [];
          this.state.questionType.forEach((type) => {
            typeState.push({ ...type, isChecked: false });
          });

          let type = [];
          this.state.type.forEach((item) => {
            type.push({ id: item.id, value: item.value, isChecked: false });
          });

          if (this._isMounted)
            this.setState({
              question: '',
              tokenizeData: fullArray,
              ner: modifiedNer,
              loading: false,
              questions: questionsTemp,
              type: type,
            });

          this.props.setQuestions(this.state.questions);
        } else {
          this.props.setErrorAlert(true);
          this.props.setSuccessAlert(false);
          this.props.setErrorList(response.data.messages);
          this.props.scrollToTop();
        }
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

  removeQuestion = (question) => {
    let questionsTemp = this.state.questions;
    const index = questionsTemp.indexOf(question);
    if (index > -1) {
      questionsTemp.splice(index, 1);
    }
    this.resetGeneratedQuestion();
    if (this._isMounted) this.setState(questionsTemp);
  };

  getQuestion = () => {
    return this.state.question;
  };

  openToolTip = () => {
    this._isMounted && this.setState({ tooltipTypeOpen: false });
    this._isMounted && this.setState({ tooltipOpen: !this.state.tooltipOpen });
  };

  openTypeToolTip = () => {
    this._isMounted &&
      this.setState({ tooltipTypeOpen: !this.state.tooltipTypeOpen });
  };

  setGeneratedSentences = (generatedSentences, index) => {
    let questions = this.state.questions;
    questions[index].generated_questions = generatedSentences;
    this.props.setQuestions(this.state.questions);
  };

  resetGeneratedQuestion = () => {
    let questions = this.state.questions;
    let questionList = [];
    questions.forEach((question) => {
      questionList.push({
        ...question,
        generated_questions: [],
      });
    });
    this.props.setQuestions(questionList);
    this.saveGeneratedSentences(false);
    this._isMounted &&
      this.setState({
        questions: questionList,
        generated_sentences: [],
        saveGeneratedSentences: false,
      });
  };

  onMouseOver = (event, value) => {};

  onMouseLeave = (event) => {};

  distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  createSynonymArray = () => {
    let synonymsArray = [];
    this.props.synonymIds &&
      this.props.synonymIds.forEach((synonym) => {
        synonym.synonyms.forEach((id) => {
          synonymsArray.push(id);
        });
      });
    return synonymsArray.filter(this.distinct);
  };

  prepareGenerateData = () => {
    let preSynonymList = this.createSynonymArray();
    let preDataList = [];
    for (let i in this.state.questions) {
      preDataList.push({
        sentence: this.createTokenizeSentence(i),
        synonyms: preSynonymList,
      });
    }
    return { sentences: preDataList };
  };

  generatedSentences = () => {
    let data = this.prepareGenerateData();
    this._isMounted &&
      this.setState({
        loading: true,
        loadingMessage: "Generating questions",
      });
    axiosClient
      .post(NLP + GENERATE_SIMILARIES, data)
      .then((response) => {
        if (response.data.status) {
          let data = [];
          response.data.result_data.similaries.forEach((sentences, index) => {
            sentences.forEach((sentence) => {
              data.push({
                accept: 0,
                sentence: sentence,
                question: this.state.questions[index].question,
              });
            });
          });
          this._isMounted &&
            this.setState({
              loading: false,
              generated_sentences: data,
            });

          this.toggleGenerateModal();
        } else {
          this._isMounted && this.setState({ loading: false });
          this.props.setErrorAlert(true);
          this.props.setSuccessAlert(false);
          this.props.scrollToTop();
        }
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
          this.props.setErrorAlert(true);
          this.props.setSuccessAlert(false);
          this.props.scrollToTop();
      });
  };

  viewGeneratedSentences = () => {
    this.toggleGenerateModal();
  };

  createTokenizeSentence = (index) => {
    let tokenizedWordArray = [];
    tokenizedWordArray = this.state.questions[index].question.split(' ');
    return tokenizedWordArray.join(' ');
  };

  toggleGenerateModal = () => {
    this._isMounted &&
      this.setState({ isOpenGenerateModal: !this.state.isOpenGenerateModal });
  };

  setSelectedSentence = (sentences) => {
    this.saveGeneratedSentences(true);

    let questions = this.state.questions;
    let generated_sentences = sentences;
    questions.forEach((question, index) => {
      let list = [];
      generated_sentences.forEach((generatedSentence) => {
        if (generatedSentence.question === question.question) {
          list.push({
            question: generatedSentence.sentence,
            accept: generatedSentence.accept,
          });
        }
      });
      questions[index].generated_questions = list;
    });

    this._isMounted &&
      this.setState({ generated_sentences: sentences, questions: questions });
    this.props.setQuestions(this.state.questions);
  };

  renderGenerateButton = () => {
    if (this.state.questions.length !== 0) {
      if (!this.state.saveGeneratedSentences) {
        return (
          <div className="d-flex justify-content-end mt-2">
            <Button
              block
              disabled={this.props.disable}
              onClick={this.generatedSentences}
            >
              <FontAwesomeIcon icon={faListAlt} /> Generate
            </Button>
          </div>
        );
      } else {
        return (
          <div className="d-flex justify-content-end mt-2">
            <Button block onClick={this.viewGeneratedSentences}>
              <FontAwesomeIcon icon={faEye} /> View
            </Button>
          </div>
        );
      }
    }
    return <Fragment></Fragment>;
  };

  render() {
    return (
      <Fragment>
        {this.state.isOpenGenerateModal && (
          <GenSynonymSentenceModal
            saveGeneratedSentences={this.saveGeneratedSentences}
            toggle={this.toggleGenerateModal}
            rowData={this.state.generated_sentences}
            isOpen={this.state.isOpenGenerateModal}
            setSelectedSentence={this.setSelectedSentence}
            disable={this.props.disable}
          />
        )}

        <LoadingSpinner loading={this.state.loading} text={this.state.loadingMessage}>
          <Row xs="1">
            <Col>
              <Label className="label">Question:</Label>
            </Col>
            {!this.props.disable && (
              <Col>
                <InputGroup>
                  <Input
                    disabled={this.props.disable}
                    placeholder="Enter question then choose type then press the add button :3"
                    type="text"
                    name="question"
                    id="question"
                    value={this.state.question}
                    onChange={this.handleInput}
                  />
                  <Tooltip
                    placement="top"
                    isOpen={this.state.tooltipTypeOpen}
                    autohide={true}
                    target="DisabledAutoHide"
                  >
                    Choose type before add question
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    isOpen={this.state.tooltipOpen}
                    autohide={false}
                    target="DisabledAutoHide"
                  >
                    <div className="row coresponse-tool-tip">
                      <Col xs="auto">
                        <CustomInput
                          className="check-box-tag"
                          type="checkbox"
                          id="1"
                          label="What"
                          checked={this.state.type[0].isChecked}
                          onChange={this.handleCheck}
                        />
                        <CustomInput
                          className="check-box-tag"
                          type="checkbox"
                          id="2"
                          label="When"
                          checked={this.state.type[1].isChecked}
                          onChange={this.handleCheck}
                        />
                        <CustomInput
                          className="check-box-tag"
                          type="checkbox"
                          checked={this.state.type[2].isChecked}
                          id="3"
                          label="Where"
                          onChange={this.handleCheck}
                        />
                        <CustomInput
                          className="check-box-tag"
                          type="checkbox"
                          label="Yes/No"
                          checked={this.state.type[6].isChecked}
                          id="7"
                          onChange={this.handleCheck}
                        />
                      </Col>
                      <Col xs="auto">
                        <CustomInput
                          className="check-box-tag"
                          type="checkbox"
                          checked={this.state.type[3].isChecked}
                          id="4"
                          label="Who"
                          onChange={this.handleCheck}
                        />
                        <CustomInput
                          className="check-box-tag"
                          type="checkbox"
                          checked={this.state.type[4].isChecked}
                          id="5"
                          label="Why"
                          onChange={this.handleCheck}
                        />
                        <CustomInput
                          className="check-box-tag"
                          type="checkbox"
                          checked={this.state.type[5].isChecked}
                          id="6"
                          label="How"
                          onChange={this.handleCheck}
                        />
                      </Col>
                    </div>
                  </Tooltip>
                  <InputGroupAddon addonType="append">
                    <Button
                      disabled={this.props.disable}
                      type="button"
                      color="warning"
                      id="DisabledAutoHide"
                      onClick={this.openToolTip}
                    >
                      <FontAwesomeIcon icon={faTasks} /> Choose Type
                    </Button>
                  </InputGroupAddon>
                  <InputGroupAddon addonType="append">
                    <Button
                      disabled={this.props.disable}
                      color="success"
                      onClick={() => {
                        if (this.getQuestion().trim() !== '') {
                          this.addQuestion(this.getQuestion());
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            )}
          </Row>
          <div>
            <ListGroup className="mt-1">
              {this.state.questions.map((question, index) => {
                let wordArray = question.question.split(' ');
                return (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col>
                        {wordArray.map((value, index) => {
                          return (
                            <span
                              key={index}
                              onMouseOver={(event) =>
                                this.onMouseOver(event, value)
                              }
                              onMouseLeave={this.onMouseLeave}
                            >
                              {value}{' '}
                            </span>
                          );
                        })}
                      </Col>
                      <Col xs="auto">
                        {question.type.map((value, index) => {
                          switch (value) {
                            case 1:
                              return (
                                <Fragment key={index}>
                                  <Badge color="primary" className="mt-1">
                                    {questionType[0]}
                                  </Badge>
                                  <br />
                                </Fragment>
                              );
                            case 2:
                              return (
                                <Fragment key={index}>
                                  <Badge color="secondary" className="mt-1">
                                    {questionType[1]}
                                  </Badge>
                                  <br />
                                </Fragment>
                              );
                            case 3:
                              return (
                                <Fragment key={index}>
                                  <Badge color="success" className="mt-1">
                                    {questionType[2]}
                                  </Badge>
                                  <br />
                                </Fragment>
                              );
                            case 4:
                              return (
                                <Fragment key={index}>
                                  <Badge color="danger" className="mt-1">
                                    {questionType[3]}
                                  </Badge>
                                  <br />
                                </Fragment>
                              );
                            case 5:
                              return (
                                <Fragment key={index}>
                                  <Badge color="warning" className="mt-1">
                                    {questionType[4]}
                                  </Badge>
                                  <br />
                                </Fragment>
                              );
                            case 6:
                              return (
                                <Fragment key={index}>
                                  <Badge color="info" className="mt-1">
                                    {questionType[5]}
                                  </Badge>
                                  <br />
                                </Fragment>
                              );
                            case 7:
                              return (
                                <Fragment key={index}>
                                  <Badge color="dark" className="mt-1">
                                    {questionType[6]}
                                  </Badge>
                                  <br />
                                </Fragment>
                              );
                            default:
                              return <p key={index}></p>;
                          }
                        })}
                      </Col>

                      {!this.props.disable && (
                        <Col xs="auto">
                          <Button
                            disabled={this.props.disable}
                            color="danger"
                            onClick={() => {
                              this.removeQuestion(question);
                              this.props.setQuestions(this.state.questions);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
          {this.renderGenerateButton()}
        </LoadingSpinner>
      </Fragment>
    );
  }
}
