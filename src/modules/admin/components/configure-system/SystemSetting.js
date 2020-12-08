import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    this.setState(
      {
        systemSetting: this.props.systemSetting,
      },
      () => {
        let newState = {
          ...settingStateType1,
        };
        this.state.systemSetting.map((setting) => {
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

  onChangeImageFormat = () => {
    axiosCall(
      settingIDType1.accept_image_format,
      this.state[settingIDType1.accept_image_format],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType1.accept_image_format,
          this.state[settingIDType1.accept_image_format]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onChangeDefaultPassword = () => {
    axiosCall(
      settingIDType1.default_password,
      this.state[settingIDType1.default_password],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType1.default_password,
          this.state[settingIDType1.default_password]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onChangeLoginEx = () => {
    axiosCall(
      settingIDType1.login_expiration_limit,
      this.state[settingIDType1.login_expiration_limit],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType1.login_expiration_limit,
          this.state[settingIDType1.login_expiration_limit]
        );
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
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mt-3 mb-3 align-items-center">
                    <Col xs="auto" className="p-0">
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
                            onClick={this.onChangeImageFormat}
                          >
                            Change
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="ml-2 mr-2 mb-3">
                    <Col xs="auto" className="font-sm p-0">
                      <span className="font-weight-bold">Current Types: </span>
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
                      <span className="font-weight-bold">Default Types: </span>
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

            if (setting.setting_id === settingIDType1.default_password) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- New user default password --------------------------- */}
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
                          value={this.state[settingIDType1.default_password]}
                          name={settingIDType1.default_password}
                          id={settingIDType1.default_password}
                          onChange={this.inputChange}
                          placeholder="Enter default password"
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onChange={this.onChangeDefaultPassword}
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
                        Current Default Password:{' '}
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
                      <span className="font-weight-bold">Default: </span>
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

            if (setting.setting_id === settingIDType1.login_expiration_limit) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Login expiration time --------------------------- */}
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
                          placeholder="Enter login expiration time"
                          value={
                            this.state[settingIDType1.login_expiration_limit]
                          }
                          name={settingIDType1.login_expiration_limit}
                          id={settingIDType1.login_expiration_limit}
                          onChange={this.inputChange}
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onChangeLoginEx}
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
                        Current Expiration Time:{' '}
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
                        Default Expiration Time:{' '}
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

            return <Fragment></Fragment>;
          })}
        </Container>
      </Row>
    );
  }
}
