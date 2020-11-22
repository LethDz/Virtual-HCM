import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { connect } from 'react-redux';
import { agentProfile, updateStatusOfChatSocket } from 'src/modules/chat';
import 'src/static/stylesheets/chat.css';

class ChatWidget extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      newMessagesCount: 0,
      isOpen: false,
    };
    this.chatSocket = null;
    this.current_command = null;
    this.commands = {
      START_NEW_SESSION: 'newsession',
      REQUEST_LAST_SESSION_DATA: 'getlastsession',
      CHAT: 'chat',
      REPORT: 'report',
      END_SESSION: 'endsession',
    };
    this.response_types = {
      LAST_SESSION_MESSAGES: 'last_session_messages',
      FORCE_NEW_SESSION: 'force_new_session',
      CHAT_RESPONSE: 'chat_response',
      START_NEW_SESSION_FAILED: 'new_session_failed',
      END_SESSION_STATUS: 'end_session_status',
    };
  }

  _onMessageWasSent = (message) => {
    let _self = this;
    let text = message.data.text;
    if (text) {
      if (text.startsWith('!')) {
        // Command handle
        let command = text.substring(1);
        switch (command) {
          case _self.commands.START_NEW_SESSION:
            _self.current_command = _self.commands.START_NEW_SESSION;
            _self.send_websocket_command(_self.commands.END_SESSION, null);
            break;
          case _self.commands.REPORT:
            break;
          case _self.commands.END_SESSION:
            _self.send_websocket_command(_self.commands.END_SESSION, null);
            break;
          default:
            console.log(
              'What is meaning of default block missing warning when it doesnt do anything'
            );
        }
      } else {
        // Chat handle
        this.send_websocket_command(this.commands.CHAT, text);
      }
      this.setState({
        messageList: [...this.state.messageList, message],
      });
    }
  };

  _handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0,
    });
  };

  _sendMessage = (text) => {
    if (text && text.length > 0) {
      const newMessagesCount = this.state.isOpen
        ? this.state.newMessagesCount
        : this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [
          ...this.state.messageList,
          {
            author: 'them',
            type: 'text',
            data: { text },
          },
        ],
      });
    }
  };

  create_websocket_connection = () => {
    let _self = this;
    let ws_url = 'wss://127.0.0.1:8000/ws/chat/';
    let chatSocket;
    try {
      chatSocket = new WebSocket(ws_url);
    } catch (err) {
      return null;
    }
    chatSocket.onopen = function (e) {
      console.log('[chat_open] Connected to training service');
      _self.props.updateStatusOfChatSocket(true);
    };
    chatSocket.onmessage = function (e) {
      let received = JSON.parse(e.data);
      if (received.type) {
        switch (received.type) {
          case _self.response_types.CHAT_RESPONSE:
            _self._sendMessage(received.data);
            break;
          case _self.response_types.FORCE_NEW_SESSION:
            _self._sendMessage(
              'Hệ thống đã có sự thay đổi dữ liệu, phiên trò chuyện của bạn đã kết thúc'
            );
            _self._sendMessage('Bắt đầu phiên trò chuyện mới');
            _self.send_websocket_command(
              _self.commands.START_NEW_SESSION,
              null
            );
            break;
          case _self.response_types.LAST_SESSION_MESSAGES:
            if (received.data && received.data.length > 0) {
              _self.setChatboxMessages(received.data);
            } else {
              _self.send_websocket_command(
                _self.commands.START_NEW_SESSION,
                null
              );
            }
            break;
          case _self.response_types.END_SESSION_STATUS:
            if (received.data) {
              _self._sendMessage('Phiên trò chuyện của bạn đã kết thúc');
              if (_self.current_command === _self.commands.START_NEW_SESSION) {
                _self._sendMessage('Chatbox sẽ được làm mới trong 5s');
                _self.setState({
                  messageList: [],
                });
                _self.send_websocket_command(
                  _self.commands.START_NEW_SESSION,
                  null
                );
                _self.current_command = null;
              }
            } else {
              _self._sendMessage(
                'Đã có sự cố khi kết thúc phiên trò chuyện, hãy liên lạc với admin'
              );
            }
            break;
          default:
            console.log(
              'What is meaning of default block missing warning when it doesnt do anything'
            );
        }
      }
    };
    chatSocket.onclose = function (e) {
      if (e.wasClean) {
        console.log(
          `[chat_close] Connection closed cleanly, code=${e.code} reason=${e.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[chat_close] Connection died unexpectedly');
      }

      _self.props.updateStatusOfChatSocket(false);
    };
    chatSocket.onerror = function (error) {
      console.log(`[chat_error] ${error.message}`);
    };
    return chatSocket;
  };

  send_websocket_command = (type, data) => {
    if (this.connected()) {
      this.chatSocket.send(
        JSON.stringify({
          command: type,
          data: data,
        })
      );
    }
  };

  connected = () => {
    return this.chatSocket && this.chatSocket.readyState === WebSocket.OPEN;
  };

  setChatboxMessages = (data) => {
    if (data) {
      let messages = [];
      for (var i = 0, l = data.length; i < l; i++) {
        messages.push({
          type: 'text',
          author: data[i].sent === 1 ? 'me' : 'them',
          data: {
            text: data[i].text,
          },
        });
      }
      this.setState({
        messageList: [...this.state.messageList, ...messages],
      });
    }
  };

  componentDidMount() {
    let _self = this;
    this._isMounted = true;
    this.chatSocket = this.create_websocket_connection();
    let wait_connecting = setInterval(function () {
      if (_self.chatSocket.readyState !== WebSocket.CONNECTING) {
        clearInterval(wait_connecting);
        if (_self.connected()) {
          _self.send_websocket_command(
            _self.commands.REQUEST_LAST_SESSION_DATA,
            null
          );
        } else {
          // TODO: Disable chatbox input and send button
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.chatSocket.close(1000);
  }

  render() {
    return (
      <Launcher
        agentProfile={agentProfile}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        showEmoji={false}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateStatusOfChatSocket: (status) =>
    dispatch(updateStatusOfChatSocket(status)),
});

export default connect(null, mapDispatchToProps)(ChatWidget);
