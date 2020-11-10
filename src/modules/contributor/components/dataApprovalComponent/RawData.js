import React, { Component } from 'react';
import { Row, Col, Label, Button, Input } from 'reactstrap';

import axiosClient from 'src/common/axiosClient';
import { NLP, TOKENIZE } from 'src/constants';
import { handleInputChange } from 'src/common/handleInputChange';

import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';

import { V, N } from 'src/modules/contributor/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faHammer } from '@fortawesome/free-solid-svg-icons';

class RawData extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      mode: 'NORMAL',
      tokenizeData: [],
      ner: [],
      loading: false,
      rawData: props.rawDataValue ? props.rawDataValue : '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.detailPage) {
      this.stateTokenizeRawDate(() => {
        this.setTokenizedWordArray();
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInput = (event) => {
    handleInputChange(event, this);
    this.props.onChange(event, this);
  };

  stateTokenizeRawDate = () => {
    if (this._isMounted) this.setState({ loading: true });
    const paragraph = {
      paragraph: this.state.rawData,
    };
    axiosClient
      .post(NLP + TOKENIZE, paragraph)
      .then((response) => {
        this._isMounted && this.setState({ loading: false });
        if (response.data.status) {
          let fullArray = [];
          response.data.result_data.pos.forEach((array) => {
            fullArray.push(...array);
          });
          let modifiedNer = [];
          let ner = response.data.result_data.ner;
          for (let sentenceIndex in ner) {
            for (let idx in ner[sentenceIndex]) {
              let type = ner[sentenceIndex][idx].type;
              let word = ner[sentenceIndex][idx].word;
              let index = ner[sentenceIndex][idx].start_idx;
              if (sentenceIndex === 0) {
                modifiedNer.push({
                  type: type,
                  word: word,
                  index: index,
                });
              } else {
                let index = ner[sentenceIndex][idx].start_idx;
                for (let i = 0; i < sentenceIndex; i++) {
                  index += response.data.result_data.pos[i].length;
                }
                modifiedNer.push({
                  type: type,
                  word: word,
                  index: index,
                });
              }
            }
          }
          if (this._isMounted)
            this.setState({
              mode: 'TOKENIZE',
              tokenizeData: fullArray,
              ner: modifiedNer,
            });
          this.setTokenizedWordArray();
          this.props.setAlertMessage('Tokenize successful');
          this.props.setSuccessAlert(true);
        } else {
          this.props.setErrorAlert(true);
          this.props.setErrorList(response.data.messages);
          this.props.scrollToTop();
        }
      })
      .catch((err) => {
        if (this._isMounted) this.setState({ loading: false });
        this.props.setErrorAlert(true);
        this.props.setSuccessAlert(false);
        this.props.scrollToTop();
      });
  };

  setRawData = () => {
    this.props.setRawData(this.state.rawData);
  };

  setTokenizedWordArray = () => {
    this.props.setTokenizeWord(this.state.tokenizeData, this.state.ner);
  };

  stateCancelTokenize = () => {
    if (this._isMounted) this.setState({ mode: 'NORMAL' });
  };

  genData = () => {};

  renderRawDataMode = () => {
    if (this.state.mode === 'TOKENIZE') {
      return (
        <Row>
          <Col xs="auto">
            <div className="d-flex flex-wrap">
              {this.state.tokenizeData.map((data, index) => {
                let flag = false;
                this.state.ner.forEach((ner) => {
                  if (ner.index === index) flag = true;
                });
                let className = 'mr-1 word-box ';
                if (this.props.hoverWord === data.value) {
                  className += 'hover-word ';
                }

                if (data.type === V) {
                  className += 'verb ';
                } else if (data.type === N) {
                  className += 'noun ';
                } else if (flag) {
                  className += 'name ';
                }

                let reactNode = React.createElement(
                  'span',
                  {
                    className: className,
                    key: index,
                    onMouseOver: (event) => {
                      this.props.hover(data.value, 'RAW_DATA');
                      let currentClassName = event.target.className;
                      if (!currentClassName.includes('hover-word')) {
                        currentClassName += 'hover-word';
                      }
                      event.target.className = currentClassName;
                    },
                    onMouseLeave: (event) => {
                      this.props.hover('', 'RAW_DATA');
                      let currentClassName = event.target.className;
                      let newClassName = currentClassName.replace(
                        'hover-word',
                        ''
                      );
                      event.target.className = newClassName;
                    },
                  },
                  data.value
                );
                return reactNode;
              })}
            </div>
          </Col>
          <Col xs="auto">
            <Button
              type="button"
              color="danger"
              className="mt-2"
              onClick={this.stateCancelTokenize}
            >
              <FontAwesomeIcon icon={faBan} />{' '}Cancel
            </Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col>
            <Input
              required
              type="textarea"
              name="rawData"
              id="rawData"
              value={this.state.rawData}
              onChange={this.handleInput}
            />
          </Col>
          <Col xs="auto">
            <Button
              type="button"
              color="primary"
              onClick={this.stateTokenizeRawDate}
            >
              <FontAwesomeIcon icon={faHammer} />{' '}Tokenize
            </Button>
          </Col>
        </Row>
      );
    }
  };
  render() {
    return (
      <Row className="p-3" xs="1">
        <Col>
          <Label for="rawData">Raw data:</Label>
        </Col>
        <Col>
          <LoadingSpinner loading={this.state.loading} text="Tokenizing">
            {this.renderRawDataMode()}
          </LoadingSpinner>
        </Col>
      </Row>
    );
  }
}

export default RawData;
