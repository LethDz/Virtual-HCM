import React, { Component } from 'react';
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
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faSave,
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
import {
  handleInputChange,
  handleItemInWordsChange,
} from 'src/common/handleInputChange';
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
import 'src/static/stylesheets/synonym.css';

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
    this.conRef = React.createRef();
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

  handleInput = (event) => handleInputChange(event, this);
  handleItemChange = (event) => handleItemInWordsChange(event, this);

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
    list.splice(pos, 1);
    this._isMounted &&
      this.setState({
        words: list,
      });
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
    const paragraph = this.state.paragraph;
    if (paragraph && paragraph !== this.state.oldParagraph) {
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
  };

  handleCheckBoxChange = (event) => {
    const newWord = event.target.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      if (!this.checkDuplicateWord(newWord)) {
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
    } else {
      let list = this.state.words;
      let position = -1;
      list.map((word, index) => {
        if (word === newWord) {
          position = index;
        }
        return -1;
      });
      if (position > -1) {
        list.splice(position, 1);
        this._isMounted &&
          this.setState({
            words: list,
          });
      }
    }
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    this.conRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        unmountOnClose={true}
        backdrop="static"
      >
        <ModalHeader toggle={this.props.toggle}>Synonym</ModalHeader>
        <Form onSubmit={this.editSynonym}>
          <ModalBody>
            <LoadingSpinner loading={this.state.loading} text={'Loading'} />
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
                disabled={this.state.loading}
              />
            </FormGroup>
            <Label>Words: </Label>
            <div className="container justify-content-center">
              <div className="border border-light p-3 list-word">
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
                          disabled={this.state.loading}
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
                <div ref={this.conRef}></div>
              </div>
              <Label className="mt-2">Check word tokenize:</Label>
              <Row>
                <Col className="col-10">
                  <Input
                    type="textarea"
                    name="paragraph"
                    onChange={this.handleInput}
                    value={this.state.paragraph}
                    disabled={this.state.loading}
                  />
                </Col>
                <Col className="col-2">
                  <Button
                    color="success"
                    onClick={this.tokenizeWord}
                    disabled={this.state.loading}
                  >
                    <FontAwesomeIcon icon={faCheck} color="white" />
                  </Button>
                </Col>
              </Row>
              <Label className="mt-2">Tokenized words: </Label>
              <div className="container border border-light p-3 tokenize-word">
                {this.state.tokenizedWords &&
                  this.state.tokenizedWords.map((word, index) => (
                    <label
                      key={'checkbox' + index}
                      className="mr-2 btn btn-info"
                    >
                      {word}
                      <input
                        type="checkbox"
                        className="badge-box"
                        onChange={this.handleCheckBoxChange}
                        name={word}
                      />
                      <span className="badge">&#10003;</span>
                    </label>
                  ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" disabled={this.state.loading}>
              <FontAwesomeIcon icon={faSave} color="white" />
              &nbsp;Save
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
