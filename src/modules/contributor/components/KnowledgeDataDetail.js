import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axiosClient from 'src/common/axiosClient';
import { Button, Container, Row, Col } from 'reactstrap';
import { GET_KNOWLEDGE_DATA_BY_INTENT_PARAMS } from 'src/constants';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import {
  getDataApprovalDetail,
  pullDataApproval,
  resetDataApprovalDetail,
  resetApprovalReportDetail,
  getNewApprovalReport,
  Question,
  FormSectionTitle,
  MetaData,
  Synonyms,
  RawData,
  BaseResponse,
  Coresponse,
  CriticalData,
  Vote,
  Comment,
  ReportModal,
  PROCESSING,
  DONE,
  DISABLE,
  AVAILABLE,
} from 'src/modules/contributor/index';
import 'src/static/stylesheets/contributor.css';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import {
  handleInputFormChange,
  handleInputChange,
} from 'src/common/handleInputChange';
import { history } from 'src/common/history';
import { getUserData } from 'src/common/authorizationChecking';

import { CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA } from 'src/constants';
import { KNOWLEDGE_DATA, EDIT } from 'src/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faNewspaper } from '@fortawesome/free-solid-svg-icons';

class KnowledgeDataDetail extends Component {
  _isMounted = false;
  constructor(props) {
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
        id: null,
        report_processing: null,
      },
      comments: null,
      userList: [],
      documentList: [],
      tokenizedWord: [],
      ner: [],
      loading: true,
      alertMessage: '',
      successAlert: false,
      errorAlert: false,
      errorList: [],
      sendLoading: false,
      synonymIdList: [],
      hoverWord: '',
      formStatus: '',
      disable: true,
      owner: false,
      isOpenReport: false,
      reportDetail: null,
      feedBackCheck: false,
      spinnerMessage: '',
      reviews: null,
      reloadInfo: false,
    };
    this.titleRef = React.createRef();
    this.criticalDataRef = React.createRef();
    this.questionRef = React.createRef();
  }

  componentDidUpdate() {
    if (
      this._isMounted &&
      !this.state.loading &&
      this.props.dataApprovalDetail &&
      (this.props.approvalReportDetail ||
        this.props.intent !== this.props.dataApprovalDetail.intent)
    ) {
      this.getInformation();
      this.scrollToTop();
    }
  }

  setReload = (status) => {
    this._isMounted && this.setState({ reloadInfo: status });
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

  reformatForm = () => {
    let form = this.state.form;
    let synonym = [];
    form.synonyms.forEach((synonyms) => {
      let synonymIds = [];
      synonyms.synonyms.forEach((item) => {
        synonymIds.push(item.id ? item.id : item);
      });
      synonym.push({ word: synonyms.word, synonyms: synonymIds });
    });
    form.synonyms = synonym;
    this._isMounted && this.setState({ form: form });
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
    this._isMounted && this.setState({ errorList: errorList });
    if (this.state.form.report_processing) {
      if (!this.state.form.report_processing.processor_note) {
        errorFlag = true;
        this._isMounted &&
          this.setState({ isOpenReport: true, feedBackCheck: true });
      }
    }
    return errorFlag;
  };

  submitForm = (event) => {
    event.preventDefault();
    if (!this.checkFormSubmit()) {
      this.reformatForm();
      this._isMounted &&
        this.setState({
          sendLoading: true,
        });
      this.setLoading(true, 'Sending form');
      axiosClient
        .post(KNOWLEDGE_DATA + EDIT, this.state.form)
        .then((response) => {
          this.setLoading(false, 'Sending form');
          if (response.data.status) {
            history.push(CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA);
            this.props.resetDataApprovalDetail();
          } else {
            this.setErrorList(response.data.messages);
            this.setErrorAlert(true);
            this.setSuccessAlert(false);
            this.scrollToTop();
          }
        })
        .catch((err) => {
          this.setLoading(false, 'Sending form');
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
          this.scrollToTop();
        });
    } else {
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
    let synonymIdList = [];
    synonyms.forEach((synonyms) => {
      let synonymIds = [];
      synonyms.synonyms.forEach((item) => {
        if (item.id) {
          synonymIds.push(item.id);
        } else if (item.synonym_id) {
          synonymIds.push(item.synonym_id);
        } else {
          synonymIds.push(item);
        }
      });
      synonymIdList.push({ word: synonyms.word, synonyms: synonymIds });
    });

    if (this._isMounted)
      this.setState({ form: form, synonymIdList: synonymIdList });
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

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.getInformation();
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

  setFormStatus = () => {
    let user = getUserData();
    switch (this.props.dataApprovalDetail.status.toUpperCase()) {
      case AVAILABLE:
        this._isMounted &&
          this.setState({ formStatus: AVAILABLE, disable: false });
        break;
      case PROCESSING:
        this._isMounted && this.setState({ formStatus: PROCESSING });
        if (this.props.dataApprovalDetail.edit_user_id === user.user_id) {
          this._isMounted && this.setState({ owner: true, disable: false });
        }
        break;
      case DONE:
        this._isMounted && this.setState({ formStatus: DONE, disable: true });
        this.state.reportDetail && this.setState({ disable: false });
        if (this.props.dataApprovalDetail.edit_user_id === user.user_id) {
          this._isMounted && this.setState({ owner: true, disable: false });
        }
        break;
      case DISABLE:
        this._isMounted &&
          this.setState({ formStatus: DISABLE, disable: true });
        break;
      default:
    }
  };

  getInformation = () => {
    this.setLoading(true, 'Getting information');
    this.setReload(true);
    axiosClient
      .get(GET_KNOWLEDGE_DATA_BY_INTENT_PARAMS(this.props.intent))
      .then((response) => {
        this.setLoading(false, 'Getting information');
        if (response.data.status) {
          this.setFormData(response.data.result_data);
          this.props.pullDataApproval(response.data.result_data);

          let userList = response.data.result_data.comments.users;
          this._isMounted &&
            this.setState({
              reviews: response.data.result_data.reviews,
              comments: response.data.result_data.comments.data,
              userList: userList,
            });
          this.setFormStatus();
          this.setReload(false);
          this.setErrorAlert(false);
        } else {
          this.setLoading(false);
          this.setReload(false);
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
        }
      })
      .catch((err) => {
        this.setReload(false);
        this.setErrorAlert(true);
        this.setLoading(false, 'Getting information');
      });
    this.state.reloadInfo && this.setReport();
  };

  setFormData = (dataApproval) => {
    let form = this.state.form;
    form.baseResponse = dataApproval.baseResponse;
    form.coresponse = dataApproval.coresponse;
    form.criticalData = dataApproval.criticalData;
    let referenceList = [];
    dataApproval.documentReference.forEach((reference) => {
      referenceList.push({
        name: reference.name,
        extra_info: reference.extra_info,
        id: reference.id,
        page: reference.page ? reference.page.toString() : '',
      });
    });
    form.documentReference = referenceList;
    form.intent = dataApproval.intent;
    form.intentFullName = dataApproval.intentFullName;
    form.questions = dataApproval.questions;
    form.rawData = dataApproval.rawData;
    form.synonyms = dataApproval.synonyms;
    form.id = dataApproval.id;

    let synonym = [];
    form.synonyms.forEach((synonyms) => {
      let synonymIds = [];
      synonyms.synonyms.forEach((item) => {
        synonymIds.push(item.id ? item.id : item.synonym_id);
      });
      synonym.push({ word: synonyms.word, synonyms: synonymIds });
    });

    this._isMounted && this.setState({ form: form, synonymIdList: synonym });
  };

  getWordArray = () => {
    const rawData = this.state.tokenizedWord;
    let wordArray = [];
    for (let index in rawData) {
      wordArray.push(rawData[index]);
    }
    return wordArray;
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

  setLoading = (status, message) => {
    this._isMounted &&
      this.setState({
        loading: status,
        spinnerMessage: message,
      });
  };

  renderProcessMode = () => {
    const wordArray = this.getWordArray();
    return (
      <Container fluid={true}>
        <LoadingSpinner
          loading={this.state.loading}
          text={this.state.spinnerMessage}
        />

        <div className="mt-3">
          <div className="form-item form-item-meta pr-5 pl-5 pb-5">
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
                  Edit knowledge data: {this.props.intent}
                  <br />
                  ID: {this.state.form.id}
                </h4>
              </Col>
            </Row>
            {this.state.form.intent.trim() !== '' && !this.state.reloadInfo && (
              <Fragment>
                {this.state.form.report_processing && (
                  <div className="d-flex justify-content-end">
                    <ReportModal
                      buttonId="report-button"
                      isOpen={this.state.isOpenReport}
                      toggle={this.toggleReport}
                      reportDetail={this.state.reportDetail}
                      saveNote={this.saveNote}
                      feedBackCheck={this.state.feedBackCheck}
                      noteValue={
                        this.state.form.report_processing.processor_note
                          ? this.state.form.report_processing.processor_note
                          : ''
                      }
                    />
                    <Button
                      id="report-button"
                      color="info"
                      onClick={this.toggleReport}
                    >
                      <FontAwesomeIcon icon={faNewspaper} />
                      &nbsp; Report
                    </Button>
                  </div>
                )}

                <FormSectionTitle title="Meta data" />
                <MetaData
                  disable={this.state.disable}
                  intentValue={this.state.form.intent}
                  intentFullNameValue={this.state.form.intentFullName}
                  referenceValue={this.state.form.documentReference}
                  onChange={this.handleInputForm}
                  setReference={this.setReference}
                  setSuccessAlert={this.setSuccessAlert}
                  setErrorAlert={this.setErrorAlert}
                  setErrorList={this.setErrorList}
                />
                <hr className="mr-3 ml-3 divider" />
                <FormSectionTitle title="Data analysis" />
                {this.state.form.rawData && (
                  <RawData
                    disable={this.state.disable}
                    hoverWord={this.state.hoverWord}
                    detailPage={true}
                    rawDataValue={this.state.form.rawData}
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
                )}
                {wordArray.length !== 0 && (
                  <CriticalData
                    disable={this.state.disable}
                    ref={this.criticalDataRef}
                    criticalDataValue={this.state.form.criticalData}
                    wordArray={wordArray}
                    ner={this.state.ner}
                    setCritical={this.setCriticalData}
                  />
                )}

                <Coresponse
                  disable={this.state.disable}
                  coresponseValue={this.state.form.coresponse}
                  setCoresponse={this.setCoresponse}
                  wordArray={wordArray}
                />
                <Question
                  disable={this.state.disable}
                  ref={this.questionRef}
                  detailPage={true}
                  questionValue={this.state.form.questions}
                  scrollToTop={this.scrollToTop}
                  setSuccessAlert={this.setSuccessAlert}
                  setErrorAlert={this.setErrorAlert}
                  setErrorList={this.setErrorList}
                  setQuestions={this.setQuestions}
                  synonymsArray={this.state.form.synonyms}
                  synonymIds={this.state.synonymIdList}
                  className="mt-3"
                />

                <BaseResponse
                  disable={this.state.disable}
                  baseResponseValue={this.state.form.baseResponse}
                  onChange={this.handleInputForm}
                />

                <Synonyms
                  disable={this.state.disable}
                  scrollToTop={this.scrollToTop}
                  setAlertMessage={this.setAlertMessage}
                  setSuccessAlert={this.setSuccessAlert}
                  setErrorAlert={this.setErrorAlert}
                  setErrorList={this.setErrorList}
                  setSynonym={this.setSynonym}
                  wordArray={wordArray}
                  resetGeneratedQuestion={this.resetGeneratedQuestion}
                  synonymsValue={this.state.form.synonyms}
                  setHoverWord={this.setHoverWord}
                />
                <Row className="d-flex justify-content-around mt-3 pb-3">
                  {!this.state.disable &&
                    (this.state.formStatus === AVAILABLE ||
                      (this.state.formStatus === PROCESSING &&
                        this.state.owner) ||
                      (this.state.formStatus === DONE && this.state.owner)) && (
                      <Button
                        disabled={this.state.disable}
                        type="submit"
                        color="info"
                        onClick={this.submitForm}
                      >
                        <FontAwesomeIcon icon={faSave} /> Save knowledge data
                      </Button>
                    )}
                </Row>
                <hr className="mr-3 ml-3 divider" />
                <FormSectionTitle title="User review" />

                {this.state.reviews && (
                  <Vote
                    review={this.state.reviews}
                    formStatus={this.state.formStatus}
                    knowledgeDataId={this.state.form.id}
                    owner={this.state.owner}
                    setSuccessAlert={this.setSuccessAlert}
                    setErrorAlert={this.setErrorAlert}
                    setAlertMessage={this.setAlertMessage}
                    scrollToTop={this.scrollToTop}
                  />
                )}
                {this.state.comments && (
                  <Comment
                    formStatus={this.state.formStatus}
                    knowledgeDataId={this.state.form.id}
                    comments={this.state.comments}
                    userList={this.state.userList}
                    setErrorAlert={this.setErrorAlert}
                    setSuccessAlert={this.setSuccessAlert}
                    scrollToTop={this.scrollToTop}
                  />
                )}
              </Fragment>
            )}
          </div>
        </div>
      </Container>
    );
  };

  render() {
    return this.renderProcessMode();
  }
}

const mapStateToProps = (state) => ({
  dataApprovalDetail: getDataApprovalDetail(state),
  approvalReportDetail: getNewApprovalReport(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullDataApproval: (dataApproval) => dispatch(pullDataApproval(dataApproval)),
  resetDataApprovalDetail: () => dispatch(resetDataApprovalDetail()),
  resetApprovalReportDetail: () => dispatch(resetApprovalReportDetail()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KnowledgeDataDetail);
