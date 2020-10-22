import React, { Component } from "react";
import { Button, Container, Row } from "reactstrap";
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

// test
import data from "src/static/test.json";

class CreateDataApprovalForm extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        intent: "",
        intentFullName: "",
        questions: [],
        subjects: [],
        coresponse: [],
        rawData: "",
        synonyms: [],
        baseResponse: "",
        documentReference: "",
        page: "",
      },
    };
    this.modalRef = React.createRef("");
  }

  handleInputForm = (event) => handleInputFormChange(event, this);

  handleInput = (event) => handleInputChange(event, this);

  addCriticalData = () => {
    let type = document.getElementById("critical-data-type").value;
    let temp = this.state.form.subjects;
    temp.push({
      type: type,
      subjectComponents: [],
      verb: [],
      index: temp.length
    });
    let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
    let state = this.state;
    state.form.subjects = sortedTemp;
    this.setState(state);
  };

  setCriticalData = (index, type, word) => {
    let critical = {
      type: type,
      subjectComponent: word
    };
    let state = this.state;
    state.form.subjects[index].subjectComponents.push(critical);
    this.setState(state);
  };

  addCoresponse = () => {
    let type = document.getElementById("coresponse-type").value;
    let word = document.getElementById("coresponse-index").value;
    let temp = this.state.form.coresponse;
    temp.push({
      type: type,
      word: word,
    });
    let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
    let state = this.state;
    state.form.coresponse = sortedTemp;
    this.setState(state);
  };

  addSynonym = (synonymList, index) => {
    let currentState = this.state;
    for (let i in synonymList) {
      currentState.form.synonyms[index].synonyms.push(synonymList[i]);
    }
    this.setState(currentState);
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
      form.subjects.splice(index, 1);
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

  openSynonymsModal = () => {
    this.modalRef.current.setModal();
  };

  submitForm = () => {
    console.log(this.state.form);
  };

  setVerb = (index, type, word) => {
    let verb = {
      type: type,
      word: word,
    };
    let state = this.state;
    state.form.subjects[index].verb.push(verb);
    this.setState(state);
  };

  setCoresponse = (index, type, word) => {
    let coresponse = {
      type,
      word,
    };
    let state = this.state;
    state.form.coresponse[index].push(coresponse);
  };

  setQuestions = (questions) => {
    let form = this.state.form;
    form.questions = questions;
    this.setState({ form: form });
  };

  getWordArray = () => {
    const rawData = data.token;
    let wordArray = [];
    for (let index in rawData) {
      wordArray.push(rawData[index]);
    }
    return wordArray;
  };

  removeComponent = (type, criticalIndex, index) => {
    let form = this.state.form;
    if (index > -1) {
      if (type === "Verb") {
        form.subjects[criticalIndex].verb.splice(index, 1);
      } else if (type === "Critical") {
        form.subjects[criticalIndex].subjectComponents.splice(index, 1);
      }
    }
    let listCritical = form.subjects[criticalIndex];
    let list = [];
    for (let i in listCritical) {
      if (listCritical[i] !== null && listCritical[i] !== "")
        list.push(listCritical[i]);
    }
    this.setState({
      form: form,
    });
  };

  removeCoresponse = (index) => {
    let form = this.state.form;
    if (index > -1) {
      form.coresponse.splice(index, 1);
    }
    this.setState({
      form: form,
    });
  };

  render() {
    const wordArray = this.getWordArray();

    return (
      <div>
        <Container fluid={true}>
          <FormTitle title="New data Approval" />
          <div className="form-item form-item-meta">
            <FormSectionTitle title="Meta data" />
            <MetaData onChange={this.handleInputForm} />
          </div>

          <div className="form-item form-item-data mt-3 pb-3">
            <FormSectionTitle title="Data analysis" />
            <RawData
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
              criticalData={this.state.form.subjects}
            />

            <Coresponse
              addCoresponse={this.addCoresponse}
              removeCoresponse={this.removeCoresponse}
              wordArray={wordArray}
              coresponse={this.state.form.coresponse}
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
            <Button onClick={this.submitForm}>Create new data approval</Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CreateDataApprovalForm;
