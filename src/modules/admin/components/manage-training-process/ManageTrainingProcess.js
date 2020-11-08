import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import 'src/static/stylesheets/training.process.css';
import Terminal from 'terminal-in-react';
import { 
  API_URL, 
  TRAINING_PROCESS_PAGE_PROCESS_CHECK 
} from 'src/constants';
import axiosClient from 'src/common/axiosClient';

class ManageTrainingProcess extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      errorAlert: false,
      successAlert: false,
      errorList: []
    };
    this.trainSocket = null;
    this.classifier_types = {
        1: 'Intent',
        2: 'Question'
    };
    this.current_state = null;
    this.commands = {
      CONNECT: 'connect',
      START: 'start',
      STOP: 'stop',
      CHECK_STATUS: 'check_status'
    };
  }

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
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

  onUnload = e => {
    if(this.connected()){
      this.trainSocket.close();
    }
  }

  componentWillUnmount() {
      window.removeEventListener("beforeunload", this.onUnload);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    this.onChangeTerminalStyle();
  }

  showMsg = () => 'Hello World';

  onChangeTerminalStyle = () => {
    let terminal = document.getElementsByClassName('terminal-base');
    let inputTerminal = document.getElementsByClassName('btarSP');
    inputTerminal[0].addEventListener('focus', () => {
      terminal[0].style.boxShadow = '0px 0px 5px 1px #7E8083';
    });

    inputTerminal[0].addEventListener('blur', () => {
      terminal[0].style.boxShadow = 'unset';
    });
  };

  connected = () => {
    return this.trainSocket && (this.trainSocket.readyState === WebSocket.OPEN);
  }

  // get_process_status = () => {
  //   if(this.connected()){
  //     axiosClient
  //       .get(TRAINING_PROCESS_PAGE_PROCESS_CHECK)
  //       .then((response) => {
  //         if (response.data.status) {
  //           return response.data.result_data;
  //         } else {
  //           this.setErrorAlert(true);
  //           this.setSuccessAlert(false);
  //           this.state.trainSocket.close();
  //         }
  //         this.setLoading(false);
  //       })
  //       .catch(() => {
  //         this.setLoading(false);
  //         this.setErrorAlert(true);
  //         this.state.trainSocket.close();
  //       });
  //   }
  // }

  create_websocket_connection = (terminal) => {
    let _self = this;
    let ws_url = 'wss://'
      + '127.0.0.1:8000'
      + '/ws/train-classifier/';
    console.log(ws_url);
    let trainSocket = new WebSocket(ws_url);
    trainSocket.onopen = function(e) {
      terminal("[open] Connected to training service");
    };
    trainSocket.onmessage = function(e) {
      let received = JSON.parse(e.data);
      if(received.type){
        switch(received.type) {
          case 'message':
            terminal(received.data);
            break;
          case 'running_status':
            let status = received.data
            switch(_self.current_state){
              case _self.commands.START:
                if(status){
                  terminal('Training process already started');
                } else {
                  _self.start_training(terminal);
                }
                break;
              case _self.commands.STOP:
                if(!status){
                  terminal('Training process not started');
                } else {
                  _self.stop_training(terminal);
                }
                break;
            }
            break;
          default:
            console.log('[Websocket] Received data is unknown')
        }
      } else {
        console.log('[Websocket] Received data is unknown')
      }
    };
    trainSocket.onclose = function(e) {
      if (e.wasClean) {
        terminal(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        terminal('[close] Connection died unexpectedly');
      }
    };
    trainSocket.onerror = function(error) {
      terminal(`[error] ${error.message}`);
    };
    return trainSocket;
  }

  start_training = (terminal) => {
    terminal('STARTING TRAIN PROCESS');
    terminal('------------- Train parameters -------------');
    terminal('Train data: ' + 'C:/Users/Tewi/Desktop/train_data.pickle');
    terminal('Classifier type: ' + this.classifier_types[1]);
    terminal('Max senquence length: ' + 30);
    terminal('Batch size: ' + 32);
    terminal('Number of epoches: ' + 5);
    terminal('Learning rate: ' + '2e-5');
    terminal('Epsilon value: ' + '1e-8');
    terminal('Activation function: ' + 'softmax');
    terminal('--------------------------------------------');
    this.trainSocket.send(JSON.stringify({
      'command': this.commands.START,
      // Parameters (read from screen inputs)
      'data': 'C:/Users/Tewi/Desktop/train_data.pickle',
      'type': 1,
      'sentence_length': 30,
      'batch': 32,
      'epoch': 5,
      'learning_rate': '2e-5', // String or float ok
      'epsilon': '1e-8', // String or float ok
      'activation': 'softmax'
    }));
  }

  stop_training = (terminal) => {
    terminal('STOPPING TRAIN PROCESS');
    this.trainSocket.send(JSON.stringify({
      'command': this.commands.STOP,
    }));
  }

  pre_checking = (terminal, current_state) => {
    if(!this.connected()){
      terminal('Connection to train service not established');
      terminal('Try to \'connect\' first');
    } else {
      this.current_state = current_state;
      this.trainSocket.send(JSON.stringify({
        'command': this.commands.CHECK_STATUS,
      }));
    }
  } 

  render() {
    return (
      <Container className="cl-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Manage Training Process</h5>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex">
            <h6 className="mt-2 mb-2">Console Command: </h6>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Terminal
              color="black"
              backgroundColor="white"
              prompt="black"
              style={{
                fontSize: '1.1em',
              }}
              commands={{
                'open-google': (arg, print, runCommand) => {
                  window.open('https://www.google.com/', '_blank');
                  print('hello');
                  print('địt mẹ mày');
                  print('trường FPT ngu lồn');
                  print('địt cụ mày');
                  print('cái lồn mẹ mày to');
                  return 'opened';
                },
                'connect': (arg, print, runCommand) => {
                  if (this.connected()){
                    print('Connection already established');
                  } else {
                    this.current_state = this.commands.CONNECT;
                    this.trainSocket = this.create_websocket_connection(print);
                  }
                },
                'start': (arg, print, runCommand) => { 
                  this.pre_checking(print, this.commands.START);
                },
                'stop': (arg, print, runCommand) => {
                  this.pre_checking(print, this.commands.STOP);
                },
                show_msg: this.showMsg,
                popup: () => alert('Terminal in React'),
              }}
              descriptions={{
                'open-google': 'opens google.com',
                'start': 'Start training process',
                'stop': 'Stop training process',
                'connect': 'Connect to training service',
                show_msg: 'shows a message',
                alert: 'alert',
                popup: 'alert',
              }}
              msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
              hideTopBar={true}
              allowTabs={false}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ManageTrainingProcess;
