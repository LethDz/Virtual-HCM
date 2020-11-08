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
  faEdit,
  faPlusSquare,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { SYNONYM, GET_SYNONYM } from 'src/constants';
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

  deleteWord = (event) => {
    let list = this.state.words;
    let index = event.target.id;
    list.splice(index, 1);
    this.setState({
      words: list,
    });
  };

  addNewWord = () => {
    let newWord = this.state.newWord.trim();
    if (!this.checkDuplicateWord(newWord) && newWord) {
      this.setErrorAlert(false);
      let listWord = this.state.words;
      listWord.push(this.state.newWord);
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
    });
    return duplicate;
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
          <Form>
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
                      height: 250,
                      overflow: 'scroll',
                    }}
                  >
                    {this.state.words.map((word, index) => {
                      return (
                        <Row className="mt-2">
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
                              onClick={this.deleteWord}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </Col>
                        </Row>
                      );
                    })}
                  </div>
                  <Label className="mt-4">New word:</Label>
                  <Row>
                    <Col className="col-10">
                      <Input
                        name="newWord"
                        type="text"
                        required
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
  synonymList: getAllSynonyms(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullSynonymDetail: (synonym) => dispatch(pullSynonymDetail(synonym)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SynonymDetailModal);
