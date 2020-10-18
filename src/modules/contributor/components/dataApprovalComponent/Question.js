import React, { Component } from "react";
import { Input, Button } from "reactstrap";

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
      <div>
        <div className="row">
          <div>Question</div>
          <div className="col-9">
            <Input
              innerRef={this.questionRef}
              type="text"
              name="question"
              id="question"
            />
          </div>
          <div>
            <Button
              onClick={() => {
                this.addQuestion(this.getQuestion());
                this.props.setQuestions(this.state.questions);
              }}
            >
              Add question
            </Button>
          </div>
        </div>
        <div>
          {this.state.questions.map((question) => (
            <div className="mt-2">
              <span className="mr-3" key={question}>- {question}</span>
              <Button
                onClick={() => {
                  this.removeQuestion(question);
                  this.props.setQuestions(this.state.questions);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
