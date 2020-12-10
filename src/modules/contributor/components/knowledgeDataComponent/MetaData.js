import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  getAllDocumentReference,
  fetchAllDocumentReference,
  ReferenceModal,
  FormSectionTitle,
} from 'src/modules/contributor/index';
import { connect } from 'react-redux';

class MetaData extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      isOpenReferenceModal: false,
      referenceList: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    if (this.props.referenceValue) {
      let referenceList = [];
      this.props.referenceValue.forEach((reference) => {
        referenceList.push({
          reference_name: reference.name,
          id: reference.id,
          page: reference.page,
          extra_info: reference.extra_info,
        });
      });
      this.setState({ referenceList: referenceList });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleReferenceModal = () => {
    if (this._isMounted)
      this.setState({ isOpenReferenceModal: !this.state.isOpenReferenceModal });
  };

  addReference = (reference) => {
    let referenceList = this.state.referenceList;
    if (!this.checkDuplicate(reference)) {
      referenceList.push(reference);
      this._isMounted && this.setState({ referenceList: referenceList });
      this.setReference();
    }
  };

  checkDuplicate = (reference) => {
    const referenceList = this.state.referenceList;
    let flag = false
    referenceList.forEach((item) => {
      if (
        item.extra_info === reference.extra_info &&
        item.reference_name === reference.reference_name &&
        item.page === reference.page
      ) {
        flag = true;
      }
    });
    return flag;
  };

  removeReference = (index) => {
    let referenceList = this.state.referenceList;
    if (index > -1) {
      referenceList.splice(index, 1);
    }
    if (this._isMounted) this.setState({ referenceList: referenceList });
    this.setReference();
  };

  setReference = () => {
    let referenceList = [];
    this.state.referenceList.forEach((reference) => {
      referenceList.push({
        id: reference.id,
        page: reference.page,
        extra_info: reference.extra_info,
      });
    });
    this.props.setReference(referenceList);
  };

  renderReferenceName = (name) => {
    return <Col>Name: {name}</Col>;
  };

  renderPage = (page) => {
    if (page && (page.trim() !== '' || page !== 0)) {
      let processedPage = page;
      while (processedPage.charAt(0) === '0') {
        processedPage = processedPage.substring(1);
      }
      return <Col xs="auto">Page: {processedPage}</Col>;
    } else return '';
  };

  renderExtraInfo = (extraInfo) => {
    if (extraInfo && extraInfo.trim() !== '') {
      return <Col xs="auto">Extra info: {extraInfo}</Col>;
    } else return '';
  };

  render() {
    return (
      <Fragment>
        {this.state.isOpenReferenceModal && (
          <ReferenceModal
            isOpen={this.state.isOpenReferenceModal}
            toggle={this.toggleReferenceModal}
            addReference={this.addReference}
          />
        )}
        <Row className="col">
          <Col xs="auto" className="mr-2">
            <Row>
              <Label className="label small-title" for="intent">
                Intent:
              </Label>
            </Row>
            <Row>
              <Label className="label small-title" for="intentFullName">
                Intent full name:
              </Label>
            </Row>
          </Col>
          <Col xs="6">
            <Row className="mb-1">
              {this.props.disable ? (
                <h5 className="mt-1">{this.props.intentValue}</h5>
              ) : (
                <Input
                  disabled={this.props.disable}
                  placeholder="Enter intent here"
                  required
                  type="text"
                  name="intent"
                  id="intent"
                  value={this.props.intentValue}
                  onChange={this.props.onChange}
                />
              )}
            </Row>
            <Row className="mb-1">
              {this.props.disable ? (
                <h5 className="mt-1">{this.props.intentFullNameValue}</h5>
              ) : (
                <Input
                  disabled={this.props.disable}
                  placeholder="Enter intent fullname here"
                  required
                  type="text"
                  name="intentFullName"
                  id="intentFullName"
                  value={this.props.intentFullNameValue}
                  onChange={this.props.onChange}
                />
              )}
            </Row>
          </Col>
        </Row>

        <hr className="mr-3 ml-3 divider" />
        <Row className="col">
          <FormSectionTitle title="Reference" />
          <Col xs="auto" className="m-1">
            {!this.props.disable && (
              <Button
                disabled={this.props.disable}
                type="button"
                onClick={this.toggleReferenceModal}
                color="success"
              >
                <FontAwesomeIcon icon={faBookOpen} /> Add reference
              </Button>
            )}
          </Col>
        </Row>
        <ListGroup>
          {this.state.referenceList &&
            this.state.referenceList.map((reference, index) => {
              return (
                <ListGroupItem key={index}>
                  <Row>
                    <Col>
                      <Row>
                        {this.renderReferenceName(reference.reference_name)}
                        {this.renderPage(reference.page)}
                        {this.renderExtraInfo(reference.extra_info)}
                      </Row>
                    </Col>
                    <Col xs="auto">
                      {!this.props.disable && (
                        <Button
                          disabled={this.props.disable}
                          color="danger"
                          onClick={() => {
                            this.removeReference(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  documentReferenceList: getAllDocumentReference(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllSynonyms: (documentReferenceList) =>
    dispatch(fetchAllDocumentReference(documentReferenceList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MetaData);
