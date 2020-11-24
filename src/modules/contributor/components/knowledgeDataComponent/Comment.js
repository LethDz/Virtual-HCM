import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import {
  MAXIMUM_COMMENT_PER_PAGE,
  DONE,
  DISABLE,
} from 'src/modules/contributor/index';
import { handleInputChange } from 'src/common/handleInputChange';
import { getUserData } from 'src/common/authorizationChecking';
import axiosClient from 'src/common/axiosClient';
import {
  KNOWLEDGE_DATA, POST_COMMENT, GET_ALL_COMMENT, DELETE_COMMENT, EDIT_COMMENT
} from 'src/constants';
import Pagination from "react-js-pagination";
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSync } from '@fortawesome/free-solid-svg-icons';

export default class Comment extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      comments: this.addIndexFieldForList(props.comments),
      userList: props.userList,
      backupComment: '',
      editCommentIndex: null,
      user: getUserData(),
      comment: '',
      activePage: 1,
      showComment: [],
      numberOfPage: props.comments.length / MAXIMUM_COMMENT_PER_PAGE,
      index: 0,
      loading: false,
      refreshComment: false,
      spinnerMessage: '',
      formStatus: props.formStatus
    };
    this.commentRef = React.createRef();
    this.message = ['Commenting', 'Refreshing', 'Editing', 'Deleting']
  }

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.setShowComment(this.state.activePage)
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  addIndexFieldForList = (list) => {
    let tempList = []
    list.forEach((item, index) => {
      tempList.push({
        ...item,
        index: index
      })
    })
    return tempList
  }

  setEditCommentIndex = (index) => {
    this._isMounted &&
      this.setState({
        editCommentIndex: index,
        backupComment: this.state.comments[index].comment,
      });
  };

  cancelEditMode = () => {
    let comments = this.state.comments;
    this._isMounted &&
      this.setState({
        editCommentIndex: null,
        comments: comments,
        backupComment: '',
      });
  };

  handleCommentInput = (event) => {
    this._isMounted && this.setState({ backupComment: event.target.value })
  };

  removeComment = (index) => {
    const id = this.state.comments[index].id
    this.setLoading(true, this.message[3])
    axiosClient
      .get(KNOWLEDGE_DATA + DELETE_COMMENT(id))
      .then((response) => {
        if (response.data.status) {
          this.props.setErrorAlert(false)
          this.refreshComment()
        }
        else {
          this.props.setErrorAlert(true)
          this.setLoading(false, this.message[3])
        }
      })
      .catch(err => {
        this.setLoading(false, this.message[3])
        this.props.setErrorAlert(true)
      })
  };

  saveComment = (index) => {
    let comments = this.state.comments
    this.setLoading(true, this.message[2])
    axiosClient
      .post(KNOWLEDGE_DATA + EDIT_COMMENT, {
        id: comments[index].id,
        comment: this.state.backupComment
      })
      .then((response) => {
        if (response.data.status) {
          this.props.setErrorAlert(false)
          this._isMounted &&
            this.setState({ editCommentIndex: null, backupComment: '' });
          this.refreshComment()
        }
        else {
          this.props.setErrorAlert(true)
        }
      })
      .catch(err => {
        this.props.setErrorAlert(true)
        this.setLoading(false, this.message[2])
      })
  };

  setReplyComment = (index) => {
    this._isMounted && this.setState({ comment: `#${index}| ` });
    this.commentRef.current.focus();
  };

  addComment = () => {
    const comment = this.state.comment
    if (comment.trim() !== '') {
      this.setLoading(true, this.message[0])
      this.props.setErrorAlert(false)
      const commentSplit = comment.split('|');
      const commentReferTag = commentSplit[0];
      let data = {
        knowledge_data: this.props.knowledgeDataId,
        reply_to: this.returnReplyIndex() ? this.state.comments[this.returnReplyIndex()].id : null,
        comment: this.returnReplyIndex() ? comment.substring(commentReferTag.length + 1).trim() : this.state.comment.trim(),
      }
      axiosClient
        .post(KNOWLEDGE_DATA + POST_COMMENT, data)
        .then((response) => {
          if (response.data.status) {
            this.props.setErrorAlert(false)
            this._isMounted && this.setState({ comment: '' })
            this.refreshComment()
          }
          else {
            this.props.setErrorAlert(true)
          }
        })
        .catch(err => {
          this.setLoading(false, this.message[0])
          this.props.setErrorAlert(true)
        })
    }
    else {
      this.props.setErrorAlert(true)
    }

  };

  returnReplyIndex = () => {
    const comment = this.state.comment;
    const commentSplit = comment.split('|');
    const commentReferTag = commentSplit[0];
    const commentReferIndex = commentReferTag.substring(1);
    if (commentReferIndex < comment.length) {
      return commentReferIndex;
    } else {
      return null;
    }
  };

  refreshComment = () => {
    this.setLoading(true, this.message[1])
    axiosClient
      .get(KNOWLEDGE_DATA + GET_ALL_COMMENT(this.props.knowledgeDataId))
      .then(response => {
        if (response.data.status) {
          this.props.setErrorAlert(false)
          this.setLoading(false, this.message[1])
          this._isMounted && this.setState({
            comments: this.addIndexFieldForList(response.data.result_data.data),
            userList: response.data.result_data.users,
            comment: '',
          })
          this.setShowComment(this.state.activePage)
        }
        else {
          this.props.setErrorAlert(true)
        }
      })
      .catch(err => {
        this.setLoading(false, this.message[1])
        this.props.setErrorAlert(true)
      })
  };

  getUserById = (id) => {
    return this.state.userList[`${id}`]
  };

  linkIdToIndex = (id) => {
    let indexId = -1
    this.state.comments.forEach((comment, index) => {
      if (comment.id === id) {
        indexId = index
      }
    })
    return indexId
  }

  handlePageChange = (pageNumber) => {
    this.setShowComment(pageNumber)
    this._isMounted && this.setState({ activePage: pageNumber });
  }

  setShowComment = (pageNumber) => {
    let showComment = []
    for (let i = 0; i < MAXIMUM_COMMENT_PER_PAGE; i++) {
      showComment.push(this.state.comments[(pageNumber - 1) * MAXIMUM_COMMENT_PER_PAGE + i])
    }
    this._isMounted && this.setState({ showComment: showComment })
  }

  setLoading = (status, message) => {
    this._isMounted && this.setState({
      loading: status,
      spinnerMessage: message
    })
  }

  render() {
    return (
      <Row xs="1">
        <LoadingSpinner
          loading={this.state.loading}
          text={this.state.spinnerMessage}
        />
        <Col>
          <Label className="label">Comment:</Label>
          {this.state.formStatus !== DONE && this.formStatus !== DISABLE &&
            <Row>
              <Col>
                <Input
                  ref={this.commentRef}
                  onChange={this.handleInput}
                  name="comment"
                  value={this.state.comment}
                  placeholder="Enter comment here"
                />
              </Col>
              <Col xs="auto">
                <Button color="primary" onClick={this.addComment}><FontAwesomeIcon icon={faPaperPlane} /> </Button>
              </Col>
              <Col xs="auto">
                <Button color="success" onClick={this.refreshComment}><FontAwesomeIcon icon={faSync} /></Button>
              </Col>
            </Row>
          }

          <ListGroup className="mt-2">
            {this.state.showComment.map((comment, index) => {
              if (comment) {
                let user = this.getUserById(comment.user)
                return (
                  <ListGroupItem key={index} className="comment">
                    <Row>
                      <Col xs="1" className="d-flex align-items-center">
                        #{comment.index}
                      </Col>
                      {this.state.editCommentIndex !== comment.index ? (
                        <Col>
                          <Row>
                            <Col>
                              <h6>{user.username}</h6>
                            </Col>
                            <Col xs="auto">{comment.mdate}</Col>
                          </Row>
                          <Row>
                            <Col>
                              <span>
                                {comment.reply_to && (
                                  <span>#{this.linkIdToIndex(comment.reply_to)} </span>
                                )}
                                {comment.status === 2 ? "Comment has been deleted" : comment.comment}
                              </span>
                            </Col>
                            {this.state.formStatus !== DONE && this.formStatus !== DISABLE &&
                              <Col xs="auto">
                                <Row>
                                  {this.state.user &&
                                    this.state.user.username ===
                                    user.username && comment.status !== 2 && (
                                      <Fragment>
                                        <Button
                                          type="button"
                                          color="warning"
                                          size="sm"
                                          onClick={() => {
                                            this.setEditCommentIndex(comment.index);
                                          }}
                                        >
                                          Edit
                                      </Button>
                                        <Button
                                          type="button"
                                          color="danger"
                                          size="sm"
                                          className="ml-2"
                                          onClick={() => {
                                            this.removeComment(comment.index);
                                          }}
                                        >
                                          Delete
                                      </Button>
                                      </Fragment>
                                    )}
                                  {comment.status !== 2 ?
                                    <Button
                                      type="button"
                                      color="info"
                                      size="sm"
                                      className="ml-2"
                                      onClick={() => {
                                        this.setReplyComment(comment.index);
                                      }}
                                    >
                                      Reply
                                </Button> : null
                                  }

                                </Row>
                              </Col>}

                          </Row>
                        </Col>
                      ) : (
                          <Col>
                            <Row>
                              <Col>
                                <h6>{user.username}</h6>
                              </Col>
                              <Col xs="auto">{comment.mdate}</Col>
                            </Row>
                            <Row>
                              <Col>
                                <Input
                                  value={this.state.backupComment}
                                  onChange={(event) => {
                                    this.handleCommentInput(event);
                                  }}
                                />
                              </Col>
                              <Col xs="auto">
                                <Row>
                                  <Fragment>
                                    <Button
                                      type="button"
                                      color="warning"
                                      size="sm"
                                      onClick={() => {
                                        this.saveComment(comment.index);
                                      }}
                                    >
                                      Save
                                  </Button>
                                    <Button
                                      type="button"
                                      color="danger"
                                      size="sm"
                                      className="ml-2"
                                      onClick={() => this.cancelEditMode(comment.index)}
                                    >
                                      Cancel
                                  </Button>
                                  </Fragment>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        )}
                    </Row>
                  </ListGroupItem>
                );
              }
              else return null
            })}
          </ListGroup>
          {this.state.comments.length !== 0 &&
            <div className="mt-1 d-flex justify-content-center">
              <Pagination
                activePage={this.state.activePage}
                totalItemsCount={this.state.comments.length}
                itemsCountPerPage={MAXIMUM_COMMENT_PER_PAGE}
                onChange={this.handlePageChange.bind(this)}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>}

        </Col>
      </Row>
    );
  }
}
