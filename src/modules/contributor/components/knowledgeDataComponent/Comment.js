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

export default class Comment extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      comments: props.comments,
      userList: props.userList,
      backupComment: '',
      page: 0,
      editCommentIndex: null,
      user: getUserData(),
      comment: '',
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
    let comments = this.state.comments;
    if (index > -1) {
      comments.splice(index, 1);
    }
    this._isMounted && this.setState({ comments: comments });
  };

  saveComment = () => {
    this._isMounted &&
      this.setState({ editCommentIndex: null, backupComment: '' });
  };

  setReplyComment = (index) => {
    this._isMounted && this.setState({ comment: `#${index}| ` });
    this.commentRef.current.focus();
  };

  addComment = () => {
    let commentList = this.state.comments;
    const comment = this.state.comment;
    switch (this.checkIsReply()) {
      case NORMAL_COMMENT:
        comment.trim() !== '' &&
          commentList.push({
            id: commentList.length + 1,
            comment_user: this.state.user.username,
            comment_mention_comment: null,
            comment: comment,
            comment_status: VIEWABLE,
            create_date: '12/4/2020',
            modified_date: '12/4/2020',
          });
        break;
      case REPLY_COMMENT:
        const commentSplit = comment.split('|');
        const commentReferTag = commentSplit[0];
        const commentReferIndex = commentReferTag.substring(1);
        let commentReferId = this.state.comments[commentReferIndex].if;
        comment.trim() !== '' &&
          commentList.push({
            id: commentList.length + 1,
            comment_user: this.state.user.username,
            comment_mention_comment: commentReferId,
            comment: comment.substring(commentReferTag.length + 1),
            comment_status: VIEWABLE,
            create_date: '12/4/2020',
            modified_date: '12/4/2020',
          });
        break;
      default:
        console.log('not allow');
        comment.trim() !== '' &&
          commentList.push({
            id: commentList.length + 1,
            comment_user: this.state.user.username,
            comment_mention_comment: null,
            comment: comment,
            comment_status: VIEWABLE,
            create_date: '12/4/2020',
            modified_date: '12/4/2020',
          });
    }

    this._isMounted && this.setState({ comments: commentList, comment: '' });
  };

  checkIsReply = () => {
    const comment = this.state.comment;
    const commentSplit = comment.split('|');
    const commentReferTag = commentSplit[0];
    const commentReferIndex = commentReferTag.substring(1);
    // recheck here
    if (commentReferIndex + 1 <= comment.length) {
      return REPLY_COMMENT;
    } else if (comment[commentReferIndex]) {
      return NORMAL_COMMENT;
    } else {
      return null;
    }
  };

  refreshComment = () => {};

  getUserById = (id) => {
    return this.state.userList.id;
  };

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
            {this.state.comments.map((comment, index) => {
              console.log(comment.user);
              return (
                <ListGroupItem key={index} className="comment">
                  <Row>
                    <Col xs="1" className="d-flex align-items-center">
                      #{index}
                    </Col>
                    {this.state.editCommentIndex !== index ? (
                      <Col>
                        <Row>
                          <Col>
                            <h6>{comment.comment_user}</h6>
                          </Col>
                          <Col xs="auto">{comment.modified_date}</Col>
                        </Row>
                        <Row>
                          <Col>
                            <span>
                              {comment.comment_mention_comment && (
                                <span>#{comment.comment_mention_comment} </span>
                              )}
                              {comment.comment}
                            </span>
                          </Col>
                          <Col xs="auto">
                            <Row>
                              {this.state.user &&
                                this.state.user.username ===
                                  comment.comment_user && (
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
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    ) : (
                      <Col>
                        <Row>
                          <Col>
                            <h6>{comment.comment_user}</h6>
                          </Col>
                          <Col xs="auto">{comment.modified_date}</Col>
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
        </Col>
      </Row>
    );
  }
}
