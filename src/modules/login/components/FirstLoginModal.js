import {
  faAngry,
  faSave,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { getUserData, signOut } from 'src/common/authorizationChecking';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import { FIRST_LOGIN_CHANGE_PASSWORD } from 'src/constants';

class FirstLoginModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      open: false,
      password: '',
      passwordInvalid: false,
      loading: false,
      errorAlert: false,
      errorList: [],
    };

    this.passwordRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        open: this.props.firstLogin,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggle = () => {
    this._isMounted &&
      this.setState({
        open: false,
      });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const data = {
      password: this.state.password,
    };
    this.setLoading(true);
    this.setErrorAlert(false);
    axiosClient
      .post(FIRST_LOGIN_CHANGE_PASSWORD, data)
      .then((response) => {
        if (response.data.status) {
          let user = getUserData();
          user.first_login = true;
          sessionStorage.setItem('user', JSON.stringify(user));
          this.toggle();
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .catch((error) => {
        this.setLoading(false);
        this.setErrorAlert(true);
      });
  };

  handleInput = (event) => {
    this._isMounted && handleInputChange(event, this);
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  setErrorList = (list) => {
    this._isMounted &&
      this.setState({
        errorList: list,
      });
  };

  setErrorAlert = (status) => {
    this._isMounted &&
      this.setState({
        errorAlert: status,
      });
  };

  render() {
    return (
      <Modal
        isOpen={this.state.open}
        toggle={this.toggle}
        backdrop="static"
        unmountOnClose={true}
        onOpened={() => this.passwordRef.current.focus()}
      >
        <ModalHeader>Change password</ModalHeader>
        <Form className="m-0" onSubmit={this.onSubmit}>
          <ModalBody>
            <FormGroup className="w-100">
              <Alert color="info">
                <FontAwesomeIcon icon={faAngry} />
                &nbsp; First login !!! Please Change Password
              </Alert>
              {this.state.errorAlert && (
                <ErrorAlert
                  errorAlert={this.state.errorAlert}
                  errorList={this.state.errorList}
                  onDismiss={() => this.onDismiss('errorAlert')}
                />
              )}
              <Input
                innerRef={this.passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder="Please enter password"
                value={this.state.password}
                onChange={this.handleInput}
                required
                invalid={this.state.passwordInvalid}
              />
              <FormFeedback>Invalid Password</FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info" type="submit" disabled={this.state.loading}>
              <FontAwesomeIcon icon={faSave} color="white" />
              &nbsp; Save
            </Button>{' '}
            <Button
              color="secondary"
              onClick={signOut}
              disabled={this.state.loading}
            >
              <FontAwesomeIcon icon={faSignOutAlt} color="white" />
              &nbsp; Logout
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default FirstLoginModal;
