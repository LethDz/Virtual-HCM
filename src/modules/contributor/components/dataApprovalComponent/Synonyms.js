import React, { Component } from "react";
import { Row, Col, Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import { handleInputChange } from "src/common/handleInputChange";

import { SynonymsModal } from "src/modules/contributor/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Synonyms extends Component {
  constructor(props) {
    super();
    this.state = {
      synonymWord: "",
      isOpenSynonymModal: false,
      index: "",
      synonyms: [],
    };
  }

  setSynonymToForm = () => {
    if (this.state.synonymWord !== "" && this.state.synonymWord !== null) {
      let synonym = this.state.synonyms;
      let synonymTemp = [];
      synonym.forEach((synonym) => {
        let synonymId = [];
        synonym.synonyms.forEach((sy) => {
          synonymId.push(sy.id);
        });
        let synonymObject = {
          word: synonym.word,
          synonyms: synonymId,
        };
        synonymTemp.push(synonymObject);
      });
      this.props.setSynonym(synonymTemp);
    }
  };

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  setSynonym = () => {
    if (this.state.synonymWord !== "" && this.state.synonymWord !== null) {
      let synonyms = this.state.synonyms;
      synonyms.push({
        word: this.state.synonymWord,
        synonyms: [],
      });
      this.setState({ synonyms: synonyms });
    }
  };

  toggleSynonymModal = (index) => {
    this.setState({
      isOpenSynonymModal: !this.state.isOpenSynonymModal,
      index: index,
    });
  };

  addSynonym = (synonymList, index) => {
    let synonyms = this.state.synonyms;
    for (let i in synonymList) {
      synonyms[index].synonyms.push({
        id: synonymList[i].synonym_id,
        meaning: synonymList[i].meaning,
      });
    }
    this.setState({ synonyms: synonyms });
    this.setSynonymToForm();
  };

  removeSynonym = (index) => {
    let synonyms = this.state.synonyms;
    if (index > -1) {
      synonyms.splice(index, 1);
    }
    this.setState({
      synonyms: synonyms,
    });
    this.setSynonymToForm();
  };

  removeSynonymInWord = (wordIndex, synonymIndex) => {
    let synonyms = this.state.synonyms;
    if (synonymIndex > -1) {
      synonyms[wordIndex].synonyms.splice(synonymIndex, 1);
    }
    this.setState({
      synonyms: synonyms,
    });
    this.setSynonymToForm();
  };

  render() {
    return (
      <Row className="p-3" xs="1">
        <SynonymsModal
          index={this.state.index}
          isOpenSynonymModal={this.state.isOpenSynonymModal}
          toggleSynonymModal={this.toggleSynonymModal}
          addSynonym={this.addSynonym}
        />
        <Col>
          Synonyms:
          <Row>
            <Col>
              <Input
                type="select"
                id="coresponse-index"
                name="synonymWord"
                defaultValue={""}
                onChange={this.handleInput}
              >
                <option value="" disabled>
                  None
                </option>
                {this.props.wordArray.map((data, index) => {
                  return <option key={index}>{data.value}</option>;
                })}
              </Input>
              <ListGroup>
                {this.state.synonyms.map((word, index) => {
                  return (
                    <ListGroupItem key={index} className="mt-1">
                      <Row>
                        <Col>
                          {word.word}
                          <ListGroup>
                            {this.state.synonyms[index].synonyms.map(
                              (synonym, indexs) => {
                                return (
                                  <ListGroupItem key={indexs}>
                                    <Row>
                                      <Col>{synonym.meaning}</Col>
                                      <Col xs="auto">
                                        <Button
                                          color="danger"
                                          onClick={() => {
                                            this.removeSynonymInWord(
                                              index,
                                              indexs
                                            );
                                          }}
                                        >
                                          <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </ListGroupItem>
                                );
                              }
                            )}
                          </ListGroup>
                        </Col>
                        <Col xs="auto">
                          <Button
                            color="success"
                            onClick={() => {
                              this.toggleSynonymModal(index);
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Synonym
                          </Button>
                        </Col>
                        <Col xs="auto">
                          <Button
                            color="danger"
                            onClick={() => {
                              this.removeSynonym(index);
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
            </Col>
            <Col xs="auto">
              <Button color="success" onClick={this.setSynonym}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Synonyms;