import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Form,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";

import axiosClient from "src/common/axiosClient";
import { SYNONYM, ADD } from "src/constants";

import { addSynonymToList } from "src/modules/contributor/index";

import LoadingSpinner from "src/common/loadingSpinner/LoadingSpinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { handleInputChange } from "src/common/handleInputChange";

class NewSynonymModal extends Component {
  constructor(props) {
    super();
    this.state = {
      modal: false,
      word: "",
      meaning: "",
      words: [],
      errorAlert: false,
      errorMessage: "",
      loading: false,
      addSuccess: null,
    };
  }

  handleInput = (event) => handleInputChange(event, this);

  tokenizeWord = (word) => {
    return word;
  };

  addToList = () => {
    let word = this.state.word;
    if (word.trim() !== "") {
      let tokenizedWord = this.tokenizeWord(word);
      let words = this.state.words;
      words.push(tokenizedWord);
      this.setState({
        words: words,
      });
    }
  };

  removeWord = (index) => {
    let words = this.state.words;
    if (index > -1) {
      words.splice(index, 1);
    }
    this.setState({
      words: words,
    });
  };

  getError = () => {
    let errorMessage = "";
    if (this.state.words.length === 0) {
      errorMessage = `${errorMessage}Words field required at least one word; `;
    }
    this.setState({
      errorMessage: errorMessage,
    });
    return errorMessage;
  };

  sendCreateSynonymRequest = (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    if (this.getError().trim() === "") {
      this.setState({ errorAlert: false });
      let synonym = {
        meaning: this.state.meaning,
        words: this.state.words,
      };
      axiosClient
        .post(SYNONYM + ADD, synonym)
        .then((response) => {
          this.setState({ loading: false });
          if (response.data.status) {
            this.setState({
              addSuccess: true,
              errorAlert: false,
              word: "",
              meaning: "",
              words: [],
            });
          }
          
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });
    } else {
      this.setState({ errorAlert: true });
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        onSubmit={this.sendCreateSynonymRequest}
      >
        <LoadingSpinner loading={this.state.loading} text="Adding new synonym">
          <Form>
            <ModalHeader toggle={this.props.toggle}>New synonym</ModalHeader>
            <ModalBody>
              <Alert isOpen={this.state.addSuccess} color="success">
                Add successful
              </Alert>
              <Alert isOpen={this.state.errorAlert} color="danger">
                {this.state.errorMessage}
              </Alert>
              <FormGroup>
                <Label for="meaning">Meaning</Label>
                <Row>
                  <Col>
                    <Input
                      required
                      name="meaning"
                      id="meaning"
                      placeholder="Enter meaning"
                      value={this.state.meaning}
                      onChange={this.handleInput}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label for="word">Word</Label>
                <Row>
                  <Col>
                    <Input
                      name="word"
                      id="word"
                      placeholder="Enter similar word"
                      value={this.state.word}
                      onChange={this.handleInput}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      type="button"
                      color="success"
                      onClick={this.addToList}
                    >
                      Add to list
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
              <ListGroup>
                {this.state.words.map((word, index) => {
                  return (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col>{word}</Col>
                        <Col xs="auto">
                          <Button
                            type="button"
                            color="danger"
                            onClick={() => {
                              this.removeWord(index);
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
            </ModalBody>
            <ModalFooter>
              <Button color="success">Create</Button>
              <Button type="button" color="danger" onClick={this.props.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </LoadingSpinner>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  addSynonymToList: (synonym) => dispatch(addSynonymToList(synonym)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSynonymModal);
