import React, { Component } from 'react';
import {
  Input,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  FormGroup,
  CustomInput,
  Tooltip,
} from 'reactstrap';
import { GenSynonymSentence } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import { NLP, TOKENIZE } from 'src/constants';
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
    };
  }

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
      this.props.questionValue.forEach((question) => {
        questionList.push({
          question: question.question,
          type: question.type,
          generated_questions: question.generated_questions,
        });
      });
      this.setState({ questions: questionList });
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
      this.props.setErrorAlert(true);
      this.props.setErrorList(['You need to add type for question']);
      this.props.scrollToTop();
      return;
    }

    if (this._isMounted) this.setState({ loading: true });
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
          this.props.setAlertMessage('Tokenize question successful');
          this.props.setSuccessAlert(true);
        } else {
          this.props.setErrorAlert(true);
          this.props.setErrorList(response.data.messages);
          this.props.scrollToTop();
        }
      })
      .then(() => {
        this.props.setTokenizeWord(this.state.tokenizeData, this.state.ner);
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
    if (this._isMounted) this.setState(questionsTemp);
  };

  getQuestion = () => {
    return this.state.question;
  };

  openToolTip = () => {
    this._isMounted && this.setState({ tooltipOpen: !this.state.tooltipOpen });
  };

  setGeneratedSentences = (generatedSentences, index) => {
    let questions = this.state.questions;
    questions[index].generated_questions = generatedSentences;
    this.props.setGeneratedSentences(generatedSentences, index);
  };

  render() {
    return (
      <div className="p-3">
        <LoadingSpinner loading={this.state.loading} text="Tokenizing question">
          <Row xs="1">
            <Col>Question</Col>
            <Col>
              <Row>
                <Col>
                  <Input
                    type="text"
                    name="question"
                    id="question"
                    value={this.state.question}
                    onChange={this.handleInput}
                  />
                </Col>
                <FormGroup>
                  <Row>
                    <Col>
                      <Button
                        type="button"
                        color="warning"
                        id="DisabledAutoHide"
                        onClick={this.openToolTip}
                      >
                        <FontAwesomeIcon icon={faTasks} /> Choose Type
                      </Button>
                      <Tooltip
                        placement="top"
                        isOpen={this.state.tooltipOpen}
                        autohide={false}
                        target="DisabledAutoHide"
                      >
                        <Row>
                          <Col>
                            <CustomInput
                              type="checkbox"
                              id="1"
                              label="What"
                              checked={this.state.type[0].isChecked}
                              onChange={this.handleCheck}
                            />
                            <CustomInput
                              type="checkbox"
                              id="2"
                              label="When"
                              checked={this.state.type[1].isChecked}
                              onChange={this.handleCheck}
                            />
                            <CustomInput
                              type="checkbox"
                              checked={this.state.type[2].isChecked}
                              id="3"
                              label="Where"
                              onChange={this.handleCheck}
                            />
                            <CustomInput
                              type="checkbox"
                              label="Yes/No"
                              checked={this.state.type[6].isChecked}
                              id="7"
                              onChange={this.handleCheck}
                            />
                          </Col>
                          <Col xs="auto">
                            <CustomInput
                              type="checkbox"
                              checked={this.state.type[3].isChecked}
                              id="4"
                              label="Who"
                              onChange={this.handleCheck}
                            />
                            <CustomInput
                              type="checkbox"
                              checked={this.state.type[4].isChecked}
                              id="5"
                              label="Why"
                              onChange={this.handleCheck}
                            />
                            <CustomInput
                              type="checkbox"
                              checked={this.state.type[5].isChecked}
                              id="6"
                              label="How"
                              onChange={this.handleCheck}
                            />
                          </Col>
                        </Row>
                      </Tooltip>
                    </Col>
                  </Row>
                </FormGroup>
                <Col xs="auto">
                  <Button
                    color="success"
                    onClick={() => {
                      if (this.getQuestion().trim() !== '') {
                        this.addQuestion(this.getQuestion());
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Col>
              </Row>
            </Col>
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
                          let className = '';
                          if (this.props.hoverWord === value) {
                            className += 'hover-word';
                          }

                          return React.createElement(
                            'span',
                            {
                              key: index,
                              className: className,
                              onMouseOver: (event) => {
                                this.props.hover(value, 'QUESTION');
                                event.target.className = 'hover-word';
                              },
                              onMouseLeave: (event) => {
                                this.props.hover('', 'QUESTION');
                                event.target.className = '';
                              },
                            },
                            (value += ' ')
                          );
                        })}
                      </Col>
                      <Col xs="auto">
                        {this.props.detailPage && (
                          <GenSynonymSentence
                            currentRowData={question.generated_questions}
                            questionValue={this.props.questionValue[index]}
                            setAlertMessage={this.props.setAlertMessage}
                            setSuccessAlert={this.props.setSuccessAlert}
                            setErrorAlert={this.props.setErrorAlert}
                            setErrorList={this.props.setErrorList}
                            index={index}
                            tokenizedWordArray={wordArray}
                            synonymsArray={this.props.synonymsArray}
                            setGeneratedSentences={this.setGeneratedSentences}
                          />
                        )}
                        {!this.props.detailPage && (
                          <GenSynonymSentence
                            currentRowData={question.generated_questions}
                            setAlertMessage={this.props.setAlertMessage}
                            setSuccessAlert={this.props.setSuccessAlert}
                            setErrorAlert={this.props.setErrorAlert}
                            setErrorList={this.props.setErrorList}
                            index={index}
                            tokenizedWordArray={wordArray}
                            synonymsArray={this.props.synonymsArray}
                            setGeneratedSentences={this.setGeneratedSentences}
                          />
                        )}
                      </Col>
                      <Col xs="auto">
                        {question.type.map((value, index) => {
                          switch (value) {
                            case 1:
                              return <p key={index}>What</p>;
                            case 2:
                              return <p key={index}>When</p>;
                            case 3:
                              return <p key={index}>Where</p>;
                            case 4:
                              return <p key={index}>Who</p>;
                            case 5:
                              return <p key={index}>Why</p>;
                            case 6:
                              return <p key={index}>How</p>;
                            case 7:
                              return <p key={index}>Yes/No</p>;
                            default:
                              return <p key={index}></p>;
                          }
                        })}
                      </Col>
                      <Col xs="auto">
                        <Button
                          color="danger"
                          onClick={() => {
                            this.removeQuestion(question);
                            this.props.setQuestions(this.state.questions);
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
        </LoadingSpinner>
      </div>
    );
  }
}
