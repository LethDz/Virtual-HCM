import React, { Component } from 'react';
import { Badge } from 'reactstrap';

import { ACCEPT, DECLINE, DRAFT } from 'src/modules/contributor/index';
import { getUserData } from 'src/common/authorizationChecking';

class SelfReviewStatus extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      user_review: null,
      user: null,
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

  isOwner = () => {
    const user = getUserData();
    return user.username === this.props.data.edit_user;
  };

  render() {
    const DONE = 2;
    const className = 'mt-2 badge-width';
    if (this.isOwner()) {
      return '';
    } else {
      if (this.props.data.status !== DONE) {
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
      } else if (this.state.user_review === ACCEPT) {
        return (
          <h6>
            <Badge className={className} color="success">
              Accept
            </Badge>
          </h6>
        );
      } else {
        return '';
      }
    }
  }
}

export default SelfReviewStatus;
