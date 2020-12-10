import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  ListGroup,
  ListGroupItem,
  Label,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { handleInputChange } from 'src/common/handleInputChange';

import { SynonymsModal } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faTrashAlt,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';

class Synonyms extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      synonymWord: '',
      isOpenSynonymModal: false,
      index: '',
      synonyms: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    if (this.props.synonymsValue && this.props.synonymsValue.length) {
      this.setState({ synonyms: this.props.synonymsValue });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  setSynonymToForm = () => {
    let synonyms = this.state.synonyms;
    let synonymTemp = [];
    synonyms.forEach((synonym) => {
      let synonymId = [];
      synonym.synonyms.forEach((sy) => {
        sy.synonym_id ? synonymId.push(sy.synonym_id) : synonymId.push(sy.id);
      });
      let synonymObject = {
        word: synonym.word,
        synonyms: synonymId,
      };
      synonymTemp.push(synonymObject);
    });
    this.props.resetGeneratedQuestion();
    this.props.setSynonym(synonymTemp);
  };

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  setSynonym = () => {
    if (this.state.synonymWord !== '' && this.state.synonymWord !== null) {
      let synonyms = this.state.synonyms;
      synonyms.push({
        word: this.state.synonymWord.trim(),
        synonyms: [],
      });
      if (this._isMounted)
        this.setState({ synonyms: synonyms, synonymWord: '' });
    }
  };

  toggleSynonymModal = (index) => {
    if (this._isMounted)
      this.setState({
        isOpenSynonymModal: !this.state.isOpenSynonymModal,
        index: index,
      });
  };

  addSynonym = (synonymList, index) => {
    let synonyms = this.state.synonyms;
    for (let i in synonymList) {
      synonyms[index].synonyms.push(synonymList[i]);
    }
    if (this._isMounted) this.setState({ synonyms: synonyms });
    this.setSynonymToForm();
  };

  removeSynonym = (index) => {
    let synonyms = this.state.synonyms;
    if (index > -1) {
      synonyms.splice(index, 1);
    }
    if (this._isMounted)
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
    if (this._isMounted)
      this.setState({
        synonyms: synonyms,
      });
    this.setSynonymToForm();
  };

  onMouseOver = (word) => {
    this.props.setHoverWord(word, 'SYNONYM');
  };

  onMouseLeave = () => {
    this.props.setHoverWord('', 'SYNONYM');
  };

  render() {
    return (
      <Row xs="1">
        {this.state.isOpenSynonymModal && (
          <SynonymsModal
            scrollToTop={this.scrollToTop}
            setSuccessAlert={this.props.setSuccessAlert}
            setErrorAlert={this.props.setErrorAlert}
            setErrorList={this.props.setErrorList}
            index={this.state.index}
            isOpenSynonymModal={this.state.isOpenSynonymModal}
            toggle={this.toggleSynonymModal}
            addSynonym={this.addSynonym}
          />
        )}

        <Col>
          <Label className="label">Synonyms:</Label>
          <Row>
            {!this.props.disable && (
              <Col>
                <InputGroup>
                  <Input
                    disabled={this.props.disable}
                    name="synonymWord"
                    placeholder="Enter tokenized word here"
                    value={this.state.synonymWord}
                    onChange={this.handleInput}
                  ></Input>
                  <InputGroupAddon addonType="append">
                    <Button
                      disabled={this.props.disable}
                      color="success"
                      onClick={this.setSynonym}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} /> Add
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            )}
          </Row>
          <ListGroup>
            {this.state.synonyms.map((word, index) => {
              return (
                <ListGroupItem
                  key={index}
                  className="mt-1 bound-group synonym"
                  onMouseOver={() => this.onMouseOver(word.word)}
                  onMouseLeave={this.onMouseLeave}
                >
                  <Row>
                    <Col>
                      {word.word}
                      <ListGroup>
                        {this.state.synonyms[index].synonyms.map(
                          (synonym, indexs) => {
                            return (
                              <ListGroupItem key={indexs}>
                                <Row>
                                  <Col>
                                    {synonym.meaning}:&nbsp;
                                    {synonym.words.map((key, index) => {
                                      if (index + 1 === synonym.words.length) {
                                        return <span key={index}>{key}. </span>;
                                      } 
                                      else {
                                        return <span key={index}>{key}, </span>;
                                      }
                                    })}
                                  </Col>
                                  {!this.props.disable && (
                                    <Col xs="auto">
                                      <Button
                                        disabled={this.props.disable}
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
                                  )}
                                </Row>
                              </ListGroupItem>
                            );
                          }
                        )}
                      </ListGroup>
                    </Col>
                    {!this.props.disable && (
                      <Fragment>
                        <Col xs="auto">
                          <Button
                            disabled={this.props.disable}
                            color="success"
                            onClick={() => {
                              this.toggleSynonymModal(index);
                            }}
                          >
                            <FontAwesomeIcon icon={faTasks} /> Apply synonym
                            sets
                          </Button>
                        </Col>
                        <Col xs="auto">
                          <Button
                            disabled={this.props.disable}
                            color="danger"
                            onClick={() => {
                              this.removeSynonym(index);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </Col>
                      </Fragment>
                    )}
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Synonyms;
