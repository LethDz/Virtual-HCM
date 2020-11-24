import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { ReviewModal, DISABLE } from 'src/modules/contributor/index';

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

  toggleViewReviewModal = () => {

  }

  render() {
    return (
      <div className="d-flex justify-content-end">
        <ReviewModal
          owner={this.props.owner}
          toggle={this.toggleReviewModal}
          isOpen={this.state.isOpenReviewModal}
          buttonId="button-review"
          knowledgeDataId={this.props.knowledgeDataId}
        />
        <div>ACCEPT, DECLINE</div>
        {(this.props.formStatus !== DISABLE && !this.props.owner) || (this.props.formStatus !== DISABLE && this.props.owner) ?
          <Fragment>
            <Button
              color="success"
              id="button-review"
              onClick={this.toggleReviewModal}
            >
              Review{' '}<FontAwesomeIcon icon={faAngleDown} />
            </Button>
            <Button
              color="success"
              onClick={this.toggleViewReviewModal}
            >
              View all review{' '}<FontAwesomeIcon icon={faAngleDown} />
            </Button>
          </Fragment>

          : <Button
            color="success"
            id="button-review"
            onClick={this.toggleViewReviewModal}
          >
            View all review{' '}<FontAwesomeIcon icon={faAngleDown} />
          </Button>
        }

      </div>
    );
  }
}
