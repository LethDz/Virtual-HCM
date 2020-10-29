import React, { Component } from "react";
import { Button, Container, Row, Form, Alert } from "reactstrap";
import {
  Question,
  FormTitle,
  FormSectionTitle,
  MetaData,
  Synonyms,
  RawData,
  BaseResponse,
  Coresponse,
  CriticalData,
} from "src/modules/contributor/index";
import "src/static/stylesheets/contributor.css";
import {
  handleInputFormChange,
  handleInputChange,
} from "src/common/handleInputChange";

class CreateDataApprovalForm extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        intent: "",
        intentFullName: "",
        questions: [],
        criticalData: [],
        coresponse: [],
        rawData: "",
        synonyms: [],
        baseResponse: "",
        documentReference: [],
      },
      errorAlert: false,
      errorMessage: "",
      tokenizedWord: [],
      ner: [],
    };
  }

  handleInputForm = (event) => handleInputFormChange(event, this);

  handleInput = (event) => handleInputChange(event, this);

  setTokenizeWord = (tokenizedWordArray, ner) => {
    this.setState({ tokenizedWord: tokenizedWordArray, ner: ner });
  };

  getWordArray = () => {
    const rawData = this.state.tokenizedWord;
    let wordArray = [];
    for (let index in rawData) {
      wordArray.push(rawData[index]);
    }
    return wordArray;
  };

  getError = () => {
    let errorMessage = "";
    if (this.state.form.questions.length === 0) {
      errorMessage = `${errorMessage}Question field required at least one question; `;
    }
    if (this.state.form.criticalData.length === 0) {
      errorMessage = `${errorMessage}Subject field required at least one subject; `;
    }
    for (let i in this.state.form.criticalData) {
      if (this.state.form.criticalData[i].word.length === 0)
        errorMessage = `${errorMessage}Subject at index ${i} required at least one component; `;
    }
    this.setState({
      errorMessage: errorMessage,
    });
    return errorMessage;
  };

  submitForm = (event) => {
    event.preventDefault();
    let error = this.getError();
    if (error.trim() === "") {
      console.log(this.prepareForm());
      this.setState({ errorAlert: false });
    } else {
      this.setState({ errorAlert: true });
    }
  };

  prepareForm = () => {
    // Remove index from critical data
    let form = this.state.form;
    let critical = form.criticalData;
    let temp = [];
    critical.forEach((critical) => {
      temp.push({
        type: critical.type,
        word: critical.word,
        verb: critical.verb,
      });
    });
    form.criticalData = temp;
    return form;
  };

  addCriticalData = () => {
    let type = document.getElementById("critical-data-type").value;
    let temp = this.state.form.criticalData;
    temp.push({
      type: type,
      word: [],
      verb: [],
      index: temp.length,
    });
    let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
    let state = this.state;
    state.form.criticalData = sortedTemp;
    this.setState(state);
  };

  setCriticalData = (index, type, word) => {
    let critical = {
      type: type,
      word: word,
    };
    let state = this.state;
    state.form.criticalData[index].word.push(critical);
    this.setState(state);
  };

  addSynonym = (synonymList, index) => {
    let currentState = this.state;
    for (let i in synonymList) {
      currentState.form.synonyms[index].synonyms.push(
        synonymList[i].synonym_id
      );
    }
    this.setState(currentState);
  };

  setCoresponse = (coresponse) => {
    let form = this.state.form;
    form.coresponse = coresponse
    this.setState({ form: form });
  };

  setSynonym = (word) => {
    let currentState = this.state;
    let synonymObject = {
      word: word,
      synonyms: [],
    };
    currentState.form.synonyms.push(synonymObject);
    this.setState(currentState);
  };

  removeSynonym = (index) => {
    let form = this.state.form;
    if (index > -1) {
      form.synonyms.splice(index, 1);
    }
    this.setState({
      form: form,
    });
  };

  removeCritical = (index) => {
    let form = this.state.form;
    if (index > -1) {
      form.criticalData.splice(index, 1);
    }
    this.setState({
      form: form,
    });
  };

  removeSynonymInWord = (wordIndex, synonymIndex) => {
    let form = this.state.form;
    if (synonymIndex > -1) {
      form.synonyms[wordIndex].synonyms.splice(synonymIndex, 1);
    }
    this.setState({
      form: form,
    });
  };

  setVerb = (index, type, word) => {
    let verb = {
      type: type,
      word: word,
    };
    let state = this.state;
    state.form.criticalData[index].verb.push(verb);
    this.setState(state);
  };

  setQuestions = (questions) => {
    let form = this.state.form;
    form.questions = questions;
    this.setState({ form: form });
  };

  setReference = (reference) => {
    let form = this.state.form;
    form.documentReference = reference;
    this.setState({ form: form });
  };

  removeComponent = (type, criticalIndex, index) => {
    let form = this.state.form;
    if (index > -1) {
      if (type === "Verb") {
        form.criticalData[criticalIndex].verb.splice(index, 1);
      } else if (type === "Critical") {
        form.criticalData[criticalIndex].word.splice(index, 1);
      }
    }
    let listCritical = form.criticalData[criticalIndex];
    let list = [];
    for (let i in listCritical) {
      if (listCritical[i] !== null && listCritical[i] !== "")
        list.push(listCritical[i]);
    }
    this.setState({
      form: form,
    });
  };

  render() {
    const wordArray = this.getWordArray();

    return (
      <Container fluid={true}>
        <Form
          onSubmit={this.submitForm}
          style={{ width: "100%", height: "100%" }}
        >
          <FormTitle title="New data Approval" />
          <Alert isOpen={this.state.errorAlert} color="danger">
            {this.state.errorMessage}
          </Alert>
          <div className="form-item form-item-meta">
            <FormSectionTitle title="Meta data" />
            <MetaData
              documentReference={this.state.form.documentReference}
              onChange={this.handleInputForm}
              setReference={this.setReference}
            />
          </div>

          <div className="form-item form-item-data mt-3 pb-3">
            <FormSectionTitle title="Data analysis" />
            <RawData
              setTokenizeWord={this.setTokenizeWord}
              rawData={this.state.form.rawData}
              ner={this.state.ner}
              getWordArray={this.getWordArray}
              onChange={this.handleInputForm}
            />
            <CriticalData
              addCriticalData={this.addCriticalData}
              removeComponent={this.removeComponent}
              removeCritical={this.removeCritical}
              setVerb={this.setVerb}
              setCriticalData={this.setCriticalData}
              wordArray={wordArray}
              criticalData={this.state.form.criticalData}
            />

            <Coresponse
              setCoresponse={this.setCoresponse}
              wordArray={wordArray}
            />
            <Question className="mt-3" setQuestions={this.setQuestions} />

            <BaseResponse onChange={this.handleInputForm} />
            <Synonyms
              addSynonym={this.addSynonym}
              setSynonym={this.setSynonym}
              removeSynonym={this.removeSynonym}
              removeSynonymInWord={this.removeSynonymInWord}
              wordArray={wordArray}
              synonymList={this.state.form.synonyms}
            />
          </div>

          <Row className="d-flex justify-content-around pt-3 pb-3">
            <Button type="submit" color="info">
              Create new data approval
            </Button>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default CreateDataApprovalForm;
