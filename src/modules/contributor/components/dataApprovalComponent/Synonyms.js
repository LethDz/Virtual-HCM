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
      index: ""
    };
  }

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  setSynonym = () => {
    if (this.state.synonymWord !== "" && this.state.synonymWord !== null) {
      this.props.setSynonym(this.state.synonymWord);
    }
  };

  removeSynonym = (wordIndex, synonymIndex) => {
    this.props.removeSynonymInWord(wordIndex, synonymIndex);
  };

  toggleSynonymModal = (index) => {
    this.setState({
      isOpenSynonymModal: !this.state.isOpenSynonymModal,
      index: index
    })
  }

  render() {
    return (
      <Row className="p-3" xs="1">
        <SynonymsModal
          index={this.state.index}
          isOpenSynonymModal={this.state.isOpenSynonymModal}
          toggleSynonymModal={this.toggleSynonymModal}
          addSynonym={this.props.addSynonym}
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
                {this.props.synonymList.map((word, index) => {
                  return (
                    <ListGroupItem key={index} className="mt-1">
                      <Row>
                        <Col>
                          {word.word}
                          <ListGroup>
                            {this.props.synonymList[index].synonyms.map(
                              (synonym, indexs) => {
                                return (
                                  <ListGroupItem key={indexs}>
                                    <Row>
                                      <Col>{synonym.meaning}</Col>
                                      <Col xs="auto">
                                        <Button
                                          color="danger"
                                          onClick={() => {
                                            this.removeSynonym(index, indexs);
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
                              this.toggleSynonymModal(index)
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Synonym
                          </Button>
                        </Col>
                        <Col xs="auto">
                          <Button
                            color="danger"
                            onClick={() => {
                              this.props.removeSynonym(index);
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
