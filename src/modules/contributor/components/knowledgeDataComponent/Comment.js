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
  VIEWABLE,
  DELETED,
  NORMAL_COMMENT,
  REPLY_COMMENT,
} from 'src/modules/contributor/index';
import { handleInputChange } from 'src/common/handleInputChange';
import { getUserData } from 'src/common/authorizationChecking';
import axiosClient from 'src/common/axiosClient';
import {
  KNOWLEDGE_DATA, POST_COMMENT, GET_ALL_COMMENT, DELETE_COMMENT, EDIT_COMMENT
} from 'src/constants';
import Pagination from "react-js-pagination";

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
      numberOfPage: props.comments.length / 5,
      index: 0
    };
    this.commentRef = React.createRef();
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

  cancelEditMode = (index) => {
    let comments = this.state.comments;
    comments[index].comment = this.state.backupComment;
    this._isMounted &&
      this.setState({
        editCommentIndex: null,
        comments: comments,
        backupComment: '',
      });
  };

  handleCommentInput = (event, index) => {
    let comments = this.state.comments;
    comments[index].comment = event.target.value;
    this._isMounted && this.setState({ comments: comments });
  };

  removeComment = (index) => {
    const id = this.state.comments[index].id
    axiosClient
      .get(KNOWLEDGE_DATA + DELETE_COMMENT(id))
      .then(() => {
        this.refreshComment()
      })
      .catch(err => {
        console.log(err)
      })
  };

  saveComment = (index) => {
    axiosClient
      .post(KNOWLEDGE_DATA + EDIT_COMMENT, {
        id: this.state.comments[index].id,
        comment: this.state.comments[index].comment
      })
      .then(() => {
        this._isMounted &&
          this.setState({ editCommentIndex: null, backupComment: '' });
        this.refreshComment()
      })
      .catch(err => {
        console.log(err)
      })
  };

  setReplyComment = (index) => {
    this._isMounted && this.setState({ comment: `#${index}| ` });
    this.commentRef.current.focus();
  };

  addComment = () => {
    const comment = this.state.comment
    const commentSplit = comment.split('|');
    const commentReferTag = commentSplit[0];
    let data = {
      knowledge_data: this.props.knowledgeDataId,
      reply_to: this.returnReplyIndex() ? this.state.comments[this.returnReplyIndex()].id : null,
      comment: this.returnReplyIndex() ? comment.substring(commentReferTag.length + 1).trim() : this.state.comment.trim(),
    }
    axiosClient
      .post(KNOWLEDGE_DATA + POST_COMMENT, data)
      .then(() => {
        this._isMounted && this.setState({ comment: '' })
        this.refreshComment()
      })
      .catch(err => {
        console.log(err)
      })
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
    axiosClient
      .get(KNOWLEDGE_DATA + GET_ALL_COMMENT(this.props.knowledgeDataId))
      .then(response => {
        this._isMounted && this.setState({
          comments: response.data.result_data.data,
          userList: response.data.result_data.users,
          comment: '',
        })
      })
      .catch(err => {
        console.log(err)
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

  handlePageChange(pageNumber) {
    let showComment = []
    for (let i = 0; i < 5; i++) {
      showComment.push(this.state.comments[(pageNumber - 1) * 5 + i])
    }
    this.setState({ activePage: pageNumber, showComment: showComment, index: pageNumber * 5 });
  }

  render() {
    return (
      <Row xs="1">
        <Col>
          <Label className="label">Comment:</Label>
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
              <Button onClick={this.addComment}>Comment</Button>
            </Col>
            <Col xs="auto">
              <Button onClick={this.refreshComment}>Refresh comment</Button>
            </Col>
          </Row>
          <ListGroup className="mt-2">
            {this.state.showComment.map((comment, index) => {
              let user = this.getUserById(comment.user)
              return (
                <ListGroupItem key={index} className="comment">
                  <Row>
                    <Col xs="1" className="d-flex align-items-center">
                      #{comment.index}
                    </Col>
                    {this.state.editCommentIndex !== index ? (
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
                                        this.setEditCommentIndex(index);
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
                                        this.removeComment(index);
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
                                    this.setReplyComment(index);
                                  }}
                                >
                                  Reply
                              </Button> : null
                              }

                            </Row>
                          </Col>
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
                                value={this.state.comments[index].comment}
                                onChange={(event) => {
                                  this.handleCommentInput(event, index);
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
                                      this.saveComment(index);
                                    }}
                                  >
                                    Save
                                </Button>
                                  <Button
                                    type="button"
                                    color="danger"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() => this.cancelEditMode(index)}
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
            })}
          </ListGroup>
          <Pagination
            activePage={this.state.activePage}
            totalItemsCount={this.state.comments.length}
            itemsCountPerPage={5}
            onChange={this.handlePageChange.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </Col>
      </Row>
    );
  }
}
