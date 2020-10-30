import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { agentProfile } from 'src/modules/chat';
import 'src/static/stylesheets/chat.css';

class ChatWidget extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
    };
  }

  _onMessageWasSent = (message) => {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  };

  render() {
    return (
      <Launcher
        agentProfile={agentProfile}
        onMessageWasSent={this._onMessageWasSent}
        messageList={this.state.messageList}
        showEmoji={false}
      />
    );
  }
}

export default ChatWidget;
