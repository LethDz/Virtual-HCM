import React, { Component, Fragment } from 'react';
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { handleInputChange } from 'src/common/handleInputChange';
import {
  settingIDType3,
  axiosCall,
  SettingComponent,
  setDefaultState,
} from 'src/modules/admin';

export default class ReviewProcessSetting extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      errorAlert: false,
      errorList: [],
      reviewSetting: [],
      ...setDefaultState(props.reviewSetting),
    };

    this.titleRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      reviewSetting: this.props.reviewSetting,
    });
  }

  scrollToRef = () => {
    this.titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

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

  updateSetting = (settingID, value) => {
    const tempSetting = this.state.reviewSetting;
    const newReviewSetting = tempSetting.map((setting) => {
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
        reviewSetting: newReviewSetting,
      });
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

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  successToast = () => {
    this.props.addToast(`Update Successfully !!!`, {
      appearance: 'success',
    });
  };

  render() {
    return (
      <Row className="m-0">
        <Container className="cl-config-container-review">
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
                Knowledge Data Processing Setting
              </h5>
            </Col>
          </Row>
          {this.state.reviewSetting.map((setting, index) => {
            if (setting.setting_id === settingIDType3.maximum_reject) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Maximum rejects count --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={setting.description}
                    valueName={'Maximum Rejects'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        Maximum number of rejects:
                      </InputGroupAddon>
                      <Input
                        type={setting.hidden ? 'password' : 'number'}
                        value={this.state[settingIDType3.maximum_reject]}
                        name={settingIDType3.maximum_reject}
                        id={settingIDType3.maximum_reject}
                        onChange={this.inputChange}
                        min={1}
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType3.maximum_reject,
                              this.state[settingIDType3.maximum_reject]
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

            if (setting.setting_id === settingIDType3.minimum_accept) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Minimum Accept count --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={setting.description}
                    valueName={'Minimum Accepts'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        Minimum number of accepts:
                      </InputGroupAddon>
                      <Input
                        type={setting.hidden ? 'password' : 'number'}
                        value={this.state[settingIDType3.minimum_accept]}
                        name={settingIDType3.minimum_accept}
                        id={settingIDType3.minimum_accept}
                        onChange={this.inputChange}
                        min={1}
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType3.minimum_accept,
                              this.state[settingIDType3.minimum_accept]
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
      </Row>
    );
  }
}
