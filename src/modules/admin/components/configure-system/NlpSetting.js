import {
  faInfoCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Tooltip,
} from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { criticalType, POSTags } from 'src/modules/contributor';
import {
  settingStateType2,
  settingIDType2,
  axiosCall,
} from 'src/modules/admin';
import { handleInputChange } from 'src/common/handleInputChange';

export default class NlpSetting extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      errorAlert: false,
      errorList: [],
      nlpSetting: [],
      posTagsToolTip: false,
      nerTagsToolTip: false,
      ...settingStateType2,
    };

    this.titleRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState(
      {
        nlpSetting: this.props.nlpSetting,
      },
      () => {
        let newState = {
          ...settingStateType2,
        };
        this.state.nlpSetting.map((setting) => {
          newState[setting.setting_id] = setting.value ? setting.value : '';

          return setting.value;
        });
        this.setState({
          ...newState,
        });
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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

  inputChange = (event) => {
    handleInputChange(event, this);
  };

  onChangePosTag = () => {
    axiosCall(
      settingIDType2.exclude_pos_tag,
      this.state[settingIDType2.exclude_pos_tag],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType2.exclude_pos_tag,
          this.state[settingIDType2.exclude_pos_tag]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onChangeEntityType = () => {
    axiosCall(
      settingIDType2.named_entity_types,
      this.state[settingIDType2.named_entity_types],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType2.named_entity_types,
          this.state[settingIDType2.named_entity_types]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onChangeBadSubject = () => {
    axiosCall(
      settingIDType2.subject_data_ng_pattern,
      this.state[settingIDType2.subject_data_ng_pattern],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType2.subject_data_ng_pattern,
          this.state[settingIDType2.subject_data_ng_pattern]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onChangeExcludeWord = () => {
    axiosCall(
      settingIDType2.exclude_word,
      this.state[settingIDType2.exclude_word],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType2.exclude_word,
          this.state[settingIDType2.exclude_word]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onChangeThreshold = () => {
    axiosCall(
      settingIDType2.predict_threshold,
      this.state[settingIDType2.predict_threshold],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType2.predict_threshold,
          this.state[settingIDType2.predict_threshold]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onUploadVnCore = () => {
    axiosCall(
      settingIDType2.vncorenlp,
      this.state[settingIDType2.vncorenlp],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType2.vncorenlp,
          this.state[settingIDType2.vncorenlp]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onUploadScriptPath = () => {
    axiosCall(
      settingIDType2.classifier_train_script,
      this.state[settingIDType2.classifier_train_script],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType2.classifier_train_script,
          this.state[settingIDType2.classifier_train_script]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  updateSetting = (settingID, value) => {
    const tempSetting = this.state.nlpSetting;
    const newNlpSetting = tempSetting.map((setting) => {
      if (setting.setting_id === settingID) {
        return {
          ...setting,
          value: value,
        };
      }

      return setting;
    });

    this._isMounted &&
      this.setState({
        nlpSetting: newNlpSetting,
      });
  };

  openPosToolTip = () => {
    this.setState({
      posTagsToolTip: !this.state.posTagsToolTip,
    });
  };

  openNerToolTip = () => {
    this.setState({
      nerTagsToolTip: !this.state.nerTagsToolTip,
    });
  };

  successToast = () => {
    this.props.addToast(`Update Successfully !!!`, {
      appearance: 'success',
    });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  scrollToRef = () => {
    this.titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  render() {
    return (
      <Col>
        <Container className="cl-config-container">
          {this.state.errorAlert && (
            <ErrorAlert
              errorAlert={this.state.errorAlert}
              errorList={this.state.errorList}
              onDismiss={() => this.onDismiss('errorAlert')}
            />
          )}
          <Row>
            <Col className="justify-content-center d-flex">
              <h5 className="mt-2 mb-2" ref={this.titleRef}>
                NLP Setting
              </h5>
            </Col>
          </Row>
          {this.state.nlpSetting.map((setting, index) => {
            if (setting.setting_id === settingIDType2.vncorenlp) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- VNCoreNLP data path --------------------------- */}
                  <Row className="m-2">
                    <Col className="mt-2 border-bottom p-0">
                      <h6 className="text-primary">
                        {setting.setting_name.split(': ')[1]}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                      &nbsp;
                      <span>{setting.description}</span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>File Path</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          value={this.state[settingIDType2.vncorenlp]}
                          name={settingIDType2.vncorenlp}
                          id={settingIDType2.vncorenlp}
                          onChange={this.inputChange}
                          placeholder="Please enter the path"
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button color="success" onClick={this.onUploadVnCore}>
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">Current Path: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.value}
                      >
                        {setting.value && setting.value !== ''
                          ? setting.value
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <span className="font-weight-bold">Default Path: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.default}
                      >
                        {setting.default !== '' && setting.default
                          ? setting.default
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.classifier_train_script) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Classifiers trainer script path --------------------------- */}
                  <Row className="m-2">
                    <Col className="mt-2 border-bottom p-0">
                      <h6 className="text-primary">
                        {setting.setting_name.split(': ')[1]}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                      &nbsp;
                      <span>{setting.description}</span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>File Path</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          value={
                            this.state[settingIDType2.classifier_train_script]
                          }
                          name={settingIDType2.classifier_train_script}
                          id={settingIDType2.classifier_train_script}
                          onChange={this.inputChange}
                          placeholder="Please enter the path"
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onUploadScriptPath}
                          >
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">Current Path: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.value}
                      >
                        {setting.value && setting.value !== ''
                          ? setting.value
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <span className="font-weight-bold">Default Path: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.default}
                      >
                        {setting.default !== '' && setting.default
                          ? setting.default
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.exclude_pos_tag) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Exclude POS-tag --------------------------- */}
                  <Row className="m-2">
                    <Col className="mt-2 border-bottom p-0">
                      <h6 className="text-primary">
                        {setting.setting_name.split(': ')[1]}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                      &nbsp;
                      <span>{setting.description}</span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="primary"
                            id="posTag"
                            onClick={this.openPosToolTip}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            &nbsp; Pos-tag list
                          </Button>
                          <Tooltip
                            placement="top"
                            isOpen={this.state.posTagsToolTip}
                            autohide={false}
                            target="posTag"
                          >
                            <div className="row postag-tool-tip">
                              <Col xs="auto">
                                {POSTags.slice(0, POSTags.length / 2).map(
                                  (type, index) => {
                                    return (
                                      <p
                                        className="p-0 m-1 font-sm"
                                        key={type + index}
                                      >
                                        {type}
                                      </p>
                                    );
                                  }
                                )}
                              </Col>
                              <Col xs="auto">
                                {POSTags.slice(
                                  POSTags.length / 2,
                                  POSTags.length
                                ).map((type, index) => {
                                  return (
                                    <p
                                      className="p-0 m-1 font-sm"
                                      key={type + index}
                                    >
                                      {type}
                                    </p>
                                  );
                                })}
                              </Col>
                            </div>
                          </Tooltip>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          value={this.state[settingIDType2.exclude_pos_tag]}
                          name={settingIDType2.exclude_pos_tag}
                          id={settingIDType2.exclude_pos_tag}
                          onChange={this.inputChange}
                          placeholder="Enter list of POS-tag"
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button color="success" onClick={this.onChangePosTag}>
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">Current Tags: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.value}
                      >
                        {setting.value && setting.value !== ''
                          ? setting.value
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <span className="font-weight-bold">Default Tags: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.default}
                      >
                        {setting.default !== '' && setting.default
                          ? setting.default
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.named_entity_types) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Names entity types --------------------------- */}
                  <Row className="m-2">
                    <Col className="mt-2 border-bottom p-0">
                      <h6 className="text-primary">
                        {setting.setting_name.split(': ')[1]}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                      &nbsp;
                      <span>{setting.description}</span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="primary"
                            id="nerTag"
                            onClick={this.openNerToolTip}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            &nbsp; Ner-tag list
                          </Button>
                          <Tooltip
                            placement="top"
                            isOpen={this.state.nerTagsToolTip}
                            autohide={false}
                            target="nerTag"
                          >
                            <div className="row postag-tool-tip">
                              <Col xs="auto">
                                {criticalType
                                  .slice(0, criticalType.length / 2)
                                  .map((type, index) => {
                                    return (
                                      <p
                                        className="p-0 m-1 font-sm"
                                        key={type + index}
                                      >
                                        {type}
                                      </p>
                                    );
                                  })}
                              </Col>
                              <Col xs="auto">
                                {criticalType
                                  .slice(
                                    criticalType.length / 2,
                                    criticalType.length
                                  )
                                  .map((type, index) => {
                                    return (
                                      <p
                                        className="p-0 m-1 font-sm"
                                        key={type + index}
                                      >
                                        {type}
                                      </p>
                                    );
                                  })}
                              </Col>
                            </div>
                          </Tooltip>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          value={this.state[settingIDType2.named_entity_types]}
                          name={settingIDType2.named_entity_types}
                          id={settingIDType2.named_entity_types}
                          onChange={this.inputChange}
                          placeholder="Enter list of POS-tag"
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onChangeEntityType}
                          >
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">Current Tags: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.value}
                      >
                        {setting.value && setting.value !== ''
                          ? setting.value
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <span className="font-weight-bold">Default Tags: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.default}
                      >
                        {setting.default !== '' && setting.default
                          ? setting.default
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.subject_data_ng_pattern) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Bad subject structure patterns --------------------------- */}
                  <Row className="m-2">
                    <Col className="mt-2 border-bottom p-0">
                      <h6 className="text-primary">
                        {setting.setting_name.split(': ')[1]}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                      &nbsp;
                      {setting.description.split('\n').map((des, index) => {
                        if (index === 0) {
                          return <span key={index + des}>{des}</span>;
                        }

                        return <p key={index + des}>{des}</p>;
                      })}
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
                      <InputGroup size="sm">
                        <Input
                          type="text"
                          value={
                            this.state[settingIDType2.subject_data_ng_pattern]
                          }
                          name={settingIDType2.subject_data_ng_pattern}
                          id={settingIDType2.subject_data_ng_pattern}
                          onChange={this.inputChange}
                          placeholder="Enter patterns"
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onChangeBadSubject}
                          >
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">
                        Current Patterns:{' '}
                      </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.value}
                      >
                        {setting.value && setting.value !== ''
                          ? setting.value
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <span className="font-weight-bold">
                        Default Patterns:{' '}
                      </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.default}
                      >
                        {setting.default !== '' && setting.default
                          ? setting.default
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                </Fragment>
              );
            }
            if (setting.setting_id === settingIDType2.exclude_word) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Exclude words --------------------------- */}
                  <Row className="m-2">
                    <Col className="mt-2 border-bottom p-0">
                      <h6 className="text-primary">
                        {setting.setting_name.split(': ')[1]}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                      &nbsp;
                      <span>{setting.description}</span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
                      <InputGroup size="sm">
                        <Input
                          type="text"
                          value={this.state[settingIDType2.exclude_word]}
                          name={settingIDType2.exclude_word}
                          id={settingIDType2.exclude_word}
                          onChange={this.inputChange}
                          placeholder="Enter words"
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onChangeExcludeWord}
                          >
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">Current Words: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.value}
                      >
                        {setting.value && setting.value !== ''
                          ? setting.value
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <span className="font-weight-bold">Default Words: </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.default}
                      >
                        {setting.default !== '' && setting.default
                          ? setting.default
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.predict_threshold) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Predict threshold value (For question types predicting) --------------------------- */}
                  <Row className="m-2">
                    <Col className="mt-2 border-bottom p-0">
                      <h6 className="text-primary">
                        {setting.setting_name.split(': ')[1]}
                      </h6>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <FontAwesomeIcon icon={faQuestionCircle} />
                      &nbsp;
                      <span>{setting.description}</span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          Current Value:
                        </InputGroupAddon>
                        <Input
                          type="number"
                          placeholder="Enter threshold value"
                          value={this.state[settingIDType2.predict_threshold]}
                          name={settingIDType2.predict_threshold}
                          id={settingIDType2.predict_threshold}
                          min={0}
                          max={1}
                          step="0.01"
                          onChange={this.inputChange}
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onChangeThreshold}
                          >
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">
                        Current Threshold Value:{' '}
                      </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.value}
                      >
                        {setting.value && setting.value !== ''
                          ? setting.value
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="mt-2 p-0 text-muted font-sm">
                      <span className="font-weight-bold">
                        Default Threshold Value:{' '}
                      </span>
                      <span
                        className="text-info text-truncate"
                        title={setting.default}
                      >
                        {setting.default !== '' && setting.default
                          ? setting.default
                          : 'None'}
                      </span>
                    </Col>
                  </Row>
                </Fragment>
              );
            }

            return <Fragment key={setting.setting_id + index}></Fragment>;
          })}
        </Container>
      </Col>
    );
  }
}
