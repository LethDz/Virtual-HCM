import React, { Component } from 'react';
import { Row, Col, Button, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { handleInputChange } from 'src/common/handleInputChange';

import { SynonymsModal } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
    if (this.state.synonymWord !== '' && this.state.synonymWord !== null) {
      let synonyms = this.state.synonyms;
      let synonymTemp = [];
      synonyms.forEach((synonym) => {
        let synonymId = [];
        synonym.synonyms.forEach((sy) => {
          synonymId.push(sy.synonym_id);
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
    if (this.state.synonymWord !== '' && this.state.synonymWord !== null) {
      let synonyms = this.state.synonyms;
      synonyms.push({
        word: this.state.synonymWord,
        synonyms: [],
      });
      if (this._isMounted) this.setState({ synonyms: synonyms });
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

  render() {
    return (
      <Row className="p-3" xs="1">
        {this.state.isOpenSynonymModal && (
          <SynonymsModal
            scrollToTop={this.scrollToTop}
            setAlertMessage={this.props.setAlertMessage}
            setSuccessAlert={this.props.setSuccessAlert}
            setErrorAlert={this.props.setErrorAlert}
            setErrorList={this.props.setErrorList}
            index={this.state.index}
            isOpenSynonymModal={this.state.isOpenSynonymModal}
            toggleSynonymModal={this.toggleSynonymModal}
            addSynonym={this.addSynonym}
          />
        )}

        <Col>
          Synonyms:
          <Row>
            <Col>
              <Input
                type="select"
                id="coresponse-index"
                name="synonymWord"
                defaultValue={''}
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
                                      <Col>
                                        {synonym.meaning}:&nbsp;
                                        {synonym.words.map((key, index) => {
                                          const hoverWord = this.props
                                            .hoverWord;
                                          let className = '';
                                          if (hoverWord.trim() === key.trim()) {
                                            className += 'hover-word';
                                          }
                                          return React.createElement(
                                            'span',
                                            {
                                              className: className,
                                              key: index,
                                              onMouseOver: (event) => {
                                                this.props.hover(
                                                  word.word,
                                                  'SYNONYM'
                                                );
                                                event.target.className =
                                                  'hover-word';
                                              },
                                              onMouseLeave: (event) => {
                                                this.props.hover('', 'SYNONYM');
                                                event.target.className = '';
                                              },
                                            },
                                            (key += ' ')
                                          );
                                        })}
                                      </Col>
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
                            <FontAwesomeIcon icon={faPlusCircle} /> Synonym
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
                <FontAwesomeIcon icon={faPlusCircle} /> Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Synonyms;
