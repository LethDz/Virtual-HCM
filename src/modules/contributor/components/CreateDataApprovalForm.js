import React, { Component } from "react";
import {
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { MenuProvider } from "react-contexify";
import {
  Question,
  SynonymsModal,
  // GenSynonyms,
  // GenList,
  FormTitle,
  FormSectionTitle,
  CriticalDataItem,
  MetaData,
  Synonyms,
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
      mode: "NORMAL",
      form: {
        intent: "",
        intentFullName: "",
        questions: [],
        componentOfQuestion: [],
        criticalData: [],
        coresponse: [],
        rawData: "",
        synonyms: [],
        baseResponse: "",
        documentReference: "",
        page: "",
      },
      currentSelected: {
        word: "",
        index: "",
      },
    };

    this.synonymFieldRef = React.createRef("");
    this.modalRef = React.createRef("");
  }

  handleInputForm = (event) => {
    handleInputFormChange(event, this);
  };

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  addCriticalData = () => {
    let type = document.getElementById("critical-data-type").value;
    let word = document.getElementById("critical-data-index").value;
    let index = document.getElementById("critical-data-index").selectedIndex;
    let temp = this.state.form.criticalData;
    temp.push({
      type: type,
      word: word,
      index: index,
      verb: [],
    });
    let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
    let state = this.state;
    state.form.criticalData = sortedTemp;
    this.setState(state);
  };

  addCoresponse = () => {
    let type = document.getElementById("coresponse-type").value;
    let word = document.getElementById("coresponse-index").value;
    let index = document.getElementById("coresponse-index").selectedIndex;
    let temp = this.state.form.coresponse;
    temp.push({
      type: type,
      word: word,
      index: index,
    });
    let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
    let state = this.state;
    state.form.coresponse = sortedTemp;
    this.setState(state);
  };

  addSynonym = (synonymList) => {
    let result = this.state.currentSelected.word + "-";
    synonymList.forEach((synonym) => {
      result += synonym.meaning + ",";
    });
    document.getElementById("synonym-field").innerHTML = result;
  };

  setSynonym = () => {
    let result = this.synonymFieldRef.current.innerHTML;
    let word = result.split("-")[0];
    let synonymListTemp = result.split("-")[1].split(",");
    let synonymList = [];
    synonymListTemp.forEach((synonym) => {
      if (synonym.trim() !== "") {
        synonymList.push(synonym);
      }
    });

    let currentState = this.state;
    let synonymObject = {
      word: word,
      list: synonymList,
    };
    currentState.form.synonyms.push(synonymObject);
    this.setState(currentState);
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
    state.form.criticalData[index].verb.push(verb);
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
    let newState = this.state;
    newState.form.questions = questions;
    this.setState(newState);
  };

  stateTokenizeRawDate = () => {
    let newState = this.state;
    newState.mode = "TOKENIZE";
    this.setState(newState);
  };

  stateCancelTokenize = () => {
    let newState = this.state;
    newState.mode = "NORMAL";
    this.setState(newState);
  };

  getWordArray = () => {
    const rawData = data.token;
    let wordArray = [];
    for (let index in rawData) {
      wordArray.push(rawData[index]);
    }
    return wordArray;
  };

  renderRawDataMode = () => {
    if (this.state.mode === "TOKENIZE") {
      return (
        <Row>
          <Col>
            <MenuProvider id="menu_id">
              {this.getWordArray().map((data, index) => {
                return (
                  <span className="mr-1" key={index}>
                    {data.value}
                  </span>
                );
              })}
            </MenuProvider>
          </Col>
          <Col xs="1" className="p-0">
            <Button onClick={this.stateCancelTokenize}>Cancel</Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col>
            <Input
              type="textarea"
              name="rawData"
              id="rawData"
              onChange={this.handleInputForm}
            />
          </Col>
          <Col xs="1" className="p-0">
            <Button onClick={this.stateTokenizeRawDate}>Tokenize</Button>
          </Col>
        </Row>
      );
    }
  };

  removeComponent = (criticalIndex, verbIndex) => {
    let form = this.state.form;
    const index = verbIndex;
    if (index > -1) {
      form.criticalData[criticalIndex].verb.splice(index, 1);
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

  removeCoresponse = (index) => {
    let form = this.state.form;
    if (index > -1) {
      form.coresponse.splice(index, 1);
    }
    this.setState({
      form: form,
    });
  }

  removeSynonym = (currentState, word) => {
    let list = [];
    this.state.form.synonyms.forEach((synonym) => {
      list.push(synonym);
    });
    let newList = [];
    list.forEach((item) => {
      if (item.word !== word) {
        newList.push(item);
      }
    });
    currentState.form.synonyms = newList;
    this.setState(currentState);
  };

  render() {
    const criticalType = ["PER", "LOC", "ORG", "MISC"];
    const questionType = ["WHAT", "WHEN", "WHERE", "WHO", "WHY", "HOW"];
    const wordArray = this.getWordArray();

    return (
      <div>
        <Container fluid={true}>
          <FormTitle title="New data Approval" />
          <FormSectionTitle title="Meta data" />
          <SynonymsModal ref={this.modalRef} addSynonym={this.addSynonym} />

          <MetaData onChange={this.handleInputForm} />

          <FormSectionTitle title="Data analysis" />
          <Row xs="1">
            <Col>
              <Label for="rawData">Raw data:</Label>
              {this.renderRawDataMode()}
            </Col>
          </Row>
          <Row className="mt-3" xs="3">
            <Col xs="7">
              <Label>Critical data</Label>
              <Row>
                <Col xs="auto">
                  <Input type="select" id="critical-data-type">
                    {criticalType.map((value, index) => {
                      return <option key={index}>{value}</option>;
                    })}
                  </Input>
                </Col>
                <Col>
                  <Input type="select" id="critical-data-index">
                    {wordArray.map((data, index) => {
                      return <option key={index}>{data.value}</option>;
                    })}
                  </Input>
                </Col>
                <Col xs="auto" className="p-0">
                  <Button onClick={this.addCriticalData}>Add</Button>
                </Col>
              </Row>
              <ListGroup className="mt-1">
                {this.state.form.criticalData.map((criticalData, index) => {
                  return (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col>
                          <Row>
                            {criticalData.type}: {criticalData.word}
                          </Row>
                          <ListGroup>
                            {this.state.form.criticalData[index].verb.map(
                              (verb, index) => {
                                return (
                                  <ListGroupItem className="mt-1" key={index}>
                                    <Row>
                                      <Col>
                                        {verb.type}: {verb.word}
                                      </Col>
                                      <Col xs="auto">
                                        <Button
                                          onClick={() => {
                                            this.removeComponent(
                                              criticalData.index,
                                              index
                                            );
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </Col>
                                    </Row>
                                  </ListGroupItem>
                                );
                              }
                            )}
                          </ListGroup>
                        </Col>
                        <Col>
                          <CriticalDataItem
                            index={criticalData.index}
                            getWordArray={this.getWordArray}
                            setVerb={this.setVerb}
                          />
                        </Col>
                      </Row>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Col>
            <Col>
              <Label>Coresponse</Label>
              <Row>
                <Col xs="4">
                  <Input type="select" id="coresponse-type" placeholder="Type">
                    {questionType.map((value, index) => {
                      return <option key={index}>{value}</option>;
                    })}
                  </Input>
                </Col>
                <Col>
                  <Input type="select" id="coresponse-index">
                    {wordArray.map((data, index) => {
                      return <option key={index}>{data.value}</option>;
                    })}
                  </Input>
                </Col>
                <Col xs="2" className="p-0">
                  <Button onClick={this.addCoresponse}>Add</Button>
                </Col>
              </Row>
              <ListGroup className="mt-1">
                {this.state.form.coresponse.map((coresponse, index) => {
                  return (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col>
                          {coresponse.type}: {coresponse.word}
                        </Col>
                        <Col xs="auto">
                          <Button onClick={() => {
                            this.removeCoresponse(index)
                          }}>Remove</Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
          <Question className="mt-3" setQuestions={this.setQuestions} />
          <Row className="mt-3" xs="1">
            <Col xs="11">
              <Label for="baseResponse">Base response</Label>
              <Input
                type="textarea"
                name="baseResponse"
                id="baseResponse"
                onChange={this.handleInputForm}
              />
            </Col>
          </Row>
          <Synonyms
            synonymFieldRef={this.synonymFieldRef}
            setSynonym={this.setSynonym}
          />
          <Row className="d-flex justify-content-around mt-3">
            <Button onClick={this.submitForm}>Create new data approval</Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CreateDataApprovalForm;
