import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { ReviewModal } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class Vote extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      isOpenReviewModal: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleReviewModal = () => {
    this._isMounted &&
      this.setState({ isOpenReviewModal: !this.state.isOpenReviewModal });
  };

  render() {
    return (
      <div className="d-flex justify-content-end">
        <ReviewModal
          toggle={this.toggleReviewModal}
          isOpen={this.state.isOpenReviewModal}
          buttonId="button-review"
        />
        <Button
          color="success"
          id="button-review"
          onClick={this.toggleReviewModal}
        >
          Review{' '}<FontAwesomeIcon icon={faAngleDown} />
        </Button>
      </div>
    );
  }
}
