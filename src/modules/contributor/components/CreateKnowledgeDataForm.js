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
      hoverWord: '',
      hoverWordFromSynonym: '',
      alertMessage: '',
      successAlert: false,
      errorAlert: false,
      errorList: [],
    };
    this.titleRef = React.createRef();
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

  setError = () => {
    let errorMessage = [];
    if (this.state.form.questions.length === 0) {
      errorMessage.push(`Question field required at least one question`);
    }
    if (this.state.form.criticalData.length === 0) {
      errorMessage.push(`Subject field required at least one subject`);
    }
    for (let i in this.state.form.criticalData) {
      if (this.state.form.criticalData[i].word.length === 0) {
        errorMessage.push(
          `Subject at index ${i} required at least one component`
        );
      }
    }
    this.setErrorList(errorMessage);
    this.scrollToTop();
  };

  submitForm = (event) => {
    this._isMounted &&
      this.setState({
        loading: true,
      });
    event.preventDefault();
    this.setError();
    if (this.state.errorList.length === 0) {
      axiosClient
        .post(KNOWLEDGE_DATA + ADD, this.state.form)
        .then((response) => {
          if (this._isMounted)
            this.setState({
              loading: false,
            });
          if (response.data.status) {
            history.push(CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA);
            this.setErrorAlert(false);
            this.setSuccessAlert(true);
          } else {
            this.setErrorAlert(true);
            this.setSuccessAlert(false);
          }
        })
        .catch((err) => {
          if (this._isMounted)
            this.setState({
              loading: false,
            });
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
          this.scrollToTop();
        });
    } else {
      this._isMounted && this.setState({ errorAlert: true, loading: false });
    }
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
    form.questions = questions
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

  hover = (word, from) => {
    if (from === 'SYNONYM')
      if (this._isMounted)
        this.setState({ hoverWord: word, hoverWordFromSynonym: word });
      else {
        if (this._isMounted) this.setState({ hoverWord: word });
      }
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

  render() {
    const wordArray = this.getWordArray();
    return (
      <Container fluid={true}>
        <LoadingSpinner loading={this.state.loading} text="Sending form" />
        <Form onSubmit={this.submitForm} className="mt-3">
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
              scrollToTop={this.scrollToTop}
              setAlertMessage={this.setAlertMessage}
              setSuccessAlert={this.setSuccessAlert}
              setErrorAlert={this.setErrorAlert}
              setErrorList={this.setErrorList}
            />
            <hr className="mr-3 ml-3 divider" />
            <FormSectionTitle title="Data analysis" />
            <RawData
              scrollToTop={this.scrollToTop}
              setAlertMessage={this.setAlertMessage}
              setSuccessAlert={this.setSuccessAlert}
              setErrorAlert={this.setErrorAlert}
              setErrorList={this.setErrorList}
              hover={this.hover}
              hoverWord={this.state.hoverWordFromSynonym}
              setTokenizeWord={this.setTokenizeWord}
              getWordArray={this.getWordArray}
              setRawData={this.setRawData}
              onChange={this.handleInputForm}
            />
            <CriticalData
              wordArray={wordArray}
              setCritical={this.setCriticalData}
            />

            <Coresponse
              setCoresponse={this.setCoresponse}
              wordArray={wordArray}
            />
            <Question
              scrollToTop={this.scrollToTop}
              setAlertMessage={this.setAlertMessage}
              setSuccessAlert={this.setSuccessAlert}
              setErrorAlert={this.setErrorAlert}
              setErrorList={this.setErrorList}
              className="mt-3"
              setQuestions={this.setQuestions}
              setTokenizeWord={this.setTokenizeWord}
              hover={this.hover}
              hoverWord={this.state.hoverWordFromSynonym}
              synonymsArray={this.state.form.synonyms}
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
              hover={this.hover}
              hoverWord={this.state.hoverWord}
            />
            <Row className="d-flex justify-content-around pt-3 pb-3">
              <Button type="submit" color="info">
                Create new data approval
              </Button>
            </Row>
          </div>
        </Form>
      </Container>
    );
  }
}

export default CreateKnowledgeDataForm;
