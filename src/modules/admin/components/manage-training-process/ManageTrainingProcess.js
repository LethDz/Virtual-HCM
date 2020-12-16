import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { handleInputChange } from 'src/common/handleInputChange';
import 'src/static/stylesheets/training.process.css';
import Terminal from 'src/common/Terminal';
import {
  eventEnterSimulator,
  ControlPanel,
  classifierTypes,
  defaultSetting,
  getCurrentState,
  getTrainSocket,
  pullCurrentState,
  pullTrainSocket,
} from 'src/modules/admin';
import { connect } from 'react-redux';
import { getStatusOfChatSocket } from 'src/modules/chat';
import { WEB_SOCKET_TRAINING } from 'src/constants';

class ManageTrainingProcess extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      type: '1',
      sentence_length: 30,
      batch: 32,
      epoch: 5,
      learning_rate: '2e-5', // String or float ok
      epsilon: '1e-8', // String or float ok
      activation: 'softmax',
    };
    this.trainSocket = null;
    this.current_state = null;
    this.commands = {
      CONNECT: 'connect',
      START: 'start',
      STOP: 'stop',
      CHECK_STATUS: 'check_status',
    };
  }

  onUnload = (e) => {
    if (this.connected()) {
      this.trainSocket.close(1000);
    }
  };

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
    this.props.pullCurrentState(this.current_state);
    this.props.pullTrainSocket(this.trainSocket);
    // Is our timer running?
    if (this.connectTimeOut) {
      clearTimeout(this.connectTimeOut);
      this.connectTimeOut = 0;
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
    this.onChangeTerminalStyle();
    this.current_state = this.props.currentState;
    this.establishConnection();
  }

  componentDidUpdate() {
    this.establishConnection();
  }

  onChangeTerminalStyle = () => {
    let terminal = document.getElementsByClassName('terminal-base');
    let inputTerminal = document.getElementsByClassName('btarSP');
    inputTerminal[0].addEventListener('focus', () => {
      terminal[0].style.boxShadow = '0px 0px 5px 1px #7E8083';
    });

    inputTerminal[0].addEventListener('blur', () => {
      terminal[0].style.boxShadow = 'unset';
    });

    inputTerminal[0].disabled = true;
  };

  connected = () => {
    return this.trainSocket && this.trainSocket.readyState === WebSocket.OPEN;
  };

  create_websocket_connection = (terminal) => {
    let _self = this;
    let trainSocket = this.props.trainSocket
      ? this.props.trainSocket
      : new WebSocket(WEB_SOCKET_TRAINING);
    trainSocket.onopen = function (e) {
      terminal('[open] Connected to training service');
    };
    trainSocket.onmessage = function (e) {
      let received = JSON.parse(e.data);
      if (received.type) {
        switch (received.type) {
          case 'message':
            terminal(received.data);
            break;
          case 'running_status':
            let running_status = received.data;
            switch (_self.current_state) {
              case _self.commands.START:
                if (running_status) {
                  terminal('Training process already started');
                } else {
                  _self.start_training(terminal);
                }
                break;

              case _self.commands.STOP:
                if (!running_status) {
                  terminal('Training process not started');
                } else {
                  _self.stop_training(terminal);
                }
                break;
              default:
                break;
            }
            break;
          case 'stop_status':
            let stop_status = received.data;
            if (stop_status) {
              terminal('TRAINING PROCESS STOPPED SUCCESSFULLY');
            } else {
              terminal(
                '[CRITICAL] TRAINING PROCESS FAILED TO STOP. PLEASE RESTART THE SERVER !'
              );
            }
            break;
          case 'start_failed':
            let server_message = received.data;
            terminal(server_message);
            break;
          default:
            terminal('[Websocket] Received data is unknown');
            break;
        }
      } else {
        terminal('[Websocket] Received data is unknown');
      }
    };
    trainSocket.onclose = function (e) {
      if (e.wasClean) {
        terminal(
          `[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        terminal('[close] Connection died unexpectedly');
      }
    };
    trainSocket.onerror = function (error) {
      terminal(`[error] ${error.message}`);
    };
    return trainSocket;
  };

  start_training = (terminal) => {
    terminal('STARTING TRAIN PROCESS');
    terminal('------------- Train parameters -------------');
    terminal(
      `Train data: ${!this.state.data ? 'None' : this.state.data.filename}`
    );
    terminal(`Classifier type: ${classifierTypes[this.state.type]}`);
    if (this.state.type === '1' || this.state.type === '2') {
      terminal(`Max senquence length: ${this.state.sentence_length}`);
      terminal(`Batch size: ${this.state.batch}`);
      terminal(`Number of epoches: ${this.state.epoch}`);
      terminal(`Learning rate: ${this.state.learning_rate}`);
      terminal(`Epsilon value: ${this.state.epsilon}`);
      terminal(`Activation function: ${this.state.activation}`);
    }
    terminal('--------------------------------------------');
    this.trainSocket.send(
      JSON.stringify({
        command: this.commands.START,
        // Parameters (read from screen inputs)
        data: !this.state.data ? -1 : this.state.data.id,
        type: this.state.type,
        sentence_length: this.state.sentence_length,
        batch: this.state.batch,
        epoch: this.state.epoch,
        learning_rate: this.state.learning_rate, // String or float ok
        epsilon: this.state.epsilon, // String or float ok
        activation: this.state.activation,
      })
    );
  };

  stop_training = (terminal) => {
    terminal('STOPPING TRAIN PROCESS');
    this.trainSocket.send(
      JSON.stringify({
        command: this.commands.STOP,
      })
    );
  };

  pre_checking = (terminal, current_state) => {
    if (!this.connected()) {
      terminal('Connection to train service not established');
      terminal("Try to 'connect' first");
    } else {
      this.current_state = current_state;
      this.trainSocket.send(
        JSON.stringify({
          command: this.commands.CHECK_STATUS,
        })
      );
    }
  };

  inputChange = (event) => {
    handleInputChange(event, this);
  };

  remoteAction = (command) => {
    let inputTerminal = document.getElementsByClassName('btarSP');
    inputTerminal[0].value = command;
    inputTerminal[0].dispatchEvent(eventEnterSimulator);
  };

  selectTrainableData = (data) => {
    this.setState({
      data: data,
    });
  };

  setSettingToDefault = () => {
    this.setState({
      ...defaultSetting,
    });
  };

  establishConnection = () => {
    !this.connected() &&
      this.props.statusOfChatSocket &&
      (this.connectTimeOut = setTimeout(
        () => this.remoteAction('connect'),
        1000
      ));
  };

  onABC = () => {
    // Do whatever you want
    // When press the button on the Control Panel this function will do.
  };

  render() {
    return (
      <Container className="cl-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Manage Training Process</h5>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex" xs="8">
            <h6 className="mt-2 mb-2 text-primary">Console Command: </h6>
          </Col>
          <Col className="d-flex">
            <h6 className="mt-2 mb-2 text-primary">Control Panel: </h6>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs="8">
            <Terminal
              color="black"
              backgroundColor="white"
              prompt="black"
              style={{
                fontSize: '1.1em',
              }}
              commands={{
                connect: (arg, print, runCommand) => {
                  if (this.props.trainSocket && !this.trainSocket) {
                    this.trainSocket = this.create_websocket_connection(print);
                    print('Reconnected to service !!!');
                  } else {
                    if (this.connected()) {
                      print('Connection already established');
                    } else {
                      this.current_state = this.commands.CONNECT;
                      this.trainSocket = this.create_websocket_connection(
                        print
                      );
                    }
                  }
                },
                start: (arg, print, runCommand) => {
                  this.pre_checking(print, this.commands.START);
                },
                stop: (arg, print, runCommand) => {
                  this.pre_checking(print, this.commands.STOP);
                },
              }}
              descriptions={{
                start: 'Start training process',
                stop: 'Stop training process',
                connect: 'Connect to training service',
              }}
              msg="Welcome to training process center !!!"
              hideTopBar={true}
              allowTabs={false}
            />
          </Col>
          <Col>
            <ControlPanel
              state={this.state}
              inputChange={this.inputChange}
              remoteAction={this.remoteAction}
              selectTrainableData={this.selectTrainableData}
              setSettingToDefault={this.setSettingToDefault}
              onABC={this.onABC}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  trainSocket: getTrainSocket(state),
  currentState: getCurrentState(state),
  statusOfChatSocket: getStatusOfChatSocket(state),
});

const mapDispatchToProps = (dispatch) => ({
  pullTrainSocket: (trainSocket) => dispatch(pullTrainSocket(trainSocket)),
  pullCurrentState: (currentState) => dispatch(pullCurrentState(currentState)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTrainingProcess);
