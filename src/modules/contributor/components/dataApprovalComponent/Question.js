import React, { Component } from "react";
import { Input, Button, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NLP, TOKENIZE } from "src/constants";
import axiosClient from "src/common/axiosClient";
import { handleInputChange } from "src/common/handleInputChange";
import LoadingSpinner from "src/common/loadingSpinner/LoadingSpinner";

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      questions: [],
      tokenizeData: [],
      ner: [],
      loading: false,
    };
  }

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  addQuestion = (question) => {
    this.setState({ loading: true });
    const paragraph = {
      paragraph: question,
    };

    axiosClient
      .post(NLP + TOKENIZE, paragraph)
      .then((response) => {
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
        let questionTemp = "";
        fullArray.forEach((word) => {
          questionTemp += word.value + " ";
        });
        questionsTemp.push(questionTemp);

        this.setState({
          question: "",
          tokenizeData: fullArray,
          ner: modifiedNer,
          loading: false,
          questions: questionsTemp,
        });
      })
      .then(() => {
        this.props.setTokenizeWord(this.state.tokenizeData, this.state.ner);
      })
      .catch((err) => this.setState({ loading: false }));
  };

  removeQuestion = (question) => {
    let questionsTemp = this.state.questions;
    const index = questionsTemp.indexOf(question);
    if (index > -1) {
      questionsTemp.splice(index, 1);
    }
    this.setState(questionsTemp);
  };

  getQuestion = () => {
    return this.state.question;
  };

  render() {
    return (
      <div className='p-3'>
        <LoadingSpinner loading={this.state.loading} text='Tokenizing question'>
          <Row xs='1'>
            <Col>Question</Col>
            <Col>
              <Row>
                <Col>
                  <Input
                    type='text'
                    name='question'
                    id='question'
                    value={this.state.question}
                    onChange={this.handleInput}
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    color='success'
                    onClick={() => {
                      if (this.getQuestion().trim() !== "") {
                        this.addQuestion(this.getQuestion());
                        this.props.setQuestions(this.state.questions);
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
            <ListGroup className='mt-1'>
              {this.state.questions.map((question, index) => {
                let wordArray = question.split(" ");
                return (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col>
                        {wordArray.map((value, index) => {
                          let className = "";
                          if (this.props.hoverWord === value) {
                            className += "hover-word";
                          }

                          return React.createElement(
                            "span",
                            {
                              key: index,
                              className: className,
                              onMouseOver: (event) => {
                                this.props.hover(value, "QUESTION");
                                event.target.className = "hover-word";
                              },
                              onMouseLeave: (event) => {
                                this.props.hover("", "QUESTION");
                                event.target.className = "";
                              },
                            },
                            (value += " ")
                          );
                        })}
                      </Col>
                      <Col xs='auto'>
                        <Button
                          color='danger'
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
