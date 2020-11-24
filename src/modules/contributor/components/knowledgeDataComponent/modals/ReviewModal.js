import React, { Component } from 'react';
import { Button, Input, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { handleInputChange } from 'src/common/handleInputChange';
import { KNOWLEDGE_DATA, REVIEW } from 'src/constants';
import { ACCEPT, DECLINE, DRAFT } from 'src/modules/contributor/index';

import axiosClient from 'src/common/axiosClient';

export default class ReviewModal extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      buttonId: props.buttonId,
      comment: '',
    };
  }

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  sendReview = (status) => {
    let data = {
      knowledge_data: this.props.knowledgeDataId,
      status: status,
      review_detail: this.state.comment
    }
    axiosClient
      .post(KNOWLEDGE_DATA + REVIEW, data)
      .then(response => {

      })
  }

  render() {
    return (
      <Popover
        placement="bottom"
        isOpen={this.props.isOpen}
        target={this.props.buttonId}
        toggle={this.props.toggle}
        className="popover-width"
        hideArrow={true}
        flip={false}
        trigger="legacy"
      >
        <PopoverHeader>Review knowledge data</PopoverHeader>
        <PopoverBody>
          <div className="w-600px">
            <Input
              onChange={this.handleInput}
              className="h-170px comment-area"
              placeholder="Enter comment here"
              type="textarea"
              name="comment"
            />
            <div className="d-flex justify-content-end mt-2">
              <Button
                size="sm"
                className="mr-3"
                color="warning"
                onClick={() => {
                  this.sendReview(DRAFT)
                }}
              >
                Draft
              </Button>
              <Button
                size="sm"
                className="mr-3"
                color="danger"
                onClick={() => {
                  this.sendReview(DECLINE)
                }}
              >
                Decline
              </Button>
              <Button size="sm" color="success" onClick={() => {
                this.sendReview(ACCEPT)
              }}>
                Approve
              </Button>
            </div>
          </div>
        </PopoverBody>
      </Popover>
    );
  }
}
