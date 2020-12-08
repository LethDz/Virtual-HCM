import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Col,
  Row,
} from "reactstrap";
import {
  handleInputChange,
  handleItemInWordsChange,
} from "src/common/handleInputChange";
import axiosClient from "src/common/axiosClient";
import { connect } from "react-redux";
import LoadingSpinner from "src/common/loadingSpinner/LoadingSpinner";
import ErrorAlert from "src/common/alertComponent/ErrorAlert";
import SuccessAlert from "src/common/alertComponent/SuccessAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  getAllSynonyms,
  addSynonymToList,
  POSTags,
} from "src/modules/contributor";
import { SYNONYM, ADD, NLP, TOKENIZE } from "src/constants";
import "src/static/stylesheets/synonym.css";

class CreateSynonymModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      meaning: "",
      words: [],
      newWord: "",
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
      paragraph: "",
      tokenizedWords: [],
    };
    this.conRef = React.createRef();
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  handleInput = (event) => handleInputChange(event, this);

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setSuccessAlert = (status) => {
    this._isMounted &&
      this.setState({
        successAlert: status,
      });
  };

  setErrorAlert = (status) => {
    this._isMounted &&
      this.setState({
        errorAlert: status,
      });
  };

  setErrorList = (list) => {
    this._isMounted &&
      this.setState({
        errorList: list,
      });
  };

  handleItemChange = (event) => handleItemInWordsChange(event, this);

  deleteWord = (index) => {
    let pos = parseInt(index);
    let list = this.removeItemWithSlice(pos, this.state.words);
    this._isMounted &&
      this.setState({
        words: list,
      });
  };

  removeItemWithSlice = (index, items) => {
    const firstArr = items.slice(0, index);
    const secondArr = items.slice(index + 1);
    return [...firstArr , ...secondArr]
  }

  checkDuplicateWord = (newWord) => {
    let duplicate = false;
    this.state.words.map((word) => {
      if (word === newWord) {
        duplicate = true;
        let error = this.state.errorList;
        error.push("This word existed!");
        this.setErrorList(error);
      }
      return duplicate;
    });
    return duplicate;
  };

  addSynonym = (event) => {
    event.preventDefault();
    this.setLoading(true);
    this.setErrorAlert(false);
    this.setSuccessAlert(false);
    axiosClient
      .post(SYNONYM + ADD, {
        meaning: this.state.meaning,
        words: this.state.words,
      })
      .then((response) => {
        if (response.data.status) {
          const synonym = response.data.result_data;
          this.props.addSynonymToList(synonym);
          this.props.updateSynonymList([]);
          this.setSuccessAlert(true);
          this.props.toggle();
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .then(() => {
        this.props.updateSynonymList(this.props.synonymsList);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  tokenizeWord = async () => {
    await this.setErrorList([]);
    const paragraph = this.state.paragraph;
    if (this.checkInputEmpty(paragraph, "Nothing to check!")) {
      if (paragraph !== this.state.oldParagraph) {
        this.setLoading(true);
        this.setErrorAlert(false);
        this.setSuccessAlert(false);
        this.setState({
          oldParagraph: paragraph,
          tokenizedWords: [],
        });
        axiosClient
          .post(NLP + TOKENIZE, { paragraph: this.state.paragraph })
          .then((response) => {
            if (response.data.status) {
              let words = [];
              response.data.result_data.pos.map((sentence) => {
                sentence.map((word) => {
                  if (word.type !== POSTags[POSTags.length - 1]) {
                    words.push(word.value);
                  }
                  return word;
                });
                return sentence;
              });

              this.setState({
                tokenizedWords: words,
              });
              this.setLoading(false);
            } else {
              this.setErrorAlert(true);
              this.setErrorList(response.data.messages);
            }
          })
          .catch(() => {
            this.setLoading(false);
            this.setErrorAlert(true);
            this.setSuccessAlert(false);
          });
      }
    } else {
      this.setErrorAlert(true);
    }
  };

  addNewWord = async () => {
    await this.setErrorList([]);
    let newWord = this.state.newWord.trim();
    if (
      !this.checkDuplicateWord(newWord) &&
      this.checkInputEmpty(newWord, "Input cannot be empty")
    ) {
      this.setErrorAlert(false);
      let listWord = this.state.words;
      listWord.push(newWord);
      this._isMounted &&
        this.setState({
          words: listWord,
          newWord: "",
        });
    } else {
      this.setErrorAlert(true);
    }
  };

  checkInputEmpty = (word, message) => {
    if (!word) {
      let error = this.state.errorList;
      error.push(message);
      this.setErrorList(error);
      return false;
    }
    return true;
  };

  scrollToBottom = () => {
    this.conRef.current.scrollIntoView({ behavior: "smooth" });
  };

  toggle = () => {
    !this.state.loading && this.props.toggle();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        unmountOnClose={true}
      >
        <ModalHeader toggle={this.toggle}>Create New Synonym</ModalHeader>
        <Form onSubmit={this.addSynonym}>
          <ModalBody>
            <LoadingSpinner loading={this.state.loading} text={"Loading"} />
            {this.state.successAlert && (
              <SuccessAlert
                successAlert={this.state.successAlert}
                text="Adding synonym is successfully"
                onDismiss={() => this.onDismiss("successAlert")}
              />
            )}
            {this.state.errorAlert && this.state.errorList && (
              <ErrorAlert
                errorAlert={this.state.errorAlert}
                errorList={this.state.errorList}
                onDismiss={() => this.onDismiss("errorAlert")}
              />
            )}
            <FormGroup>
              <Label className="font-weight-bold">Meaning: </Label>
              <Input
                name="meaning"
                type="text"
                required
                value={this.state.meaning}
                onChange={this.handleInput}
                disabled={this.state.loading}
              />
            </FormGroup>
            <Label className="font-weight-bolder">Words: </Label>
            <div className="container justify-content-center">
              <div className="border border-light p-3 list-word">
                {this._isMounted &&
                  this.state.words &&
                  this.state.words.map((word, index) => (
                    <Row className="mt-2" key={"word" + index}>
                      <Col className="col-3 mt-2">Word {index + 1}</Col>
                      <Col className="col-7">
                        <Input
                          name={index}
                          type="text"
                          required
                          value={word}
                          onChange={this.handleItemChange}
                          disabled={this.state.loading}
                        />
                      </Col>
                      <Col className="col-2">
                        <Button
                          color="warning"
                          id={index}
                          onClick={this.deleteWord.bind(this, index)}
                        >
                          <FontAwesomeIcon icon={faMinus} color="white" />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                <Row className="mt-2">
                  <Col className="col-3 mt-2">New word</Col>
                  <Col className="col-7">
                    <Input
                      name="newWord"
                      type="text"
                      onChange={this.handleInput}
                      disabled={this.state.loading}
                      value={this.state.newWord}
                    />
                  </Col>
                  <Col className="col-2">
                    <Button color="success" onClick={this.addNewWord}>
                      <FontAwesomeIcon icon={faPlus} color="white" />
                    </Button>
                  </Col>
                </Row>
                <div ref={this.conRef}></div>
              </div>
              <Label className="mt-3 title">Check tokenizing word:</Label>
              <Row>
                <Col className="col-10">
                  <Input
                    type="textarea"
                    name="paragraph"
                    placeholder="Please enter words you want to tokenize..."
                    onChange={this.handleInput}
                    value={this.state.paragraph}
                    disabled={this.state.loading}
                  />
                </Col>
                <Col className="col-2">
                  <Button
                    color="primary"
                    onClick={this.tokenizeWord}
                    disabled={this.state.loading}
                  >
                    <FontAwesomeIcon icon={faCheck} color="white" />
                  </Button>
                </Col>
              </Row>
              <Label className="mt-3 title">Tokenized words: </Label>
              <Row>
                <Col>
                  <div className="tokenized-word-list">
                    <div className="list-content">
                      {this.state.tokenizedWords.map((word) => (
                        <span className="tokenized-word">{word}</span>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" disabled={this.state.loading}>
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp;Create
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  synonymsList: getAllSynonyms(state),
});

const mapDispatchToProps = (dispatch) => ({
  addSynonymToList: (synonym) => dispatch(addSynonymToList(synonym)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateSynonymModal);
