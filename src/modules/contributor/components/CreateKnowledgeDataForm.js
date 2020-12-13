import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'reactstrap';
import {
  Question,
  FormSectionTitle,
  MetaData,
  Synonyms,
  RawData,
  BaseResponse,
  Coresponse,
  CriticalData,
  ReportModal,
  getDataApprovalDetail,
  getNewApprovalReport,
  resetApprovalReportDetail,
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
import { faNewspaper, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
        report_processing: null,
      },
      tokenizedWord: [],
      ner: [],
      loading: false,
      alertMessage: '',
      successAlert: false,
      errorAlert: false,
      errorList: [],
      hoverWord: '',
      isOpenReport: false,
      reportDetail: null,
      feedBackCheck: false,
      spinnerMessage: '',
    };
    this.titleRef = React.createRef();
    this.criticalDataRef = React.createRef();
    this.questionRef = React.createRef();
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.setReport();
  };
  
  setLoading = (status, message) => {
    this._isMounted &&
      this.setState({
        loading: status,
        spinnerMessage: message,
      });
  };

  setReport = () => {
    let form = this.state.form;
    let reportDetail = null;
    if (this.props.approvalReportDetail) {
      reportDetail = this.props.approvalReportDetail.report;
      form.report_processing = {
        id: reportDetail.id,
      };
      this._isMounted && this.setState({ reportDetail: reportDetail });
    } else {
      form.report_processing = null;
    }
    this.props.resetApprovalReportDetail();
    this.setState({ form: form });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleInputForm = (event) => handleInputFormChange(event, this);

  handleInput = (event) => handleInputChange(event, this);

  setTokenizeWord = (tokenizedWordArray, ner) => {
    let tokenizedWord = [];
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

  checkFormSubmit = () => {
    const form = this.state.form;
    let errorFlag = false;
    let errorList = [];

    if (form.baseResponse.trim() === '') {
      errorFlag = true;
      errorList.push('Fill in base response');
    }
    if (form.intent.trim() === '') {
      errorFlag = true;
      errorList.push('Fill in intent');
    }
    if (form.intentFullName.trim() === '') {
      errorFlag = true;
      errorList.push('Fill in intent fullname');
    }
    if (form.rawData.trim() === '') {
      errorFlag = true;
      errorList.push('Fill in raw data');
    }
    if (form.documentReference.length === 0) {
      errorFlag = true;
      errorList.push('Document reference required at least 1 reference');
    }
    if (form.coresponse.length === 0) {
      errorFlag = true;
      errorList.push('Fill in coresponse');
    }
    if (form.criticalData.length === 0) {
      errorFlag = true;
      errorList.push('Subject required at least 1 subject');
    }
    form.criticalData.forEach((data, index) => {
      if (data.word.length === 0) {
        errorFlag = true;
        errorList.push(`Subject ${index} need at least 1 component`);
      }
    });

    if (this.state.form.report_processing) {
      if (!this.state.form.report_processing.processor_note) {
        errorFlag = true;
        this._isMounted &&
          this.setState({ isOpenReport: true, feedBackCheck: true });
      }
    }

    this._isMounted && this.setState({ errorList: errorList });
    return errorFlag;
  };

  reformatForm = () => {
    let form = this.state.form;
    let references = [];
    form.documentReference.forEach((reference) => {
      references.push({
        ...reference,
        page: parseInt(reference.page),
      });
    });
    form.documentReference = references;
    return form;
  };

  submitForm = (event) => {
    this.setLoading(true, 'Sending form')
    event.preventDefault();
    if (!this.checkFormSubmit()) {
      axiosClient
        .post(KNOWLEDGE_DATA + ADD, this.reformatForm())
        .then((response) => {
          this.setLoading(false, 'Sending form')
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
          this.setLoading(false, 'Sending form')
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
          this.scrollToTop();
        });
    } else {
      this._isMounted &&
        this.setState({
          loading: false,
        });
      this.setErrorAlert(true);
      this.setSuccessAlert(false);
      this.scrollToTop();
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
    }
  };

  cancelCriticalData = () => {
    this.criticalDataRef.current.resetCriticalData();
  };

  resetGeneratedQuestion = () => {
    this.questionRef.current.resetGeneratedQuestion();
  };

  toggleReport = () => {
    this._isMounted &&
      this.setState({ isOpenReport: !this.state.isOpenReport });
  };

  saveNote = (note) => {
    let form = this.state.form;
    form.report_processing['processor_note'] = note;
    this._isMounted && this.setState({ form: form });
  };

  render() {
    const wordArray = this.getWordArray();
    return (
      <Container fluid={true}>
        <LoadingSpinner loading={this.state.loading} text={this.state.spinnerMessage} />
        <div className="mt-3">
          <div className="form-item form-item-meta pr-5 pl-5">
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

            {this.state.form.report_processing && (
              <div className="d-flex justify-content-end">
                <ReportModal
                  buttonId="report-button"
                  isOpen={this.state.isOpenReport}
                  toggle={this.toggleReport}
                  reportDetail={this.state.reportDetail}
                  saveNote={this.saveNote}
                  noteValue={
                    this.state.form.report_processing.processor_note
                      ? this.state.form.report_processing.processor_note
                      : ''
                  }
                  feedBackCheck={this.state.feedBackCheck}
                />
                <Button
                  id="report-button"
                  color="info"
                  onClick={this.toggleReport}
                >
                  <FontAwesomeIcon icon={faNewspaper} />
                    &nbsp;
                </Button>
              </div>
            )}

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
              setLoading={this.setLoading}
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
              synonymsArray={this.state.form.synonyms}
              synonymIds={this.state.synonymIdList}
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
                <FontAwesomeIcon icon={faPlusCircle} /> Create
              </Button>
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  dataApprovalDetail: getDataApprovalDetail(state),
  approvalReportDetail: getNewApprovalReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetApprovalReportDetail: () => dispatch(resetApprovalReportDetail()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKnowledgeDataForm);
