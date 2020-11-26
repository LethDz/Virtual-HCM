import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Progress } from 'reactstrap';

import {
  getKnowledgeDataSettings,
  PROCESSING,
} from 'src/modules/contributor/index';

class StatusBar extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      accept: 0,
      reject: 0,
      minAccept: 0,
      maxReject: 0,
      status: null,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const settings = this.props.knowledgeDataSettings;
    const reviews = this.props.data.reviews;
    const status = this.props.data.status;
    this.setState({
      accept: reviews.accept,
      reject: reviews.reject,
      minAccept: settings.minimum_accept,
      maxReject: settings.maximum_reject,
      status: status,
    });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    if (this.state.status === PROCESSING) {
      if (this.state.reject >= this.state.maxReject) {
        return (
          <Progress
            className="mt-2"
            color="danger"
            animated
            value={this.state.accept}
            max={this.state.minAccept}
          />
        );
      } else {
        return (
          <Progress
            className="mt-2"
            color="success"
            animated
            value={this.state.accept}
            max={this.state.minAccept}
          />
        );
      }
    } else {
      return '';
    }
  }
}
const mapStateToProps = (state) => ({
  knowledgeDataSettings: getKnowledgeDataSettings(state),
});

export default connect(mapStateToProps)(StatusBar);
