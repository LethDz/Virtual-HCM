import React, { Component } from "react";
import { Label, Input, Button, Container, Row, Col } from "reactstrap";
import { Menu, Item, Separator, MenuProvider } from "react-contexify";
import {
  Intent,
  Question,
  GenList,
  SynonymsModal,
  GenSynonyms,
  FormTitle,
  FormSectionTitle,
  Reference,
  Synonyms,
} from "src/modules/contributor/index";
import "src/static/stylesheets/contributor.css";

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

    this.rawDataRef = React.createRef("");
    this.baseResRef = React.createRef("");
    this.documentRef = React.createRef("");
    this.pageRef = React.createRef("");
    this.componentRef = React.createRef("");
    this.criticalDataRef = React.createRef("");
    this.coresponseRef = React.createRef("");
    this.componentFieldRef = React.createRef("");
    this.criticalFieldRef = React.createRef("");
    this.coresponseFieldRef = React.createRef("");
    this.synonymFieldRef = React.createRef("");
    this.modalRef = React.createRef("");
  }

  // For raw data
  valueElement = () => {
    let element = document.createElement("data");
    element.setAttribute("class", "mr-1");
    element.setAttribute("value", this.state.currentSelected.index);
    element.innerHTML = this.state.currentSelected.word;
    return element;
  };

  addElement = (fieldName) => {
    let flag = false;
    document.getElementById(fieldName).childNodes.forEach((node) => {
      if (
        this.state.currentSelected.index.toString() ===
        node.attributes.value.value.toString()
      ) {
        flag = true;
      }
    });
    if (!flag) {
      document.getElementById(fieldName).appendChild(this.valueElement());
      let childNodes = document.getElementById(fieldName).childNodes;
      let sortedNodes = [];
      childNodes.forEach((node) => {
        sortedNodes.push(node);
      });
      sortedNodes.sort(function (a, b) {
        return a.attributes.value.value - b.attributes.value.value;
      });
      for (let i in sortedNodes) {
        document.getElementById(fieldName).appendChild(sortedNodes[i]);
      }
    }

    let newState = this.state;
    newState.currentSelected.word = "";
    newState.currentSelected.index = "";
    this.setState(newState);
  };

  addComponent = () => {
    this.addElement("component-field");
  };

  addCriticalData = () => {
    this.addElement("critical-field");
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

  setCritical = () => {
    let type = this.criticalDataRef.current.value;
    let criticalList = this.getListElementText("critical-field");
    let newState = this.state;
    newState.form.criticalData.push({
      type: type,
      criticalData: criticalList,
    });
    this.setState(newState);
  };

  addCoresponse = () => {
    this.addElement("coresponse-field");
  };

  openSynonymsModal = () => {
    this.modalRef.current.setModal();
  };

  submitForm = () => {
    console.log(this.state.form);
  };

  setIntent = (intent, intentFullName) => {
    let newState = this.state;
    newState.form.intent = intent;
    newState.form.intentFullName = intentFullName;
    this.setState(newState);
  };

  setRawData = (rawData) => {
    let newState = this.state;
    newState.form.rawData = rawData;
    this.setState(newState);
  };

  setBaseRes = (baseRes) => {
    let newState = this.state;
    newState.form.baseResponse = baseRes;
    this.setState(newState);
  };

  setDocument = (document) => {
    let newState = this.state;
    newState.form.documentReference = document;
    this.setState(newState);
  };

  setPage = (page) => {
    let newState = this.state;
    newState.form.page = page;
    this.setState(newState);
  };

  setQuestions = (questions) => {
    let newState = this.state;
    newState.form.questions = questions;
    this.setState(newState);
  };

  getListElementText = (field) => {
    let list = [];
    document.getElementById(field).childNodes.forEach((node) => {
      list.push(node.innerHTML);
    });
    return list;
  };

  setComponentOfQuestion = () => {
    let type = this.componentRef.current.value;
    let componentList = this.getListElementText("component-field");
    let newState = this.state;
    newState.form.componentOfQuestion.push({
      type: type,
      components: componentList,
    });
    this.setState(newState);
  };

  setCoresponse = () => {
    let type = this.coresponseRef.current.value;
    let coresponseList = this.getListElementText("coresponse-field");
    let newState = this.state;
    newState.form.coresponse.push({
      type: type,
      coresponse: coresponseList,
    });
    this.setState(newState);
  };

  setSelectedWord = (word, index) => {
    let newState = this.state;
    newState.currentSelected.word = word;
    newState.currentSelected.index = index;
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
                  <span
                    onContextMenu={(event, props) => {
                      this.setSelectedWord(data.value, index);
                    }}
                    className="mr-1"
                    key={index}
                  >
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
              innerRef={this.rawDataRef}
              type="textarea"
              name="rawData"
              id="rawData"
              onChange={() => {
                this.setRawData(this.rawDataRef.current.value);
              }}
            />
          </Col>
          <Col xs="1" className="p-0">
            <Button onClick={this.stateTokenizeRawDate}>Tokenize</Button>
          </Col>
        </Row>
      );
    }
  };

  removeComponent = (currentState, field, type) => {
    let componentList = [];
    if (field === "component") {
      this.state.form.componentOfQuestion.forEach((component) => {
        componentList.push(component);
      });
    } else if (field === "critical") {
      this.state.form.criticalData.forEach((critical) => {
        componentList.push(critical);
      });
    } else if (field === "coresponse") {
      this.state.form.coresponse.forEach((coresponse) => {
        componentList.push(coresponse);
      });
    }
    let index = -1;
    for (let i in componentList) {
      if (componentList[i].type === type) {
        index = i;
      }
    }
    if (index > -1) {
      componentList.splice(index, 1);
    }
    if (field === "component") {
      currentState.form.componentOfQuestion = componentList;
      this.setState(currentState);
    } else if (field === "critical") {
      currentState.form.criticalData = componentList;
      this.setState(currentState);
    } else if (field === "coresponse") {
      currentState.form.coresponse = componentList;
      this.setState(currentState);
    }
  };

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
    return (
      <div>
        <Container fluid={true}>
          <FormTitle title="New data Approval" />
          <FormSectionTitle title="Meta data" />
          <SynonymsModal ref={this.modalRef} addSynonym={this.addSynonym} />
          <Menu id="menu_id">
            <Item onClick={this.addComponent}>
              Add to component of question
            </Item>
            <Item onClick={this.addCriticalData}>Add to critical data</Item>
            <Item onClick={this.addCoresponse}>Add coresponse</Item>
            <Separator />
            <Item onClick={this.openSynonymsModal}>Add synonym</Item>
          </Menu>
          <Intent className="m-3" setIntent={this.setIntent} />
          <Reference
            setDocument={this.setDocument}
            setPage={this.setPage}
            documentValue={this.documentRef}
            pageValue={this.pageRef}
            documentInnerRef={this.documentRef}
            pageInnerRef={this.pageRef}
          />

          <FormSectionTitle title="Data analysis" />
          <Row xs="1">
            <Col>
              <Label for="rawData">Raw data:</Label>
              <div style={{ width: "100%" }}>{this.renderRawDataMode()}</div>
            </Col>
          </Row>
          <Row className="mt-3" xs="3">
            <Col>
              <Label>Component of question</Label>
              <Row>
                <Col xs="3">
                  <Input
                    innerRef={this.componentRef}
                    type="text"
                    name="componentOfQuestion"
                    placeholder="Type"
                  />
                </Col>
                <div className="over-flow mw-55">
                  <div id="component-field" className="m-1"></div>
                </div>
                <Col xs="2" className="p-0">
                  <Button onClick={this.setComponentOfQuestion}>Add</Button>
                </Col>
              </Row>
              <div id="component-list">
                <GenList
                  type="component"
                  currentState={this.state}
                  list={this.state.form.componentOfQuestion}
                  removeComponent={this.removeComponent}
                />
              </div>
            </Col>
            <Col>
              <Label>Critical data</Label>
              <Row>
                <Col xs="3">
                  <Input
                    innerRef={this.criticalDataRef}
                    type="text"
                    name="criticalData"
                    placeholder="Type"
                  />
                </Col>
                <div className="over-flow mw-55">
                  <div id="critical-field" className="m-1"></div>
                </div>
                <Col xs="2" className="p-0">
                  <Button onClick={this.setCritical}>Add</Button>
                </Col>
              </Row>
              <div id="critical-list">
                <GenList
                  type="critical"
                  currentState={this.state}
                  list={this.state.form.criticalData}
                  removeComponent={this.removeComponent}
                />
              </div>
            </Col>
            <Col>
              <Label>Coresponse</Label>
              <Row>
                <Col xs="3">
                  <Input
                    innerRef={this.coresponseRef}
                    type="text"
                    name="coresponse"
                    placeholder="Type"
                  />
                </Col>
                <div className="over-flow mw-55">
                  <div id="coresponse-field" className="m-1"></div>
                </div>
                <Col xs="2" className="p-0">
                  <Button onClick={this.setCoresponse}>Add</Button>
                </Col>
              </Row>
              <div id="coresponse-list">
                <GenList
                  type="coresponse"
                  currentState={this.state}
                  list={this.state.form.coresponse}
                  removeComponent={this.removeComponent}
                />
              </div>
            </Col>
          </Row>
          <Question className="mt-3" setQuestions={this.setQuestions} />
          <Row className="mt-3" xs="1">
            <Col xs="11">
              <Label for="baseResponse">Base response</Label>
              <Input
                innerRef={this.baseResRef}
                type="textarea"
                name="baseResponse"
                id="baseResponse"
                onChange={() => {
                  this.setBaseRes(this.baseResRef.current.value);
                }}
              />
            </Col>
          </Row>
          <Synonyms
            synonymFieldRef={this.synonymFieldRef}
            setSynonym={this.setSynonym}
          />
          <GenSynonyms
            currentState={this.state}
            list={this.state.form.synonyms}
            removeSynonym={this.removeSynonym}
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
