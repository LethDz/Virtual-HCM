import React, { Component } from 'react';
import { Input, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { GenSynonymSentence } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
      questions: [],
      tokenizeData: [],
      ner: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  addQuestion = (question) => {
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

          let questionsTemp = this.state.questions;
          let questionTemp = '';
          fullArray.forEach((word) => {
            questionTemp += word.value + ' ';
          });
          questionsTemp.push(questionTemp);
          if (this._isMounted)
            this.setState({
              question: '',
              tokenizeData: fullArray,
              ner: modifiedNer,
              loading: false,
              questions: questionsTemp,
            });
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
                <Col xs="auto">
                  <Button
                    color="success"
                    onClick={() => {
                      if (this.getQuestion().trim() !== '') {
                        this.addQuestion(this.getQuestion());
                        this.props.setQuestions(this.state.question);
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
                let wordArray = question.split(' ');
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
                        <GenSynonymSentence
                          setAlertMessage={this.props.setAlertMessage}
                          setSuccessAlert={this.props.setSuccessAlert}
                          setErrorAlert={this.props.setErrorAlert}
                          setErrorList={this.props.setErrorList}
                          index={index}
                          tokenizedWordArray={wordArray}
                          synonymsArray={this.props.synonymsArray}
                          setGeneratedSentences={
                            this.props.setGeneratedSentences
                          }
                        />
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
