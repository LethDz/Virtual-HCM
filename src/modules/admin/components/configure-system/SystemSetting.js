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
  settingStateType1,
  settingIDType1,
  axiosCall,
  SettingComponent,
} from 'src/modules/admin';

export default class SystemSetting extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      errorAlert: false,
      errorList: [],
      systemSetting: [],
      ...settingStateType1,
    };

    this.titleRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      systemSetting: this.props.systemSetting,
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

  updateSetting = (settingID, value) => {
    const tempSetting = this.state.systemSetting;
    const newSystemSetting = tempSetting.map((setting) => {
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
        systemSetting: newSystemSetting,
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

  scrollToRef = () => {
    this.titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  render() {
    return (
      <Row className="m-0">
        <Container className="cl-config-container-system">
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
                System Setting
              </h5>
            </Col>
          </Row>
          {this.state.systemSetting.map((setting, index) => {
            if (setting.setting_id === settingIDType1.accept_image_format) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Acceptable image file format --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={setting.description
                      .split('\n')
                      .map((des, index) => {
                        if (index === 0) {
                          return <span key={des + index}>{des}</span>;
                        }

                        if (index === 1) {
                          const splitted = des.split(': ');
                          const desOne = splitted[0];
                          const link = splitted[1];

                          return (
                            <p key={des + index}>
                              {desOne}
                              {': '}&nbsp;
                              <a href={link}>Image file format handbook</a>
                            </p>
                          );
                        }

                        return <Fragment></Fragment>;
                      })}
                    valueName={'Types'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <Input
                        type="text"
                        value={this.state[settingIDType1.accept_image_format]}
                        name={settingIDType1.accept_image_format}
                        id={settingIDType1.accept_image_format}
                        onChange={this.inputChange}
                        placeholder="Enter image file format"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType1.accept_image_format,
                              this.state[settingIDType1.accept_image_format]
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

            if (setting.setting_id === settingIDType1.default_password) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- New user default password --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'Default Password'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <Input
                        type="text"
                        value={this.state[settingIDType1.default_password]}
                        name={settingIDType1.default_password}
                        id={settingIDType1.default_password}
                        onChange={this.inputChange}
                        placeholder="Enter default password"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType1.default_password,
                              this.state[settingIDType1.default_password]
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

            if (setting.setting_id === settingIDType1.login_expiration_limit) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Login expiration time --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'Expiration Time'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        Expiration time:
                      </InputGroupAddon>
                      <Input
                        type="number"
                        value={
                          this.state[settingIDType1.login_expiration_limit]
                        }
                        name={settingIDType1.login_expiration_limit}
                        id={settingIDType1.login_expiration_limit}
                        onChange={this.inputChange}
                        min={0}
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType1.login_expiration_limit,
                              this.state[settingIDType1.login_expiration_limit]
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

            if (setting.setting_id === settingIDType1.system_mail) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- System Email --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'System Email'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        System Email:
                      </InputGroupAddon>
                      <Input
                        type="email"
                        value={this.state[settingIDType1.system_mail]}
                        name={settingIDType1.system_mail}
                        id={settingIDType1.system_mail}
                        onChange={this.inputChange}
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType1.system_mail,
                              this.state[settingIDType1.system_mail]
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

            if (setting.setting_id === settingIDType1.system_mail_password) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- System Email Password --------------------------- */}
                  <SettingComponent
                    setting_name={setting.setting_name.split(': ')[1]}
                    description={<span>{setting.description}</span>}
                    valueName={'Password'}
                    value={setting.value}
                    default={setting.default}
                    hidden={setting.hidden}
                  >
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        Password:
                      </InputGroupAddon>
                      <Input
                        type="password"
                        value={this.state[settingIDType1.system_mail_password]}
                        name={settingIDType1.system_mail_password}
                        id={settingIDType1.system_mail_password}
                        onChange={this.inputChange}
                        autoComplete="new-password"
                      />
                      <InputGroupAddon addonType="prepend">
                        <Button
                          color="success"
                          onClick={() =>
                            this.onChangeSetting(
                              settingIDType1.system_mail_password,
                              this.state[settingIDType1.system_mail_password]
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

            return <Fragment key={setting.setting_id + index}></Fragment>;
          })}
        </Container>
      </Row>
    );
  }
}
