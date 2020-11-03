import React, { Component } from 'react';
import { Button, Container, Row, Form, Alert } from 'reactstrap';
import {
  Question,
  FormTitle,
  FormSectionTitle,
  MetaData,
  Synonyms,
  RawData,
  BaseResponse,
  Coresponse,
  CriticalData,
  GenSynonymSentence,
} from 'src/modules/contributor/index';
import 'src/static/stylesheets/contributor.css';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import {
  handleInputFormChange,
  handleInputChange,
} from 'src/common/handleInputChange';
import axiosClient from 'src/common/axiosClient';
import { history } from 'src/common/history';

import { CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL } from 'src/constants';
import { KNOWLEDGE_DATA, ADD } from 'src/constants';

class CreateDataApprovalForm extends Component {
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
      errorAlert: false,
      errorMessage: '',
      tokenizedWord: [],
      ner: [],
      loading: false,
      hoverWord: '',
      hoverWordFromSynonym: '',
    };
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

  getError = () => {
    let errorMessage = '';
    if (this.state.form.questions.length === 0) {
      errorMessage = `${errorMessage}Question field required at least one question; `;
    }
    if (this.state.form.criticalData.length === 0) {
      errorMessage = `${errorMessage}Subject field required at least one subject; `;
    }
    for (let i in this.state.form.criticalData) {
      if (this.state.form.criticalData[i].word.length === 0)
        errorMessage = `${errorMessage}Subject at index ${i} required at least one component; `;
    }
    this.setState({
      errorMessage: errorMessage,
    });
    return errorMessage;
  };

  submitForm = (event) => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    let error = this.getError();
    if (error.trim() === '') {
      this.setState({ errorAlert: false });
      axiosClient
        .post(KNOWLEDGE_DATA + ADD, this.state.form)
        .then((response) => {
          this.setState({
            loading: false,
          });
          history.push(CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL);
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ errorAlert: true, loading: false });
    }
  };

  setCoresponse = (coresponse) => {
    let form = this.state.form;
    form.coresponse = coresponse;
    this.setState({ form: form });
  };

  setCriticalData = (criticalData) => {
    let form = this.state.form;
    form.criticalData = criticalData;
    this.setState({ form: form });
  };

  setQuestions = (questions) => {
    let form = this.state.form;
    form.questions = questions;
    this.setState({ form: form });
  };

  setReference = (reference) => {
    let form = this.state.form;
    form.documentReference = reference;
    this.setState({ form: form });
  };

  setSynonym = (synonyms) => {
    let form = this.state.form;
    form.synonyms = synonyms;
    this.setState({ form: form });
  };

  setRawData = (rawData) => {
    let form = this.state.form;
    form.rawData = rawData;
    this.setState({ form: form });
  };

  setBaseResponse = (baseResponse) => {
    let form = this.state.form;
    form.baseResponse = baseResponse;
    this.setState({
      form: form,
    });
  };

  hover = (word, from) => {
    // console.log(word);
    if (from === 'SYNONYM')
      this.setState({ hoverWord: word, hoverWordFromSynonym: word });
    else {
      this.setState({ hoverWord: word });
    }
  };

  render() {
    const wordArray = this.getWordArray();

    return (
      <Container fluid={true}>
        <LoadingSpinner loading={this.state.loading} text="Sending form" />
        <Form
          onSubmit={this.submitForm}
          style={{ width: '100%', height: '100%' }}
          className="mb-0"
        >
          <FormTitle title="New data Approval" />
          <Alert isOpen={this.state.errorAlert} color="danger">
            {this.state.errorMessage}
          </Alert>
          <div className="form-item form-item-meta">
            <FormSectionTitle title="Meta data" />
            <MetaData
              onChange={this.handleInputForm}
              setReference={this.setReference}
            />
          </div>
          <div className="form-item form-item-data mt-3 pb-3">
            <FormSectionTitle title="Data analysis" />
            <RawData
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
              className="mt-3"
              setQuestions={this.setQuestions}
              setTokenizeWord={this.setTokenizeWord}
              hover={this.hover}
              hoverWord={this.state.hoverWordFromSynonym}
            />

            <BaseResponse onChange={this.handleInputForm} />

            <Synonyms
              setSynonym={this.setSynonym}
              wordArray={wordArray}
              hover={this.hover}
              hoverWord={this.state.hoverWord}
            />

            <GenSynonymSentence
              tokenizedWordArray={this.state.tokenizedWord}
              synonymsArray={this.state.form.synonyms}
            />
          </div>

          <Row className="d-flex justify-content-around pt-3 pb-3">
            <Button type="submit" color="info">
              Create new data approval
            </Button>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default CreateDataApprovalForm;
