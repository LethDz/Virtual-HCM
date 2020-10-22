import React, { Component } from "react";
import { Input, Button, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
    this.questionRef = React.createRef();
  }

  addQuestion = (question) => {
    let questionsTemp = this.state.questions;
    questionsTemp.push(question);
    this.setState(questionsTemp);
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
    return this.questionRef.current.value;
  };
  render() {
    return (
      <div className="p-3">
        <Row xs="1">
          <Col>Question</Col>
          <Col>
            <Row>
              <Col>
                <Input
                  innerRef={this.questionRef}
                  type="text"
                  name="question"
                  id="question"
                />
              </Col>
              <Col xs="auto">
                <Button
                  color="success"
                  onClick={() => {
                    this.addQuestion(this.getQuestion());
                    this.props.setQuestions(this.state.questions);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div>
          {this.state.questions.map((question) => (
            <div className="mt-2">
              <span className="mr-3" key={question}>
                - {question}
              </span>
              <Button
                color="danger"
                onClick={() => {
                  this.removeQuestion(question);
                  this.props.setQuestions(this.state.questions);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
