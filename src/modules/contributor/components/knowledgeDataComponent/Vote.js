import React, { Component, Fragment } from 'react';
import { Button, Row, Col, Badge, ButtonGroup } from 'reactstrap';
import { ReviewModal, ViewAllReviewsModal, PROCESSING, getDataApprovalDetail } from 'src/modules/contributor/index';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

class Vote extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      isOpenReviewModal: false, 
      isOpenViewAllReviewsModal: false,
      accept: 0,
      decline: 0
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const reviews = this.props.dataApprovalDetail.reviews
    this.setState({ accept: reviews.accept, decline: reviews.reject })
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleReviewModal = () => {
    this._isMounted &&
      this.setState({ isOpenReviewModal: !this.state.isOpenReviewModal });
  };

  toggleViewReviewModal = () => {
    this._isMounted &&
      this.setState({ isOpenViewAllReviewsModal: !this.state.isOpenViewAllReviewsModal });
  }

  render() {
    return (
      <div>
        {this.state.isOpenReviewModal &&
          <ReviewModal
            owner={this.props.owner}
            toggle={this.toggleReviewModal}
            isOpen={this.state.isOpenReviewModal}
            buttonId="button-review"
            knowledgeDataId={this.props.knowledgeDataId}
            setSuccessAlert={this.props.setSuccessAlert}
            setErrorAlert={this.props.setErrorAlert}
          />
        }
        {this.state.isOpenViewAllReviewsModal &&
          <ViewAllReviewsModal
            toggle={this.toggleViewReviewModal}
            isOpen={this.state.isOpenViewAllReviewsModal}
            knowledgeDataId={this.props.knowledgeDataId}
          />
        }
        <Row>
          <Col>
            <div>
              <ButtonGroup className="width-50">
                <Button type="button" color="success" outline>
                  Accept <Badge color="success">{this.state.accept}</Badge>
                </Button>
                <Button type="button" color="danger" outline>
                  Decline <Badge color="danger">{this.state.decline}</Badge>
                </Button>
              </ButtonGroup>

            </div>
          </Col>
          <Col xs='auto'>
            <Row className="mr-3">
              {this.props.owner ?
                <Button
                  color="success"
                  id="button-review"
                  onClick={this.toggleViewReviewModal}
                >
                  View all review{' '}<FontAwesomeIcon icon={faAngleDown} />
                </Button>
                :
                <Fragment>
                  <Col xs='auto'>
                    {this.props.formStatus === PROCESSING ?
                      <Button
                        color="success"
                        id="button-review"
                        onClick={this.toggleReviewModal}
                      >
                        Review{' '}<FontAwesomeIcon icon={faAngleDown} />
                      </Button>
                      :
                      <Button hidden id="button-review"></Button>
                    }
                  </Col>
                  <Col xs='auto'>
                    <Button
                      className="ml-2"
                      color="success"
                      onClick={this.toggleViewReviewModal}
                    >
                      View all reviews{' '}<FontAwesomeIcon icon={faAngleDown} />
                    </Button>
                  </Col>

                </Fragment>
              }
            </Row>

          </Col>
        </Row>



      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataApprovalDetail: getDataApprovalDetail(state),
});

export default connect(mapStateToProps)(Vote)