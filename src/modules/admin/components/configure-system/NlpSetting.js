import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
  settingIDType2,
  axiosCall,
  SettingComponent,
  setDefaultState,
} from 'src/modules/admin';
import { handleInputChange } from 'src/common/handleInputChange';

export default class NlpSetting extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      errorAlert: false,
      errorList: [],
      nlpSetting: [],
      posTagsToolTip: false,
      nerTagsToolTip: false,
      ...setDefaultState(props.nlpSetting),
    };
    this.titleRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      nlpSetting: this.props.nlpSetting,
    });
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

  onChangeSetting = (type, state) => {
    axiosCall(
      type,
      state,
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(type, state);
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
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'Path'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>File Path</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type={setting.hidden ? 'password' : 'text'}
                        value={this.state[settingIDType2.vncorenlp]}
                        name={settingIDType2.vncorenlp}
                        id={settingIDType2.vncorenlp}
                        onChange={this.inputChange}
                        placeholder="Please enter the path"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType2.vncorenlp,
                              this.state[settingIDType2.vncorenlp]
                            )
                          }
                        >
                          Change
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </SettingComponent>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.classifier_train_script) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Classifiers trainer script path --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'Path'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>File Path</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type={setting.hidden ? 'password' : 'text'}
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
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType2.classifier_train_script,
                              this.state[settingIDType2.classifier_train_script]
                            )
                          }
                        >
                          Change
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </SettingComponent>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.exclude_pos_tag) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Exclude POS-tag --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'Tags'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
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
                        type={setting.hidden ? 'password' : 'text'}
                        value={this.state[settingIDType2.exclude_pos_tag]}
                        name={settingIDType2.exclude_pos_tag}
                        id={settingIDType2.exclude_pos_tag}
                        onChange={this.inputChange}
                        placeholder="Enter list of POS-tag"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType2.exclude_pos_tag,
                              this.state[settingIDType2.exclude_pos_tag]
                            )
                          }
                        >
                          Change
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </SettingComponent>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.named_entity_types) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Names entity types --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'Tags'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
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
                        type={setting.hidden ? 'password' : 'text'}
                        value={this.state[settingIDType2.named_entity_types]}
                        name={settingIDType2.named_entity_types}
                        id={settingIDType2.named_entity_types}
                        onChange={this.inputChange}
                        placeholder="Enter list of POS-tag"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType2.named_entity_types,
                              this.state[settingIDType2.named_entity_types]
                            )
                          }
                        >
                          Change
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </SettingComponent>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.subject_data_ng_pattern) {
              return (
                <Fragment key={index + setting.setting_id}>
                  {/* --------------------------- Bad subject structure patterns --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={setting.description
                      .split('\n')
                      .map((des, index) => {
                        if (index === 0) {
                          return <span key={index + des}>{des}</span>;
                        }

                        return <p key={index + des}>{des}</p>;
                      })}
                    valueName={'Patterns'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <Input
                        type={setting.hidden ? 'password' : 'text'}
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
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType2.subject_data_ng_pattern,
                              this.state[settingIDType2.subject_data_ng_pattern]
                            )
                          }
                        >
                          Change
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </SettingComponent>
                </Fragment>
              );
            }
            if (setting.setting_id === settingIDType2.exclude_word) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Exclude words --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={setting.description}
                    valueName={'Words'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <Input
                        type={setting.hidden ? 'password' : 'text'}
                        value={this.state[settingIDType2.exclude_word]}
                        name={settingIDType2.exclude_word}
                        id={settingIDType2.exclude_word}
                        onChange={this.inputChange}
                        placeholder="Enter words"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType2.exclude_word,
                              this.state[settingIDType2.exclude_word]
                            )
                          }
                        >
                          Change
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </SettingComponent>
                </Fragment>
              );
            }

            if (setting.setting_id === settingIDType2.predict_threshold) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Predict threshold value (For question types predicting) --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={setting.description}
                    valueName={'Threshold Value'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        Threshold value:
                      </InputGroupAddon>
                      <Input
                        type={setting.hidden ? 'password' : 'number'}
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
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType2.predict_threshold,
                              this.state[settingIDType2.predict_threshold]
                            )
                          }
                        >
                          Change
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </SettingComponent>
                </Fragment>
              );
            }

            return (
              <Fragment key={setting.setting_id + index}>
                <SettingComponent
                  setting_name={setting.setting_name.split(': ')[1]}
                  description={setting.description}
                  valueName={'Value'}
                  value={setting.value}
                  default={setting.default}
                  hidden={setting.hidden}
                >
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      Value:
                    </InputGroupAddon>
                    <Input
                      type={setting.hidden ? 'password' : 'text'}
                      value={this.state[setting.setting_id]}
                      name={setting.setting_id}
                      id={setting.setting_id}
                      onChange={this.inputChange}
                    />
                    <InputGroupAddon addonType="prepend">
                      <Button
                        color="success"
                        onClick={() =>
                          this.onChangeSetting(
                            setting.setting_id,
                            this.state[setting.setting_id]
                          )
                        }
                      >
                        Change
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </SettingComponent>
              </Fragment>
            );
          })}
        </Container>
      </Col>
    );
  }
}
