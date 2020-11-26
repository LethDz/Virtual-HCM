import React, { Component } from 'react';
import { Badge } from 'reactstrap';

import { ACCEPT, DECLINE, DRAFT } from 'src/modules/contributor/index';

class SelfReviewStatus extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      user_review: null,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const user_review = this.props.data.user_review;
    this.setState({
      user_review: user_review,
    });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    const className = 'mt-2 badge-width';
    switch (this.state.user_review) {
      case ACCEPT:
        return (
          <h6>
            <Badge className={className} color="success">
              Accept
            </Badge>
          </h6>
        );
      case DECLINE:
        return (
          <h6>
            <Badge className={className} color="danger">
              Decline
            </Badge>
          </h6>
        );
      case DRAFT:
        return (
          <h6>
            <Badge className={className} color="warning">
              Draft
            </Badge>
          </h6>
        );
      default:
        return (
          <h6>
            <Badge className={className} color="secondary">
              N/A
            </Badge>
          </h6>
        );
    }
  }
}

export default SelfReviewStatus;
