import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  FormGroup,
  ModalFooter,
  Col,
  Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEdit,
  faPlusSquare,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  SYNONYM,
  GET_SYNONYM,
  EDIT,
  DELETE_SYNONYM,
  NLP,
  TOKENIZE,
} from 'src/constants';
import { handleInputChange } from 'src/common/handleInputChange';
import axiosClient from 'src/common/axiosClient';
import { connect } from 'react-redux';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import {
  getAllSynonyms,
  pullSynonymDetail,
  getSynonymDetail,
  editSynonymDetail,
  deleteSynonym,
} from 'src/modules/contributor';

class SynonymDetailModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      synonym_id: '',
      meaning: '',
      words: [],
      newWord: '',
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
      paragraph: '',
      tokenizedWords: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.initiateData();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  initiateData = () => {
    if (
      this.props.synonymDetail &&
      this.props.synonymDetail.synonym_id === parseInt(this.props.id)
    ) {
      this.setState({
        ...this.props.synonymDetail,
      });
    } else {
      this.setLoading(true);
      axiosClient
        .get(SYNONYM + GET_SYNONYM(this.props.id))
        .then((response) => {
          if (response.data.status) {
            const synonym = response.data.result_data;
            this.props.pullSynonymDetail(synonym);
            this.setState({
              ...synonym,
            });
          } else {
            this.setErrorAlert(true);
          }
          this.setLoading(false);
        })
        .catch(() => {
          this.setLoading(false);
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
        });
    }
  };

  handleItemChange = (event) => {
    let items = this.state.words;
    let index = event.target.name;
    let value = event.target.value;
    items[index] = value;
    this.setState({
      words: items,
    });
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

  deleteWord = (index) => {
    let list = this.state.words;
    let pos = Number(index);
    console.log(pos);
    list.splice(pos, 1);
    this.setState({
      words: list,
    });
  };

  addNewWord = () => {
    let newWord = this.state.newWord.trim();
    if (!this.checkDuplicateWord(newWord) && newWord) {
      this.setErrorAlert(false);
      let listWord = this.state.words;
      listWord.push(newWord);
      this.setState({
        words: listWord,
        newWord: '',
      });
    } else {
      this.setErrorAlert(true);
    }
  };

  checkDuplicateWord = (newWord) => {
    let duplicate = false;
    this.state.words.map((word) => {
      if (word === newWord) {
        duplicate = true;
      }
      return duplicate;
    });
    return duplicate;
  };

  editSynonym = (event) => {
    event.preventDefault();
    this.setLoading(true);
    axiosClient
      .post(SYNONYM + EDIT, {
        id: this.state.synonym_id,
        meaning: this.state.meaning,
        words: this.state.words,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          const synonym = response.data.result_data;
          this.props.editSynonymDetail(synonym);
          this.setState({
            ...synonym,
          });
          this.props.updateSynonymList([]);
          this.setSuccessAlert(true);
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

  deleteSynonym = () => {
    this.setLoading(true);
    axiosClient
      .get(SYNONYM + DELETE_SYNONYM(this.props.id))
      .then((response) => {
        if (response.data.status) {
          this.props.deleteSynonym(this.props.id);
          this.props.updateSynonymList(this.props.synonymsList);
          this.props.toggle();
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  tokenizeWord = () => {
    this.setLoading(true);
    this.setErrorAlert(false);
    this.setSuccessAlert(false);
    axiosClient
      .post(NLP + TOKENIZE, { paragraph: this.state.paragraph })
      .then((response) => {
        let words = [];
        response.data.result_data.pos.map((sentence) => {
          sentence.map((word) => {
            if (word.type !== 'CH') {
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
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  render() {
    return (
      <Container>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.props.toggle}>Synonym</ModalHeader>
          <Form onSubmit={this.editSynonym}>
            <ModalBody>
              <LoadingSpinner loading={this.state.loading} text={'Loading'} />
              <Container>
                {this.state.successAlert && (
                  <SuccessAlert
                    successAlert={this.state.successAlert}
                    text="Editing synonym is successfully"
                    onDismiss={() => this.onDismiss('successAlert')}
                  />
                )}
                {this.state.errorAlert && (
                  <ErrorAlert
                    errorAlert={this.state.errorAlert}
                    errorList={this.state.errorList}
                    onDismiss={() => this.onDismiss('errorAlert')}
                  />
                )}
                <Label>
                  <h6>ID: {this.state.synonym_id}</h6>
                </Label>
                <FormGroup>
                  <Label>Meaning: </Label>
                  <Input
                    name="meaning"
                    type="text"
                    required
                    value={this.state.meaning}
                    onChange={this.handleInput}
                  />
                </FormGroup>
                <Label>Words: </Label>

                <div className="container justify-content-center">
                  <div
                    className="border border-info p-3"
                    style={{
                      height: 200,
                      overflow: 'scroll',
                    }}
                  >
                    {this._isMounted &&
                      this.state.words.map((word, index) => (
                        <Row className="mt-2" key={index}>
                          <Col className="col-3">Word {index + 1}</Col>
                          <Col className="col-7">
                            <Input
                              name={index}
                              type="text"
                              required
                              value={word}
                              onChange={this.handleItemChange}
                            />
                          </Col>
                          <Col className="col-2">
                            <Button
                              color="danger"
                              id={index}
                              onClick={this.deleteWord.bind(this, index)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </Col>
                        </Row>
                      ))}
                  </div>
                  <Label className="mt-2">Check word tokenize:</Label>
                  <Row>
                    <Col className="col-10">
                      <Input
                        type="textarea"
                        name="paragraph"
                        onChange={this.handleInput}
                        value={this.state.paragraph}
                      />
                    </Col>
                    <Col className="col-2">
                      <Button color="warning" onClick={this.tokenizeWord}>
                        <FontAwesomeIcon icon={faCheck} color="white" />
                      </Button>
                    </Col>
                  </Row>
                  <Label className="mt-2">Tokenized words: </Label>
                  <Row>
                    <Col className="col-10">
                      <Input
                        type="textarea"
                        value={this.state.tokenizedWords}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Label className="mt-2">New word:</Label>
                  <Row>
                    <Col className="col-10">
                      <Input
                        name="newWord"
                        type="text"
                        value={this.state.newWord}
                        onChange={this.handleInput}
                      />
                    </Col>
                    <Col className="col-2">
                      <Button color="success" onClick={this.addNewWord}>
                        <FontAwesomeIcon icon={faPlusSquare} />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                disabled={this.state.loading}
              >
                <FontAwesomeIcon icon={faEdit} color="white" />
                &nbsp;Edit
              </Button>
              <Button
                color="warning"
                disabled={this.state.loading}
                style={{ color: 'white' }}
                onClick={this.deleteSynonym}
              >
                <FontAwesomeIcon icon={faTrash} color="white" />
                &nbsp;Delete
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  synonymDetail: getSynonymDetail(state),
  synonymsList: getAllSynonyms(state),
});

const mapDispatchToProps = (dispatch) => ({
  editSynonymDetail: (synonymDetail) =>
    dispatch(editSynonymDetail(synonymDetail)),
  pullSynonymDetail: (synonym) => dispatch(pullSynonymDetail(synonym)),
  deleteSynonym: (id) => dispatch(deleteSynonym(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SynonymDetailModal);
