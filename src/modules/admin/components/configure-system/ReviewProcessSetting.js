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
  settingStateType3,
  settingIDType3,
  axiosCall,
} from 'src/modules/admin';

export default class ReviewProcessSetting extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      errorAlert: false,
      errorList: false,
      reviewSetting: [],
      ...settingStateType3,
    };

    this.titleRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState(
      {
        reviewSetting: this.props.reviewSetting,
      },
      () => {
        let newState = {
          ...settingStateType3,
        };
        this.state.reviewSetting.map((setting) => {
          newState[setting.setting_id] = setting.value ? setting.value : '';

          return setting.value;
        });
        this.setState({
          ...newState,
        });
      }
    );
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

  onChangeMaximumCount = () => {
    axiosCall(
      settingIDType3.maximum_reject,
      this.state[settingIDType3.maximum_reject],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType3.maximum_reject,
          this.state[settingIDType3.maximum_reject]
        );
      },
      this.successToast,
      this.scrollToRef
    );
  };

  onChangeMinimumCount = () => {
    axiosCall(
      settingIDType3.minimum_accept,
      this.state[settingIDType3.minimum_accept],
      this.setErrorAlert,
      this.setErrorList,
      this.props.setLoading,
      () => {
        this.updateSetting(
          settingIDType3.minimum_accept,
          this.state[settingIDType3.minimum_accept]
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
                          placeholder="Enter maximum number of rejects"
                          value={this.state[settingStateType3.maximum_reject]}
                          name={settingStateType3.maximum_reject}
                          id={settingStateType3.maximum_reject}
                          onChange={this.inputChange}
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onChangeMaximumCount}
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
                        Current Maximum Rejects:{' '}
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
                        Default Maximum Rejects:{' '}
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

            if (setting.setting_id === settingIDType3.minimum_accept) {
              return (
                <Fragment key={setting.setting_id + index}>
                  {/* --------------------------- Minimum Accept count --------------------------- */}
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
                          placeholder="Enter minimum number of accept"
                          value={this.state[settingStateType3.minimum_accept]}
                          name={settingStateType3.minimum_accept}
                          id={settingStateType3.minimum_accept}
                          onChange={this.inputChange}
                        />
                        <InputGroupAddon addonType="prepend">
                          <Button
                            color="success"
                            onClick={this.onChangeMinimumCount}
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
                        Current Minimum Accepts:{' '}
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
                        Default Minimum Accepts:{' '}
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
