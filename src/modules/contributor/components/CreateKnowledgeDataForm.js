import React, { Component } from 'react';
import { Button, Container, Row, Col, Form } from 'reactstrap';
import {
  Question,
  FormSectionTitle,
  MetaData,
  Synonyms,
  RawData,
  BaseResponse,
  Coresponse,
  CriticalData,
} from 'src/modules/contributor/index';
import 'src/static/stylesheets/contributor.css';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import {
  handleInputFormChange,
  handleInputChange,
} from 'src/common/handleInputChange';
import axiosClient from 'src/common/axiosClient';
import { history } from 'src/common/history';

import { CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA } from 'src/constants';
import { KNOWLEDGE_DATA, ADD } from 'src/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class CreateKnowledgeDataForm extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      form: {
        intent: '',
        intentFullName: '',
        questions: [],
        criticalData: [],
        coresponse: [],
        rawData: '',
        synonyms: [],
        baseResponse: '',
        documentReference: [],
      },
      tokenizedWord: [],
      ner: [],
      loading: false,
      alertMessage: '',
      successAlert: false,
      errorAlert: false,
      errorList: [],
      hoverWord: '',
    };
    this.titleRef = React.createRef();
    this.criticalDataRef = React.createRef();
    this.questionRef = React.createRef();
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleInputForm = (event) => handleInputFormChange(event, this);

  handleInput = (event) => handleInputChange(event, this);

  setTokenizeWord = (tokenizedWordArray, ner) => {
    let tokenizedWord = this.state.tokenizedWord;
    let nerArray = this.state.ner;

    tokenizedWordArray.forEach((word) => {
      let flag = false;
      tokenizedWord.forEach((current) => {
        if (current.value === word.value) {
          flag = true;
        }
      });
      if (!flag) tokenizedWord.push(word);
    });

    ner.forEach((ner) => {
      if (!nerArray.includes(ner)) nerArray.push(ner);
    });

    if (this._isMounted)
      this.setState({
        tokenizedWord: tokenizedWord,
        ner: nerArray,
      });
  };

  getWordArray = () => {
    const rawData = this.state.tokenizedWord;
    let wordArray = [];
    for (let index in rawData) {
      wordArray.push(rawData[index]);
    }
    return wordArray;
  };

  submitForm = (event) => {
    this._isMounted &&
      this.setState({
        loading: true,
      });
    event.preventDefault();
    axiosClient
      .post(KNOWLEDGE_DATA + ADD, this.state.form)
      .then((response) => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
        if (response.data.status) {
          history.push(CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA);
        } else {
          this.setErrorList(response.data.messages);
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
          this.scrollToTop();
        }
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
        this.scrollToTop();
      });
  };

  setCoresponse = (coresponse) => {
    let form = this.state.form;
    form.coresponse = coresponse;
    if (this._isMounted) this.setState({ form: form });
  };

  setCriticalData = (criticalData) => {
    let form = this.state.form;
    form.criticalData = criticalData;
    if (this._isMounted) this.setState({ form: form });
  };

  setQuestions = (questions) => {
    let form = this.state.form;
    form.questions = questions;
    if (this._isMounted) this.setState({ form: form });
  };

  setReference = (reference) => {
    let form = this.state.form;
    form.documentReference = reference;
    if (this._isMounted) this.setState({ form: form });
  };

  setSynonym = (synonyms) => {
    let form = this.state.form;
    form.synonyms = synonyms;
    this.resetGeneratedQuestion();
    this.setSynonymId();
    if (this._isMounted) this.setState({ form: form });
  };

  setRawData = (rawData) => {
    let form = this.state.form;
    form.rawData = rawData;
    if (this._isMounted) this.setState({ form: form });
  };

  setBaseResponse = (baseResponse) => {
    let form = this.state.form;
    form.baseResponse = baseResponse;
    if (this._isMounted)
      this.setState({
        form: form,
      });
  };

  setSynonymId = () => {
    let form = this.state.form;
    let synonym = [];
    form.synonyms.forEach((synonyms) => {
      let synonymIds = [];
      synonyms.synonyms.forEach((id) => {
        synonymIds.push(id);
      });
      synonym.push({ word: synonyms.word, synonyms: synonymIds });
    });

    this._isMounted && this.setState({ synonymIdList: synonym });
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

  setAlertMessage = (message) => {
    this._isMounted &&
      this.setState({
        alertMessage: message,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  scrollToTop = () => {
    this.titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  setHoverWord = (word, from) => {
    if (from === 'SYNONYM' && this._isMounted) {
      this.setState({ hoverWord: word });
      console.log(word);
    }
  };

  cancelCriticalData = () => {
    this.criticalDataRef.current.resetCriticalData();
  };

  resetGeneratedQuestion = () => {
    this.questionRef.current.resetGeneratedQuestion();
  };

  render() {
    const wordArray = this.getWordArray();
    return (
      <Container fluid={true}>
        <LoadingSpinner loading={this.state.loading} text="Sending form" />
        <Form className="mt-3">
          <div className="form-item form-item-meta pr-3 pl-3">
            <div className="mr-3 ml-3">
              {this.state.successAlert && (
                <SuccessAlert
                  successAlert={this.state.successAlert}
                  text={this.state.alertMessage}
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
            </div>
            <Row xs="1">
              <Col>
                <h4 className="text-center m-3" ref={this.titleRef}>
                  Create new knowledge data
                </h4>
              </Col>
            </Row>
            <FormSectionTitle title="Meta data" />
            <MetaData
              onChange={this.handleInputForm}
              setReference={this.setReference}
            />
            <hr className="mr-3 ml-3 divider" />
            <FormSectionTitle title="Data analysis" />
            <RawData
              hoverWord={this.state.hoverWord}
              scrollToTop={this.scrollToTop}
              setSuccessAlert={this.setSuccessAlert}
              setErrorAlert={this.setErrorAlert}
              setErrorList={this.setErrorList}
              setTokenizeWord={this.setTokenizeWord}
              getWordArray={this.getWordArray}
              setRawData={this.setRawData}
              cancelCriticalData={this.cancelCriticalData}
              onChange={this.handleInputForm}
            />
            <CriticalData
              ref={this.criticalDataRef}
              wordArray={wordArray}
              ner={this.state.ner}
              setCritical={this.setCriticalData}
            />

            <Coresponse
              setCoresponse={this.setCoresponse}
              wordArray={wordArray}
            />
            <Question
              hoverWord={this.state.hoverWord}
              ref={this.questionRef}
              questionValue={this.state.form.questions}
              scrollToTop={this.scrollToTop}
              setSuccessAlert={this.setSuccessAlert}
              setErrorAlert={this.setErrorAlert}
              setErrorList={this.setErrorList}
              setQuestions={this.setQuestions}
              setTokenizeWord={this.setTokenizeWord}
              synonymsArray={this.state.form.synonyms}
              synonymIds={this.state.synonymIdList}
              className="mt-3"
            />

            <BaseResponse onChange={this.handleInputForm} />

            <Synonyms
              scrollToTop={this.scrollToTop}
              setAlertMessage={this.setAlertMessage}
              setSuccessAlert={this.setSuccessAlert}
              setErrorAlert={this.setErrorAlert}
              setErrorList={this.setErrorList}
              setSynonym={this.setSynonym}
              wordArray={wordArray}
              resetGeneratedQuestion={this.resetGeneratedQuestion}
              setHoverWord={this.setHoverWord}
            />
            <Row className="d-flex justify-content-around pt-3 pb-3">
              <Button type="submit" color="info" onClick={this.submitForm}>
                <FontAwesomeIcon icon={faPlusCircle} /> Create new knowledge
                data
              </Button>
            </Row>
          </div>
        </Form>
      </Container>
    );
  }
}

export default CreateKnowledgeDataForm;
