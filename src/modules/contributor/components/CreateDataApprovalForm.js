import React, { Component } from "react";
import { Label, Input, Button } from "reactstrap";
import { Menu, Item, Separator, MenuProvider } from "react-contexify";
import {
  Intent,
  Question,
  GenList,
  SynonymsModal,
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
    this.modalRef = React.createRef("")
  }

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
  };

  addComponent = () => {
    this.addElement("component-field");
    let newState = this.state;
    newState.currentSelected.word = "";
    newState.currentSelected.index = "";
    this.setState(newState);
  };

  addCriticalData = () => {
    this.addElement("critical-field");
    let newState = this.state;
    newState.currentSelected.word = "";
    newState.currentSelected.index = "";
    this.setState(newState);
  };

  addCoresponse = () => {
    this.addElement("coresponse-field");
    let newState = this.state;
    newState.currentSelected.word = null;
    newState.currentSelected.index = null;
    this.setState(newState);
  };

  openSynonymsModal = () => {
    this.modalRef.current.setModal()
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
        <div className="row">
          <div className="col-10">
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
          </div>
          <div className="col-2">
            <Button onClick={this.stateCancelTokenize}>Cancel</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-10">
            <Input
              innerRef={this.rawDataRef}
              type="textarea"
              name="rawData"
              id="rawData"
              onChange={() => {
                this.setRawData(this.rawDataRef.current.value);
              }}
            />
          </div>
          <div className="col-2">
            <Button onClick={this.stateTokenizeRawDate}>Tokenize</Button>
          </div>
        </div>
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

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center m-3">
          <h1>New data approval</h1>
        </div>
        <div>
          <div className="container w-80">
            <Intent setIntent={this.setIntent} />
          </div>
          <div className="container w-80 mt-3">
            <div>
              <Label for="rawData">Raw data:</Label>
            </div>
            <div style={{ width: "100%" }}>{this.renderRawDataMode()}</div>
          </div>
          <div className="container w-80 d-flex justify-content-between mt-3">
            <div>
              <Label>Component of question</Label>
              <div className="row">
                <Input
                  innerRef={this.componentRef}
                  className="col-2"
                  type="text"
                  name="componentOfQuestion"
                />
                <div id="component-field" className="m-1"></div>
                <Button onClick={this.setComponentOfQuestion}>Add</Button>
              </div>
              <div id="component-list">
                <GenList
                  type="component"
                  currentState={this.state}
                  list={this.state.form.componentOfQuestion}
                  removeComponent={this.removeComponent}
                />
              </div>
            </div>
            <div>
              <Label>Critical data</Label>
              <div className="row">
                <Input
                  innerRef={this.criticalDataRef}
                  className="col-2"
                  type="text"
                  name="criticalData"
                />
                <div id="critical-field" className="m-1"></div>
                <Button onClick={this.setCritical}>Add</Button>
              </div>
              <div id="critical-list">
                <GenList
                  type="critical"
                  currentState={this.state}
                  list={this.state.form.criticalData}
                  removeComponent={this.removeComponent}
                />
              </div>
            </div>
            <div>
              <Label>Coresponse</Label>
              <div className="row">
                <Input
                  innerRef={this.coresponseRef}
                  className="col-2"
                  type="text"
                  name="coresponse"
                />
                <div id="coresponse-field" className="m-1"></div>
                <Button onClick={this.setCoresponse}>Add</Button>
              </div>
              <div id="coresponse-list">
                <GenList
                  type="coresponse"
                  currentState={this.state}
                  list={this.state.form.coresponse}
                  removeComponent={this.removeComponent}
                />
              </div>
            </div>

            <div></div>
          </div>
          <div className="container w-80 mt-3">
            <Question setQuestions={this.setQuestions} />
          </div>
          <div className="container w-80 mt-3 d-flex justify-content-start p-0">
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
          </div>
          <div className="container w-80 mt-3 d-flex justify-content-start p-0">
            <SynonymsModal ref={this.modalRef}/>
            <div>Synonyms session:</div>
            <div>123</div>
          </div>
          <div className="container w-80 mt-3 d-flex justify-content-start p-0">
            <div className="d-flex justify-content-center mr-5">
              <Label for="reference">Document reference: </Label>
              <Input
                className="m-1"
                innerRef={this.documentRef}
                type="select"
                name="reference"
                id="reference"
                onChange={() => {
                  this.setDocument(this.documentRef.current.value);
                }}
              >
                <option>HCM tap 1</option>
                <option>HCM tap 2</option>
                <option>HCM tap 3</option>
                <option>HCM tap 4</option>
                <option>HCM tap 5</option>
              </Input>
              <Button>Add new reference</Button>
            </div>
            <div className="d-flex justify-content-center">
              <Label for="page">Page:</Label>
              <Input
                className="m-1"
                innerRef={this.pageRef}
                type="number"
                name="Page"
                id="Page"
                min="1"
                value="1"
                onChange={() => {
                  this.setPage(this.pageRef.current.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Button onClick={this.submitForm}>Create new data approval</Button>
        </div>
        <Menu id="menu_id">
          <Item onClick={this.addComponent}>Add to component of question</Item>
          <Item onClick={this.addCriticalData}>Add to critical data</Item>
          <Item onClick={this.addCoresponse}>Add coresponse</Item>
          <Separator />
          <Item onClick={this.openSynonymsModal}>Add synonym</Item>
        </Menu>
      </div>
    );
  }
}

export default CreateDataApprovalForm;
