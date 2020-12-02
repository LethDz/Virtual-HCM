import React, { Component } from 'react';
import { Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';
import 'src/static/stylesheets/chat.history.css';
import { CHAT_HISTORY_DETAIL } from 'src/constants';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';

class ChatHistoryDetailModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      chatLog: [],
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.initiateData();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  initiateData = () => {
    this.setLoading(true);
    axiosClient
      .get(CHAT_HISTORY_DETAIL(this.props.id))
      .then((response) => {
        if (response.data.status) {
          const chatLog = response.data.result_data;
          this.setState({
            chatLog,
          });
        } else {
          this.setErrorAlert(true);
        }
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
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
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size='lg'>
        <ModalHeader toggle={this.props.toggle}>Chat Message</ModalHeader>
        <ModalBody>
          <LoadingSpinner loading={this.state.loading} text={'Loading'} />
          {this.state.errorAlert && (
            <ErrorAlert
              errorAlert={this.state.errorAlert}
              errorList={this.state.errorList}
              onDismiss={() => this.onDismiss('errorAlert')}
            />
          )}
          <Card>
            <CardBody className='chat-container'>
              <ul className='chat-list'>
                {this.state.chatLog &&
                  this.state.chatLog.map((chat) => (
                    <li className={chat.from === 1 ? "out" : "in"}>
                      <div className="chat-body">
                        <span className="time_date">{chat.time}</span>
                        <div className="chat-message">
                          <p>{chat.message}</p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}

export default ChatHistoryDetailModal;
